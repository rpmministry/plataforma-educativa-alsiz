/**
 * ==============================================================================
 * Tipos y Contratos: Orquestación de Agentes IA y LLM (ETAPA-08)
 * Plataforma Educativa ALSIZ para Ekballo Church
 * ==============================================================================
 */

export type AgentRoleType =
  | 'SOCRATIC_TUTOR'
  | 'DOCTRINAL_MENTOR'
  | 'ESSAY_EVALUATOR'
  | 'LESSON_PLANNER'
  | 'COORDINATOR'
  | 'KNOWLEDGE_CURATOR'
  | 'SAFETY_SUPERVISOR'
  | 'SUBJECT_SPECIALIST';

export interface AIAgent {
  id: string;
  code: string;
  name: string;
  description?: string;
  role_type: AgentRoleType;
  subject_id?: string;
  level_id?: string;
  default_language: string;
  system_prompt: string;
  pedagogical_style: string;
  safety_restrictions: string;
  allowed_source_codes_json?: string;
  is_active: number;
  version_number: number;
  created_at: string;
  updated_at: string;
}

export interface AIConversation {
  id: string;
  student_id: string;
  agent_id: string;
  subject_id?: string;
  title: string;
  status: 'ACTIVE' | 'ARCHIVED' | 'FLAGGED_SAFETY';
  created_at: string;
  updated_at: string;
}

export interface AIMessage {
  id: string;
  conversation_id: string;
  sender_type: 'STUDENT' | 'AGENT' | 'SYSTEM' | 'COORDINATOR_FEEDBACK';
  content: string;
  citation_tags_json?: string;
  rag_sources_json?: string;
  telemetry_json?: string;
  safety_flags_json?: string;
  created_at: string;
}

export interface AITelemetryLog {
  id: string;
  agent_code: string;
  provider_name: string;
  model_name: string;
  latency_ms: number;
  tokens_prompt: number;
  tokens_completion: number;
  status_code: number;
  error_message?: string;
  created_at: string;
}

export interface AIGeneratedMaterial {
  id: string;
  title: string;
  content_markdown: string;
  agent_id: string;
  subject_id?: string;
  target_level_id?: string;
  status: 'DRAFT_REVIEW' | 'APPROVED_PUBLISHED' | 'REJECTED';
  reviewed_by_user_id?: string;
  review_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface RagContextChunk {
  citationTag: string;
  sourceCode: string;
  sourceTitle: string;
  sectionTitle?: string;
  contentText: string;
  relevanceScore: number;
}

export interface LLMRequest {
  agentCode: string;
  systemPrompt: string;
  userPrompt: string;
  history?: Array<{ role: 'user' | 'model'; content: string }>;
  ragContext?: RagContextChunk[];
  pedagogicalStyle?: string;
  safetyRestrictions?: string;
  language?: string;
  temperature?: number;
  maxTokens?: number;
  forceProvider?: string;
  timeoutMs?: number;
  studentId?: string;
  isManualUserAction?: boolean;
}

export interface LLMResponse {
  content: string;
  citationTags: string[];
  tokensPrompt: number;
  tokensCompletion: number;
  providerName: string;
  modelName: string;
  latencyMs: number;
  isFallback: boolean;
  safetyFlags?: string[];
}

export interface ProviderStatusInfo {
  name: string;
  status: 'CONFIGURED' | 'BLOCKED_SECRET_MISSING' | 'AVAILABLE';
  model: string;
  priority: number;
  isPrimary: boolean;
  isFallback?: boolean;
}

export interface AIHealthReport {
  status: 'HEALTHY' | 'DEGRADED' | 'OFFLINE';
  timestamp: string;
  activeProvider: string;
  activeCascadeOrder?: string[];
  providers: ProviderStatusInfo[];
  quotaPolicy: {
    maxRequestsPerMinute: number;
    maxDailyPerStudent: number;
    mode: string;
  };
}

export type AIErrorCode =
  | 'AI_ERROR_AUTH'
  | 'AI_ERROR_TIMEOUT'
  | 'AI_ERROR_QUOTA'
  | 'AI_ERROR_MODEL_UNAVAILABLE'
  | 'AI_ERROR_NETWORK'
  | 'AI_ERROR_RATE_LIMIT'
  | 'AI_ERROR_BAD_REQUEST'
  | 'AI_ALL_PROVIDERS_FAILED';

export class AIProviderError extends Error {
  code: AIErrorCode;
  retryable: boolean;
  statusCode: number;

  constructor(code: AIErrorCode, message: string, retryable = false, statusCode = 500) {
    super(message);
    this.name = 'AIProviderError';
    this.code = code;
    this.retryable = retryable;
    this.statusCode = statusCode;
  }
}

export interface ILLMProvider {
  readonly name: string;
  isAvailable(): boolean;
  generateResponse(request: LLMRequest): Promise<LLMResponse>;
}


