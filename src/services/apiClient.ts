/**
 * ==============================================================================
 * Cliente de API Unificado y Tipado para la Plataforma Educativa ALSIZ
 * Conexión Autorizada entre el Frontend (React) y Backend (/api/v1)
 * ==============================================================================
 * 
 * Reglas de Seguridad Arquitectónica:
 * 1. Autoridad 100% en el Servidor: La sesión se gobierna mediante la cookie HttpOnly
 *    `alsiz_session` con `credentials: 'include'`.
 * 2. Cero tokens reutilizables en localStorage (Mitigación XSS / OWASP).
 * 3. Manejo resiliente de respuestas no-JSON, errores HTTP y estados de red.
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  message?: string;
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
  expiresAt?: string;
}

export interface LoginResult {
  token?: string; // Token opaco de backend si aplica
  user: AuthUser;
}

export interface TemporaryCredentials {
  username?: string;
  email?: string;
  studentCode?: string;
  initialPin?: string;
  initialPassword?: string;
  newPassword?: string;
  newPin?: string;
}

export interface CreatedStudentResult {
  student: {
    id: string;
    userId: string;
    studentCode: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    birthDate: string;
    programName?: string;
    levelName?: string;
  };
  temporaryCredentials: TemporaryCredentials;
}

/**
 * Cliente centralizado de peticiones HTTP con control de errores,
 * respuestas no-JSON y transporte seguro de cookies HttpOnly.
 */
