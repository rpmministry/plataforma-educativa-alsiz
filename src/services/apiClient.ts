/**
 * ==============================================================================
 * Cliente de API Unificado para la Plataforma Educativa ALSIZ
 * Conexión transparente entre el Frontend (React) y Backend (/api/v1)
 * ==============================================================================
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp?: string;
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: 'ADMIN' | 'ACADEMIC_COORDINATOR' | 'TEACHER' | 'REPRESENTATIVE' | 'STUDENT';
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  studentId?: string;
  studentCode?: string;
  representativeId?: string;
}

export interface LoginResult {
  token: string;
  user: AuthUser;
}

const TOKEN_KEY = 'alsiz_auth_token';
const USER_KEY = 'alsiz_session_user';

export function getStoredToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setStoredSession(token: string, user: AuthUser): void {
  try {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch {
    /* Modo incógnito o Safari con cuota */
  }
}

export function clearStoredSession(): void {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch {
    /* no-op */
  }
}

export function getStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

async function apiRequest<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = getStoredToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers,
    credentials: 'include', // Incluye la cookie alsiz_session HttpOnly
  };

  try {
    const response = await fetch(path, config);
    const data = await response.json();
    return data;
  } catch (err: any) {
    return {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message: err?.message || 'Error de comunicación con el servidor.',
      },
    };
  }
}

// 1. Módulo de Autenticación
export const authApi = {
  async login(identifier: string, password: string): Promise<ApiResponse<LoginResult>> {
    const res = await apiRequest<LoginResult>('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({ identifier, password }),
    });

    if (res.success && res.data) {
      setStoredSession(res.data.token, res.data.user);
    }
    return res;
  },

  async pinLogin(studentCode: string, pinCode: string): Promise<ApiResponse<LoginResult>> {
    const res = await apiRequest<LoginResult>('/api/v1/auth/pin-login', {
      method: 'POST',
      body: JSON.stringify({ studentCode, pinCode }),
    });

    if (res.success && res.data) {
      setStoredSession(res.data.token, res.data.user);
    }
    return res;
  },

  async logout(): Promise<ApiResponse<{ message: string }>> {
    try {
      const res = await apiRequest<{ message: string }>('/api/v1/auth/logout', {
        method: 'POST',
      });
      clearStoredSession();
      return res;
    } catch {
      clearStoredSession();
      return { success: true, data: { message: 'Sesión cerrada localmente.' } };
    }
  },

  async getMe(): Promise<ApiResponse<AuthUser>> {
    return apiRequest<AuthUser>('/api/v1/auth/me', {
      method: 'GET',
    });
  },

  async recoverAccess(identifier: string): Promise<ApiResponse<{ message: string }>> {
    return apiRequest<{ message: string }>('/api/v1/auth/recover-access', {
      method: 'POST',
      body: JSON.stringify({ identifier }),
    });
  },
};

// 2. Módulo Académico y de Progreso
export const academicApi = {
  async getStudent(studentId: string): Promise<ApiResponse<any>> {
    return apiRequest<any>(`/api/v1/students/${studentId}`, {
      method: 'GET',
    });
  },

  async getStudentCompetenciesProgress(studentId: string): Promise<ApiResponse<any>> {
    return apiRequest<any>(`/api/v1/academic/students/${studentId}/competencies-progress`, {
      method: 'GET',
    });
  },

  async submitEvaluation(
    evaluationId: string,
    payload: {
      studentId: string;
      content: string;
      score?: number;
      audioUrl?: string;
      reflectionText?: string;
    }
  ): Promise<ApiResponse<any>> {
    return apiRequest<any>(`/api/v1/academic/evaluations/${evaluationId}/submissions`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};

// 3. Módulo de Notificaciones y Email
export const emailApi = {
  async sendPin(email: string, pinCode: string, studentName?: string): Promise<{ success: boolean; result?: any }> {
    try {
      const res = await fetch('/api/send-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, pinCode, studentName }),
      });
      return await res.json();
    } catch {
      return { success: false };
    }
  },
};

