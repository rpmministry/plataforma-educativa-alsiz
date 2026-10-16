export type UserRole =
  | 'ADMIN'
  | 'ACADEMIC_COORDINATOR'
  | 'TEACHER'
  | 'REPRESENTATIVE'
  | 'STUDENT'
  | 'SERVICE_AGENT';

export type UserStatus = 'ACTIVE' | 'SUSPENDED' | 'PENDING_ACTIVATION';

export interface UserRow {
  id: string;
  email: string | null;
  username: string;
  password_hash: string;
  role: UserRole;
  status: UserStatus;
  first_name: string;
  last_name: string;
  avatar_asset_key: string | null;
  created_at: string;
  updated_at: string;
}

export interface StudentRow {
  id: string;
  user_id: string;
  pin_code_hash: string | null;
  student_code: string;
  birth_date: string;
  motto: string | null;
  color_theme_json: string | null;
  created_at: string;
}

export interface RepresentativeRow {
  id: string;
  user_id: string;
  identification_type: 'CEDULA' | 'PASAPORTE';
  identification_number: string;
  phone_number: string;
  address_text: string | null;
  consent_lopdp_signed_at: string | null;
  consent_document_hash: string | null;
  created_at: string;
}

export interface SessionRow {
  id: string;
  user_id: string;
  token_hash: string;
  role: UserRole;
  student_id: string | null;
  representative_id: string | null;
  ip_hash: string;
  user_agent: string | null;
  expires_at: string;
  created_at: string;
}

export interface AuthSessionUser {
  id: string;
  userId: string;
  email: string | null;
  username: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  studentId?: string;
  studentCode?: string;
  representativeId?: string;
  expiresAt: string;
}