export async function apiRequest<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const headers: Record<string, string> = {
    'Accept': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (options.body && !(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const config: RequestInit = {
    ...options,
    headers,
    credentials: 'include', // Incluye siempre la cookie segura HttpOnly alsiz_session
  };

  try {
    const response = await fetch(path, config);
    const contentType = response.headers.get('content-type') || '';

    let parsedData: any = null;
    if (contentType.includes('application/json')) {
      parsedData = await response.json().catch(() => null);
    } else {
      const text = await response.text().catch(() => '');
      parsedData = {
        success: response.ok,
        error: !response.ok ? {
          code: response.status === 503 ? 'SERVICE_UNAVAILABLE' : `HTTP_${response.status}`,
          message: text.slice(0, 200) || `Error ${response.status} del servidor.`,
        } : undefined,
      };
    }

    if (!response.ok) {
      if (parsedData?.error?.code) {
        return parsedData;
      }
      return {
        success: false,
        error: {
          code: response.status === 401 ? 'UNAUTHORIZED' : (response.status === 403 ? 'FORBIDDEN' : `HTTP_${response.status}`),
          message: parsedData?.message || parsedData?.error || `Error ${response.status} al procesar la solicitud.`,
          details: parsedData,
        },
        timestamp: new Date().toISOString(),
      };
    }

    return parsedData || { success: true };
  } catch (err: any) {
    const isOffline = typeof navigator !== 'undefined' && !navigator.onLine;
    return {
      success: false,
      error: {
        code: isOffline ? 'NETWORK_OFFLINE' : 'SERVER_UNREACHABLE',
        message: isOffline
          ? 'Sin conexión a Internet. Verifica tu conectividad.'
          : 'No se pudo comunicar con el servidor institucional. Comprueba tu conexión o intenta más tarde.',
        details: err?.message,
      },
      timestamp: new Date().toISOString(),
    };
  }
}

// ==========================================
// 1. MÓDULO DE AUTENTICACIÓN Y SESIÓN
// ==========================================
export const authApi = {
  /**
   * Inicio de sesión tradicional (correo/usuario + contraseña)
   */
  async login(identifier: string, password: string): Promise<ApiResponse<LoginResult>> {
    return apiRequest<LoginResult>('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({ identifier, password }),
    });
  },

  /**
   * Inicio de sesión táctil simplificado para estudiantes (código + PIN)
   */
  async pinLogin(studentCode: string, pinCode: string): Promise<ApiResponse<LoginResult>> {
    return apiRequest<LoginResult>('/api/v1/auth/pin-login', {
      method: 'POST',
      body: JSON.stringify({ studentCode, pinCode }),
    });
  },

  /**
   * Inicio de sesión validado en el servidor para Google Sign-In
   */
  async googleLogin(idToken: string): Promise<ApiResponse<LoginResult>> {
    return apiRequest<LoginResult>('/api/v1/auth/google', {
      method: 'POST',
      body: JSON.stringify({ idToken }),
    });
  },

  /**
   * Cierre de sesión en servidor con revocación en base de datos y borrado de cookie
   */
  async logout(): Promise<ApiResponse<{ message: string }>> {
    return apiRequest<{ message: string }>('/api/v1/auth/logout', {
      method: 'POST',
    });
  },

  /**
   * Consulta de sesión activa autorizada por el backend (/api/v1/auth/me)
   */
  async getMe(): Promise<ApiResponse<AuthUser>> {
    return apiRequest<AuthUser>('/api/v1/auth/me', {
      method: 'GET',
    });
  },

  /**
   * Cambio voluntario de contraseña por el usuario activo
   */
  async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse<{ message: string }>> {
    return apiRequest<{ message: string }>('/api/v1/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },

  /**
   * Cambio de PIN táctil para el estudiante activo
   */
  async changePin(currentPin: string, newPin: string): Promise<ApiResponse<{ message: string }>> {
    return apiRequest<{ message: string }>('/api/v1/auth/change-pin', {
      method: 'POST',
      body: JSON.stringify({ currentPin, newPin }),
    });
  },

  /**
   * Solicitud segura de recuperación de acceso (OWASP Anti-Enumeration)
   */
  async recoverAccess(identifier: string): Promise<ApiResponse<{ message: string }>> {
    return apiRequest<{ message: string }>('/api/v1/auth/recover-access', {
      method: 'POST',
      body: JSON.stringify({ identifier }),
    });
  },
};

// ==========================================
// 2. MÓDULO ADMINISTRATIVO Y GESTIÓN
// ==========================================
export const adminApi = {
  async getDashboardSummary(): Promise<ApiResponse<any>> {
    return apiRequest('/api/v1/admin/dashboard-summary');
  },

  async getUsers(params?: { role?: string; status?: string; search?: string }): Promise<ApiResponse<{ totalUsers: number; users: any[] }>> {
    const query = new URLSearchParams();
    if (params?.role) query.append('role', params.role);
    if (params?.status) query.append('status', params.status);
    if (params?.search) query.append('search', params.search);
    const queryString = query.toString() ? `?${query.toString()}` : '';
    return apiRequest(`/api/v1/admin/users${queryString}`);
  },

  async updateUserRole(userId: string, role: string, justification: string): Promise<ApiResponse<any>> {
    return apiRequest(`/api/v1/admin/users/${userId}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role, justification }),
    });
  },

  async updateUserStatus(userId: string, status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED', justification: string): Promise<ApiResponse<any>> {
    return apiRequest(`/api/v1/admin/users/${userId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, justification }),
    });
  },

  /**
   * Creación formal de cuenta de estudiante en la base de datos
   */
  async createStudent(payload: {
    firstName: string;
    lastName: string;
    username?: string;
    email?: string;
    birthDate: string;
    programId: string;
    levelId: string;
    representativeId: string;
    relationshipType?: 'FATHER' | 'MOTHER' | 'LEGAL_GUARDIAN';
    isPrimaryContact?: boolean;
    initialPin?: string;
    initialPassword?: string;
    consentVerified?: boolean;
  }): Promise<ApiResponse<CreatedStudentResult>> {
    return apiRequest<CreatedStudentResult>('/api/v1/admin/students', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  /**
   * Restablecimiento seguro de credenciales con hash y revocación de sesiones
   */
  async resetCredentials(userId: string, payload: {
    resetType: 'PASSWORD' | 'PIN' | 'BOTH';
    newPassword?: string;
    newPin?: string;
  }): Promise<ApiResponse<{ userId: string; username: string; temporaryCredentials: TemporaryCredentials }>> {
    return apiRequest(`/api/v1/admin/users/${userId}/reset-credentials`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async getRepresentatives(): Promise<ApiResponse<{ totalRepresentatives: number; representatives: any[] }>> {
    return apiRequest('/api/v1/admin/representatives');
  },

  async linkStudent(payload: {
    representativeId: string;
    studentId: string;
    relationshipType: 'FATHER' | 'MOTHER' | 'LEGAL_GUARDIAN';
    isPrimaryContact?: boolean;
  }): Promise<ApiResponse<any>> {
    return apiRequest('/api/v1/admin/representatives/link-student', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async getAuditLogs(params?: { limit?: number; eventType?: string; resourceType?: string; userId?: string }): Promise<ApiResponse<{ count: number; logs: any[] }>> {
    const query = new URLSearchParams();
    if (params?.limit) query.append('limit', String(params.limit));
    if (params?.eventType) query.append('eventType', params.eventType);
    if (params?.resourceType) query.append('resourceType', params.resourceType);
    if (params?.userId) query.append('userId', params.userId);
    const queryString = query.toString() ? `?${query.toString()}` : '';
    return apiRequest(`/api/v1/admin/audit-logs${queryString}`);
  },

  async getTelemetryErrors(): Promise<ApiResponse<any>> {
    return apiRequest('/api/v1/admin/telemetry/errors');
  },

  async getSettings(): Promise<ApiResponse<any>> {
    return apiRequest('/api/v1/admin/settings');
  },

  async updateSettings(settings: Record<string, string>): Promise<ApiResponse<any>> {
    return apiRequest('/api/v1/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  },
};

// ==========================================
// 3. MÓDULO DE REPRESENTANTE Y FAMILIA
// ==========================================
export const representativeApi = {
  /**
   * Consulta del núcleo familiar tutelado legalmente
   */
  async getMyFamily(): Promise<ApiResponse<{ representativeId: string; totalChildren: number; children: any[] }>> {
    return apiRequest('/api/v1/representatives/my-family');
  },

  /**
   * Registro y matrícula formal de un hijo realizada por su representante acreditado
   */
  async registerStudent(payload: {
    firstName: string;
    lastName: string;
    birthDate: string;
    programId: string;
    levelId: string;
    relationshipType?: 'FATHER' | 'MOTHER' | 'LEGAL_GUARDIAN';
    initialPin?: string;
    initialPassword?: string;
  }): Promise<ApiResponse<CreatedStudentResult>> {
    return apiRequest<CreatedStudentResult>('/api/v1/representatives/students', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  /**
   * Firma formal de consentimiento informado de tratamiento de datos de menores (LOPDP)
   */
  async signConsent(documentVersion = 'LOPDP-2026-V1'): Promise<ApiResponse<{ signedAt: string; documentHash: string }>> {
    return apiRequest('/api/v1/representatives/consent', {
      method: 'POST',
      body: JSON.stringify({ consentAccepted: true, documentVersion }),
    });
  },
};

// ==========================================
// 4. MÓDULO DE ESTUDIANTES Y EXPEDIENTE
// ==========================================
export const studentApi = {
  /**
   * Consulta de expediente y perfil (Anti-IDOR protegido en servidor)
   */
  async getStudent(studentId: string): Promise<ApiResponse<any>> {
    return apiRequest(`/api/v1/students/${studentId}`);
  },

  /**
   * Malla curricular de asignaturas inscritas
   */
  async getSubjects(studentId: string): Promise<ApiResponse<any>> {
    return apiRequest(`/api/v1/students/${studentId}/subjects`);
  },

  /**
   * Historial de entregas, evaluaciones y notas
   */
  async getSubmissions(studentId: string): Promise<ApiResponse<any>> {
    return apiRequest(`/api/v1/students/${studentId}/submissions`);
  },

  /**
   * Actualización de preferencias personales (motto, tema)
   */
  async updateProfile(studentId: string, payload: { motto?: string; colorThemeJson?: string }): Promise<ApiResponse<any>> {
    return apiRequest(`/api/v1/students/${studentId}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },
};

// ==========================================
// 5. MÓDULO ACADÉMICO Y EVALUACIONES
// ==========================================
export const academicApi = {
  async getStudentCompetenciesProgress(studentId: string): Promise<ApiResponse<any>> {
    return apiRequest(`/api/v1/academic/students/${studentId}/competencies-progress`);
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
    return apiRequest(`/api/v1/academic/evaluations/${evaluationId}/submissions`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};

// ==========================================
// 6. MÓDULO DE COMUNICACIONES
// ==========================================
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
