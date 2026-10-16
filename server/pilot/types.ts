/**
 * ==============================================================================
 * Tipos y Definiciones de Dominio — Piloto de Aula Interactiva (Etapa 09)
 * Plataforma Educativa ALSIZ para Ekballo Church
 * ==============================================================================
 */

export interface InteractivePilotConfig {
  pilotEnabled: boolean;
  maxTurnsPerSession: number;
  sessionTtlMinutes: number;
  allowedSubjectCodes: string[];
  sandboxSecurityMode: string;
}

export interface EphemeralPilotSession {
  id: string;
  ephemeralToken: string;
  studentSyntheticAlias: string;
  subjectCode: string;
  lessonTheme: string;
  startedAt: string;
  endedAt?: string | null;
  status: 'ACTIVE' | 'COMPLETED' | 'ABORTED_BY_USER' | 'TERMINATED_ERROR';
}

export interface PilotTurnResponse {
  turnIndex: number;
  teacherSpeech: string;
  virtualPeerSpeech: string;
  virtualPeerName: string;
  simulationState: {
    n1: number;
    n2: number;
    angleIncidentDeg: number;
    angleRefractedDeg: number;
    isTotalInternalReflection: boolean;
    challengeTargetMet: boolean;
  };
  socraticPrompt: string;
  tokensEstimated: number;
  latencyMs: number;
}

export interface PilotTelemetryRecord {
  id: string;
  sessionId: string;
  turnsCount: number;
  latencyMs: number;
  tokensEstimated: number;
  simulationInteractions: number;
  exitReason: 'USER_EXIT' | 'SESSION_TIMEOUT' | 'LESSON_COMPLETED' | 'SYSTEM_KILL_SWITCH';
  createdAt: string;
}

