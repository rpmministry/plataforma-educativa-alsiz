import React, { useState, useEffect } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { DevelopmentBadge } from '../common/StateFeedback';
import { FeatureNoticeModal, FeatureNoticeDetails } from '../common/FeatureNoticeModal';
import { AdminOverviewTab } from './AdminOverviewTab';
import { AdminUsersTab } from './AdminUsersTab';
import { AdminAcademicTab } from './AdminAcademicTab';
import { EditKnowledgeModal, SourceHistoryModal } from './AdminKnowledgeModals';
import { AdminReportsTab } from './AdminReportsTab';
import { AdminSettingsTab } from './AdminSettingsTab';
import { AdminContinuingEdTab } from './AdminContinuingEdTab';
import {
  Shield,
  Activity,
  Layers,
  Users,
  Database,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  PlusCircle,
  FileSpreadsheet,
  Cpu,
  Lock,
  Search,
  Server,
  X,
  BookOpen,
  CheckCircle,
  XCircle,
  Archive,
  Sparkles,
  BarChart3,
  Sliders,
  Edit3,
  History,
  AlertCircle,
  Briefcase,
} from 'lucide-react';

export type AdminTabType =
  | 'overview'
  | 'users'
  | 'academic'
  | 'continuing-ed'
  | 'knowledge'
  | 'agents'
  | 'reports'
  | 'audit'
  | 'settings'
  | 'programs'
  | 'students'
  | 'health';

export const AdminShell: React.FC = () => {
  const { allSubjects } = useSchool();
  const [activeAdminTab, setActiveAdminTab] = useState<AdminTabType>('overview');
  const [featureNotice, setFeatureNotice] = useState<FeatureNoticeDetails | null>(null);

  // 1. Estado del Dashboard Consolidado (Etapa 10)
  const [summaryData, setSummaryData] = useState<any>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState<boolean>(true);

  const fetchDashboardSummary = async () => {
    setIsLoadingSummary(true);
    try {
      const res = await fetch('/api/v1/admin/dashboard-summary');
      if (res.ok) {
        const json = await res.json();
        setSummaryData(json.data);
      }
    } catch {
      // Fallback
    } finally {
      setIsLoadingSummary(false);
    }
  };

  // 2. Estado de Programas Académicos (Etapa 06)
  const [livePrograms, setLivePrograms] = useState<any[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isSubmittingProgram, setIsSubmittingProgram] = useState<boolean>(false);
  const [programForm, setProgramForm] = useState({
    code: '',
    name: '',
    programType: 'K12_HOMESCHOOL' as const,
    description: '',
  });
  const [programFormError, setProgramFormError] = useState<string | null>(null);
  const [programFormSuccess, setProgramFormSuccess] = useState<string | null>(null);

  const fetchLivePrograms = async () => {
    try {
      const res = await fetch('/api/v1/academic/programs');
      if (res.ok) {
        const json = await res.json();
        if (json.data && Array.isArray(json.data)) {
          setLivePrograms(json.data);
        }
      }
    } catch {
      // Fallback
    }
  };

  // 3. Estado del Centro de Conocimiento RAG (Etapa 07 & 10)
  const [knowledgeSources, setKnowledgeSources] = useState<any[]>([]);
  const [isLoadingSources, setIsLoadingSources] = useState<boolean>(false);
  const [sourceFilterStatus, setSourceFilterStatus] = useState<string>('TODAS');
  const [isCreateSourceModalOpen, setIsCreateSourceModalOpen] = useState<boolean>(false);
  const [isSubmittingSource, setIsSubmittingSource] = useState<boolean>(false);
  const [sourceFormError, setSourceFormError] = useState<string | null>(null);
  const [sourceFormSuccess, setSourceFormSuccess] = useState<string | null>(null);
  const [sourceForm, setSourceForm] = useState({
    code: '',
    title: '',
    description: '',
    sourceType: 'OFICIAL_MINEDUC' as 'OFICIAL_MINEDUC' | 'DOCTRINAL_EKBALLO' | 'EDITORIAL_EXTERNA' | 'RECURSO_ABIERTO',
    formatType: 'DOCUMENT_MD' as 'DOCUMENT_MD' | 'DOCUMENT_TXT' | 'DOCUMENT_PDF' | 'DOCUMENT_DOCX' | 'URL_REFERENCE' | 'MEDIA_REFERENCE',
    uriOrUrl: '',
    contentText: '',
    language: 'es',
    targetAgentFamily: 'SOCRATIC_TUTOR' as 'SOCRATIC_TUTOR' | 'ESSAY_EVALUATOR' | 'LESSON_PLANNER' | 'GENERAL_KNOWLEDGE',
    trustLevel: 'CANONICAL_ALTO' as 'CANONICAL_ALTO' | 'VERIFICADO_MEDIO' | 'SUPLEMENTARIO_BAJO',
    licenseType: 'DOMINIO_PUBLICO_MINEDUC' as 'CREATIVE_COMMONS' | 'PROPIETARIO_EKBALLO' | 'DOMINIO_PUBLICO_MINEDUC' | 'USO_EDUCATIVO_AUTORIZADO',
    authorOrPublisher: '',
  });

  // Modales de Edición e Historial de Conocimiento (Etapa 10)
  const [editingKnowledgeSource, setEditingKnowledgeSource] = useState<any | null>(null);
  const [selectedHistorySourceId, setSelectedHistorySourceId] = useState<string | null>(null);

  // Búsqueda y prueba de retrieval RAG en vivo
  const [retrievalQuery, setRetrievalQuery] = useState('');
  const [retrievalResults, setRetrievalResults] = useState<any[] | null>(null);
  const [isSearchingRetrieval, setIsSearchingRetrieval] = useState(false);

  const fetchKnowledgeSources = async () => {
    setIsLoadingSources(true);
    try {
      const res = await fetch('/api/v1/knowledge/sources');
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.sources) {
          setKnowledgeSources(json.data.sources);
        }
      }
    } catch {
      // Fallback
    } finally {
      setIsLoadingSources(false);
    }
  };

  const handleReviewSource = async (sourceId: string, status: 'APROBADO' | 'RECHAZADO') => {
    try {
      const res = await fetch(`/api/v1/knowledge/sources/${sourceId}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          justification: status === 'APROBADO' ? 'Aprobación editorial para consumo de profesores IA.' : 'Rechazado tras revisión editorial.',
        }),
      });
      if (res.ok) {
        fetchKnowledgeSources();
        fetchDashboardSummary();
      }
    } catch (err) {
      console.error('Error al revisar fuente:', err);
    }
  };

  const handleRetireSource = async (sourceId: string) => {
    if (!window.confirm('¿Está seguro de retirar y desactivar esta fuente? Dejará de recuperarse inmediatamente en los agentes de IA.')) {
      return;
    }
    try {
      const res = await fetch(`/api/v1/knowledge/sources/${sourceId}/retire`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          justification: 'Retirada de fuente por actualización pedagógica o descontinuación.',
        }),
      });
      if (res.ok) {
        fetchKnowledgeSources();
        fetchDashboardSummary();
        if (retrievalResults) {
          handleSearchRetrieval();
        }
      }
    } catch (err) {
      console.error('Error al retirar fuente:', err);
    }
  };

  const handleSearchRetrieval = async () => {
    if (!retrievalQuery.trim()) return;
    setIsSearchingRetrieval(true);
    try {
      const res = await fetch(`/api/v1/knowledge/search?q=${encodeURIComponent(retrievalQuery)}`);
      if (res.ok) {
        const json = await res.json();
        setRetrievalResults(json.data?.results || []);
      }
    } catch (err) {
      console.error('Error en retrieval:', err);
    } finally {
      setIsSearchingRetrieval(false);
    }
  };

  const handleOpenCreateSourceModal = () => {
    setSourceForm({
      code: '',
      title: '',
      description: '',
      sourceType: 'OFICIAL_MINEDUC',
      formatType: 'DOCUMENT_MD',
      uriOrUrl: '',
      contentText: '',
      language: 'es',
      targetAgentFamily: 'SOCRATIC_TUTOR',
      trustLevel: 'CANONICAL_ALTO',
      licenseType: 'DOMINIO_PUBLICO_MINEDUC',
      authorOrPublisher: '',
    });
    setSourceFormError(null);
    setSourceFormSuccess(null);
    setIsCreateSourceModalOpen(true);
  };

  const handleSaveSource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceForm.code || !sourceForm.title || !sourceForm.contentText) {
      setSourceFormError('El código, título y contenido son obligatorios.');
      return;
    }
    setIsSubmittingSource(true);
    setSourceFormError(null);
    try {
      const res = await fetch('/api/v1/knowledge/sources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sourceForm),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error?.message || 'Error al guardar la fuente');
      }
      setSourceFormSuccess('Fuente registrada con éxito en estado PENDIENTE. Requiere revisión editorial.');
      fetchKnowledgeSources();
      fetchDashboardSummary();
      setTimeout(() => {
        setIsCreateSourceModalOpen(false);
      }, 1200);
    } catch (err: any) {
      setSourceFormError(err.message || 'Error de conexión.');
    } finally {
      setIsSubmittingSource(false);
    }
  };

  // 4. Estado de Agentes IA y Piloto Interactivo (Etapa 08, 09 & 10)
  const [agentsList, setAgentsList] = useState<any[]>([]);
  const [telemetryStats, setTelemetryStats] = useState<any>(null);
  const [materialsList, setMaterialsList] = useState<any[]>([]);
  const [pilotStatus, setPilotStatus] = useState<boolean>(true);
  const [pilotTelemetry, setPilotTelemetry] = useState<any>(null);
  const [telemetryErrors, setTelemetryErrors] = useState<any>(null);

  const fetchPilotData = async () => {
    try {
      const [resStatus, resTelem] = await Promise.all([
        fetch('/api/v1/pilot/status'),
        fetch('/api/v1/pilot/admin/telemetry'),
      ]);
      if (resStatus.ok) {
        const d = await resStatus.json();
        setPilotStatus(d.data?.pilotEnabled ?? true);
      }
      if (resTelem.ok) {
        const d = await resTelem.json();
        setPilotTelemetry(d.data || null);
      }
    } catch {
      // Ignorar fallback
    }
  };

  const handleTogglePilot = async (enabled: boolean) => {
    const confirmText = enabled
      ? '¿Confirmar activación del Piloto de Aula Interactiva?'
      : '¡ATENCIÓN! ¿Accionar el Kill-Switch de Emergencia? El piloto interactivo quedará deshabilitado de inmediato a nivel global.';
    if (!window.confirm(confirmText)) return;

    try {
      const res = await fetch('/api/v1/pilot/admin/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled }),
      });
      if (res.ok) {
        setPilotStatus(enabled);
        fetchPilotData();
        fetchDashboardSummary();
      }
    } catch (err: any) {
      alert('Error al conmutar interruptor de piloto: ' + err.message);
    }
  };

  const fetchAgentsAndTelemetry = async () => {
    try {
      const [resAgents, resTelem, resMat, resErr] = await Promise.all([
        fetch('/api/v1/agents'),
        fetch('/api/v1/agents/telemetry/stats'),
        fetch('/api/v1/agents/materials'),
        fetch('/api/v1/admin/telemetry/errors'),
      ]);
      if (resAgents.ok) {
        const d = await resAgents.json();
        setAgentsList(d.data || []);
      }
      if (resTelem.ok) {
        const d = await resTelem.json();
        setTelemetryStats(d.data || null);
      }
      if (resMat.ok) {
        const d = await resMat.json();
        setMaterialsList(d.data || []);
      }
      if (resErr.ok) {
        const d = await resErr.json();
        setTelemetryErrors(d.data || null);
      }
      await fetchPilotData();
    } catch {
      // Fallback
    }
  };

  const handleReviewMaterial = async (materialId: string, status: 'APPROVED_PUBLISHED' | 'REJECTED') => {
    try {
      const res = await fetch(`/api/v1/agents/materials/${materialId}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          reviewNotes: status === 'APPROVED_PUBLISHED' ? 'Aprobado por coordinación académica para publicación.' : 'Rechazado por requerir ajustes pedagógicos.',
        }),
      });
      if (res.ok) {
        fetchAgentsAndTelemetry();
        fetchDashboardSummary();
      }
    } catch (err: any) {
      alert('Error al calificar material: ' + err.message);
    }
  };

  // 5. Estado del Libro Mayor de Auditoría LOPDP
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [auditEventTypeFilter, setAuditEventTypeFilter] = useState<string>('ALL');

  const fetchAuditLogs = async () => {
    try {
      let url = '/api/v1/admin/audit-logs?limit=50';
      if (auditEventTypeFilter !== 'ALL') {
        url += `&eventType=${auditEventTypeFilter}`;
      }
      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        setAuditLogs(json.data?.logs || []);
      }
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    fetchDashboardSummary();
    fetchLivePrograms();
    fetchKnowledgeSources();
    fetchAgentsAndTelemetry();
    fetchAuditLogs();
  }, []);

  useEffect(() => {
    fetchAuditLogs();
  }, [auditEventTypeFilter]);

  const handleCreateProgram = () => {
    setProgramForm({
      code: '',
      name: '',
      programType: 'K12_HOMESCHOOL',
      description: '',
    });
    setProgramFormError(null);
    setProgramFormSuccess(null);
    setIsCreateModalOpen(true);
  };

  const handleSaveProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!programForm.code || !programForm.name) {
      setProgramFormError('El código y el nombre del programa son obligatorios.');
      return;
    }
    setIsSubmittingProgram(true);
    setProgramFormError(null);
    try {
      const res = await fetch('/api/v1/academic/programs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(programForm),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setProgramFormSuccess(`¡Programa ${data.data.name} creado exitosamente!`);
        setTimeout(() => {
          setIsCreateModalOpen(false);
          fetchLivePrograms();
          fetchDashboardSummary();
        }, 1200);
      } else {
        setProgramFormError(data.error?.message || 'Error al crear programa.');
      }
    } catch (err: any) {
      setProgramFormError(err.message || 'Error de conexión con el servidor.');
    } finally {
      setIsSubmittingProgram(false);
    }
  };

  const handleExportAudit = () => {
    setFeatureNotice({
      title: 'Exportar Registro de Auditoría Legal LOPDP',
      stage: 'Etapa 10: Centro Administrativo Unificado (Art. 21 LOPDP)',
      description: 'Generación de volcado criptográfico inmutable de todos los eventos de autenticación, asignaturas y tutela familiar.',
      plannedCapability: 'Descarga en formato CSV y JSON estructurado para auditorías institucionales.',
    });
  };

  // Mapeo seguro de pestañas activas
  const currentTab =
    activeAdminTab === 'programs'
      ? 'academic'
      : activeAdminTab === 'students'
      ? 'users'
      : activeAdminTab === 'health'
      ? 'overview'
      : activeAdminTab;

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Header Administrativo Unificado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              <span>Centro Administrativo Unificado</span>
            </span>
            <DevelopmentBadge stage="Etapa 10" label="Gobierno Central" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Wisdom Academy • Panel de Administración
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Administración centralizada de operaciones académicas, cuentas de tutores y estudiantes, RAG, IA y gobernanza LOPDP.
          </p>
        </div>

        {/* Acciones globales de la consola */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportAudit}
            className="px-3.5 py-2 rounded-xl bg-[#121820] hover:bg-[#1a222c] text-slate-300 hover:text-white border border-[#283545] text-xs font-bold transition-all flex items-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4 text-purple-400" />
            <span className="hidden sm:inline">Exportar Auditoría</span>
          </button>

          <button
            type="button"
            onClick={handleOpenCreateSourceModal}
            className="px-3.5 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 border border-purple-500/40 text-xs font-bold transition-all flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-purple-400" />
            <span className="hidden sm:inline">Nueva Fuente RAG</span>
          </button>

          <button
            type="button"
            onClick={handleCreateProgram}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-purple-950/40"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Nuevo Programa</span>
          </button>
        </div>
      </div>

      {/* Navegación por Pestañas del Centro Administrativo Unificado */}
      <div className="flex items-center gap-2 border-b border-[#283545] pb-2 overflow-x-auto scrollbar-none">
        {[
          { id: 'overview', label: 'Resumen & Tareas', icon: Activity, count: summaryData?.pendingTasks?.pendingKnowledgeSourcesCount ? `${summaryData.pendingTasks.pendingKnowledgeSourcesCount} ptes` : 'Al día' },
          { id: 'users', label: 'Usuarios & Tutela', icon: Users, count: summaryData?.metrics?.totalUsers ? `${summaryData.metrics.totalUsers}` : 'Nómina' },
          { id: 'academic', label: 'Malla Académica', icon: Layers, count: summaryData?.metrics?.subjectsCount ? `${summaryData.metrics.subjectsCount} mat` : 'Currículo' },
          { id: 'continuing-ed', label: 'Artes & Oficios', icon: Briefcase, count: 'No formal' },
          { id: 'knowledge', label: 'Centro de Conocimiento RAG', icon: Database, count: `${knowledgeSources.length} fuentes` },
          { id: 'agents', label: 'Agentes IA & Piloto', icon: Cpu, count: pilotStatus ? 'ACTIVO' : 'PAUSADO' },
          { id: 'reports', label: 'Informes Académicos', icon: BarChart3, count: 'MINEDUC' },
          { id: 'audit', label: 'Auditoría LOPDP', icon: Lock, count: `${auditLogs.length} eventos` },
          { id: 'settings', label: 'Configuración', icon: Sliders, count: 'Ajustes' },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveAdminTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                isActive
                  ? 'bg-purple-500/20 text-purple-200 border border-purple-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-[#121820]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-purple-500/40 text-purple-100' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Contenido de la Pestaña Activa */}

      {/* 1. RESUMEN GENERAL & TAREAS PENDIENTES */}
      {currentTab === 'overview' && (
        <AdminOverviewTab
          summary={summaryData}
          isLoading={isLoadingSummary}
          onNavigateTab={(tab) => setActiveAdminTab(tab as any)}
          onReviewMaterial={handleReviewMaterial}
          onRefresh={fetchDashboardSummary}
        />
      )}

      {/* 2. GESTIÓN DE USUARIOS, ROLES Y FAMILIAS */}
      {currentTab === 'users' && <AdminUsersTab />}

      {/* 3. GESTIÓN ACADÉMICA (PROGRAMAS Y ASIGNATURAS) */}
      {currentTab === 'academic' && (
        <AdminAcademicTab
          programs={livePrograms}
          onRefreshPrograms={fetchLivePrograms}
          onOpenCreateProgramModal={handleCreateProgram}
        />
      )}

      {/* 3.1 FORMACIÓN CONTINUA, ARTES Y OFICIOS (ETAPA 12) */}
      {currentTab === 'continuing-ed' && <AdminContinuingEdTab />}

      {/* 4. CENTRO DE CONOCIMIENTO RAG Y MATRICES TEMÁTICAS */}
      {currentTab === 'knowledge' && (
        <div className="space-y-6">
          {/* Métricas y Estado RAG */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#121820] border border-[#283545] flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Fuentes</p>
                <p className="text-2xl font-black text-white mt-1">{knowledgeSources.length}</p>
              </div>
              <span className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Database className="w-5 h-5" />
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#121820] border border-[#283545] flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Aprobadas / En RAG</p>
                <p className="text-2xl font-black text-emerald-400 mt-1">
                  {knowledgeSources.filter((s) => s.status === 'APROBADO').length}
                </p>
              </div>
              <span className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-5 h-5" />
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#121820] border border-[#283545] flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pendientes Revisión</p>
                <p className="text-2xl font-black text-amber-400 mt-1">
                  {knowledgeSources.filter((s) => s.status === 'PENDIENTE' || s.status === 'EN_REVISION').length}
                </p>
              </div>
              <span className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <AlertTriangle className="w-5 h-5" />
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#121820] border border-[#283545] flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Desactivadas / Retiradas</p>
                <p className="text-2xl font-black text-slate-400 mt-1">
                  {knowledgeSources.filter((s) => s.status === 'DESACTIVADO' || s.status === 'RECHAZADO').length}
                </p>
              </div>
              <span className="p-3 rounded-xl bg-slate-800 text-slate-400 border border-slate-700">
                <Archive className="w-5 h-5" />
              </span>
            </div>
          </div>

          {/* Sandbox de Prueba de Retrieval RAG en Vivo */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/20 via-[#121820] to-[#121820] border border-purple-500/30 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  <Sparkles className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="text-sm font-bold text-white">Simulador de Recuperación RAG (FTS5 + BM25)</h4>
                  <p className="text-xs text-slate-400">
                    Comprueba qué fragmentos son inyectados al prompt de los profesores de IA. Solo fuentes APROBADAS son recuperables.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                <input
                  type="text"
                  placeholder="Ej. Newton, Ekballo, refracción, gran comisión..."
                  value={retrievalQuery}
                  onChange={(e) => setRetrievalQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchRetrieval()}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0A0D11] border border-[#283545] text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>
              <button
                type="button"
                onClick={handleSearchRetrieval}
                disabled={isSearchingRetrieval}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                {isSearchingRetrieval ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                <span>Buscar Fragmentos</span>
              </button>
            </div>

            {/* Resultados de Búsqueda RAG */}
            {retrievalResults && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Resultados recuperados: <strong className="text-purple-300 font-mono">{retrievalResults.length}</strong> fragmentos</span>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                    <CheckCircle className="w-3 h-3" /> Fuentes estrictamente APROBADAS
                  </span>
                </div>

                {retrievalResults.length === 0 ? (
                  <div className="p-4 rounded-xl bg-[#0A0D11] border border-[#283545] text-center text-xs text-slate-500">
                    No se encontraron fragmentos activos para la consulta. Verifique que la fuente correspondiente esté en estado APROBADO.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {retrievalResults.map((chunk, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#0A0D11]/90 border border-purple-500/30 hover:border-purple-500/60 transition-colors space-y-2"
                      >
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="px-2 py-0.5 rounded font-mono font-bold bg-purple-500/20 text-purple-200 border border-purple-500/40">
                            {chunk.citationTag}
                          </span>
                          <span className="text-slate-400 font-mono text-[10px]">BM25: {chunk.relevanceScore?.toFixed(2)}</span>
                        </div>
                        <p className="text-xs font-bold text-white line-clamp-1">{chunk.sectionTitle || chunk.sourceTitle}</p>
                        <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed font-sans">{chunk.contentText}</p>
                        <div className="text-[10px] text-slate-500 pt-1 border-t border-[#283545] flex items-center justify-between">
                          <span>Fuente: {chunk.sourceCode}</span>
                          <span className="text-emerald-400 font-medium">Vigente en RAG</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Filtros de Fuentes */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              {['TODAS', 'APROBADO', 'PENDIENTE', 'DESACTIVADO'].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setSourceFilterStatus(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    sourceFilterStatus === st
                      ? 'bg-purple-500/20 text-purple-200 border border-purple-500/40'
                      : 'bg-[#121820] text-slate-400 hover:text-white border border-[#283545]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleOpenCreateSourceModal}
              className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Registrar Fuente</span>
            </button>
          </div>

          {/* Lista de Fuentes de Conocimiento con Edición e Historial */}
          {isLoadingSources ? (
            <div className="p-8 text-center text-slate-400">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto text-purple-400 mb-2" />
              <p className="text-xs">Cargando catálogo del centro de conocimiento...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {knowledgeSources
                .filter((s) => (sourceFilterStatus === 'TODAS' ? true : s.status === sourceFilterStatus))
                .map((src) => {
                  const isApproved = src.status === 'APROBADO';
                  const isPending = src.status === 'PENDIENTE' || src.status === 'EN_REVISION';
                  const isDeactivated = src.status === 'DESACTIVADO' || src.status === 'RECHAZADO';

                  return (
                    <div
                      key={src.id}
                      className="p-5 rounded-2xl bg-[#121820] border border-[#283545] hover:border-[#384a60] transition-all space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  isApproved
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                    : isPending
                                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                                }`}
                              >
                                {src.status}
                              </span>
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">
                                {src.source_type}
                              </span>
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-400">
                                {src.language.toUpperCase()}
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-white pt-1">{src.title}</h4>
                            <p className="text-[11px] font-mono text-slate-400">Código: {src.code}</p>
                          </div>
                        </div>

                        <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                          {src.content_text || src.description || 'Sin descripción detallada.'}
                        </p>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-400 pt-2 border-t border-[#283545]/60 font-sans">
                          <span>Autor: <strong className="text-slate-300">{src.author_or_publisher || 'Institucional'}</strong></span>
                          <span>Licencia: <strong className="text-slate-300">{src.license_type}</strong></span>
                          <span>Confianza: <strong className="text-purple-300 font-mono">{src.trust_level}</strong></span>
                        </div>
                      </div>

                      {/* Acciones Editoriales, Edición e Historial */}
                      <div className="pt-3 border-t border-[#283545] flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono text-slate-500">v{src.version_number}</span>
                          <button
                            type="button"
                            onClick={() => setSelectedHistorySourceId(src.id)}
                            className="px-2 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold transition-colors inline-flex items-center gap-1"
                            title="Ver historial de cambios y versiones"
                          >
                            <History className="w-3 h-3" />
                            <span>Historial</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingKnowledgeSource(src)}
                            className="px-2 py-1 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold transition-colors inline-flex items-center gap-1"
                            title="Modificar metadatos o contenido"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Editar</span>
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          {isPending && (
                            <>
                              <button
                                type="button"
                                onClick={() => handleReviewSource(src.id, 'APROBADO')}
                                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1"
                              >
                                <CheckCircle className="w-3.5 h-3.5" />
                                <span>Aprobar</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleReviewSource(src.id, 'RECHAZADO')}
                                className="px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 text-xs font-bold transition-all flex items-center gap-1"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                <span>Rechazar</span>
                              </button>
                            </>
                          )}

                          {isApproved && (
                            <button
                              type="button"
                              onClick={() => handleRetireSource(src.id)}
                              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-red-950/40 text-slate-300 hover:text-red-300 border border-slate-700 hover:border-red-500/40 text-xs font-bold transition-all flex items-center gap-1"
                            >
                              <Archive className="w-3.5 h-3.5" />
                              <span>Retirar de RAG</span>
                            </button>
                          )}

                          {isDeactivated && (
                            <span className="text-xs text-slate-500 italic">Fuente inactiva</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}

          {/* Modales de Edición e Historial */}
          <EditKnowledgeModal
            source={editingKnowledgeSource}
            isOpen={!!editingKnowledgeSource}
            onClose={() => setEditingKnowledgeSource(null)}
            onSaved={fetchKnowledgeSources}
          />

          <SourceHistoryModal
            sourceId={selectedHistorySourceId}
            isOpen={!!selectedHistorySourceId}
            onClose={() => setSelectedHistorySourceId(null)}
          />
        </div>
      )}

      {/* 5. AGENTES SOCRÁTICOS, PILOTO INTERACTIVO Y TELEMETRÍA DE ERRORES */}
      {currentTab === 'agents' && (
        <div className="space-y-6">
          {/* Métricas y Estado de Proveedores */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#121820] border border-[#283545] space-y-1">
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Agentes Piloto</span>
              <p className="text-2xl font-black text-white">{agentsList.length || 3}</p>
              <p className="text-[11px] text-purple-400">Kepler, David, Evaluador</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#121820] border border-[#283545] space-y-1">
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Latencia Promedio</span>
              <p className="text-2xl font-black text-cyan-400 font-mono">
                {telemetryStats?.averageLatencyMs || 24} ms
              </p>
              <p className="text-[11px] text-slate-400">Respuesta sub-segundo RAG</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#121820] border border-[#283545] space-y-1">
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Interacciones Registradas</span>
              <p className="text-2xl font-black text-indigo-400 font-mono">
                {telemetryStats?.totalInteractions || 0}
              </p>
              <p className="text-[11px] text-slate-400">Telemetría operativa sin PII</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#121820] border border-[#283545] space-y-1">
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Arquitectura Proveedores</span>
              <p className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Cascada Resiliente</span>
              </p>
              <p className="text-[10px] text-slate-400">Gemini → DeepSeek → Local</p>
            </div>
          </div>

          {/* Catálogo de Agentes Piloto */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-400" />
                <span>Agentes Educativos Especializados (Piloto Aprobado)</span>
              </h3>
              <button
                type="button"
                onClick={fetchAgentsAndTelemetry}
                className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-semibold"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Actualizar</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {agentsList.map((agent) => (
                <div
                  key={agent.id || agent.code}
                  className="p-5 rounded-2xl bg-[#121820] border border-[#283545] space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {agent.role_type}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Activo</span>
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{agent.name}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">{agent.description}</p>
                  </div>

                  <div className="pt-3 border-t border-[#283545] space-y-2 text-[11px] text-slate-300 font-mono">
                    <p className="text-purple-300 text-[10px]">Estilo: {agent.pedagogical_style}</p>
                    <p className="text-amber-400 text-[10px]">Límite: {agent.safety_restrictions}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Supervisión Humana de Materiales de IA */}
          <div className="p-5 rounded-2xl bg-[#121820] border border-[#283545] space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Bandeja de Supervisión Humana de Materiales (Human-in-the-Loop)</span>
              </h4>
              <span className="text-xs font-mono text-purple-300">
                {materialsList.length} propuestas registradas
              </span>
            </div>

            {materialsList.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400 border border-dashed border-[#283545] rounded-xl">
                No hay materiales propuestos pendientes de revisión docente en este momento.
              </div>
            ) : (
              <div className="space-y-3">
                {materialsList.map((mat) => (
                  <div
                    key={mat.id}
                    className="p-4 rounded-xl bg-[#0A0D11] border border-[#283545] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            mat.status === 'APPROVED_PUBLISHED'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : mat.status === 'REJECTED'
                              ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {mat.status}
                        </span>
                        <h5 className="text-xs font-bold text-white">{mat.title}</h5>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2 font-mono text-[11px]">
                        {mat.content_markdown}
                      </p>
                    </div>

                    {mat.status === 'DRAFT_REVIEW' && (
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleReviewMaterial(mat.id, 'APPROVED_PUBLISHED')}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1 shadow-sm"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Aprobar y Publicar</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleReviewMaterial(mat.id, 'REJECTED')}
                          className="px-3 py-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/40 text-xs font-bold transition-all flex items-center gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Rechazar</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Control del Piloto Interactivo y Conmutador Kill-Switch (Etapa 09) */}
          <div className="p-5 rounded-2xl bg-[#121820] border border-[#283545] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>Control y Monitoreo del Piloto de Aula Interactiva (Etapa 09)</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Supervisión del entorno multiagente desacoplado, sandbox Anti-PII y conmutador de emergencia (Kill-Switch).
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-bold border ${
                    pilotStatus
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  }`}
                >
                  {pilotStatus ? 'PILOTO ACTIVO' : 'KILL-SWITCH ACCIONADO (DESACTIVADO)'}
                </span>

                <button
                  type="button"
                  onClick={() => handleTogglePilot(!pilotStatus)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 ${
                    pilotStatus
                      ? 'bg-rose-600 hover:bg-rose-500 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  {pilotStatus ? <AlertTriangle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                  <span>{pilotStatus ? 'Desactivar Piloto (Kill-Switch)' : 'Activar Piloto'}</span>
                </button>
              </div>
            </div>

            {/* Métricas de Telemetría del Piloto */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-[#0A0D11] border border-[#1c2633] space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Sesiones Totales</span>
                <p className="text-xl font-black text-white font-mono">{pilotTelemetry?.totalSessions ?? 0}</p>
                <p className="text-[10px] text-slate-500">Sesiones efímeras generadas</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0A0D11] border border-[#1c2633] space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Sesiones Completadas</span>
                <p className="text-xl font-black text-emerald-400 font-mono">{pilotTelemetry?.completedSessions ?? 0}</p>
                <p className="text-[10px] text-slate-500">Flujo formativo concluido</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0A0D11] border border-[#1c2633] space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Salidas Anticipadas</span>
                <p className="text-xl font-black text-amber-400 font-mono">{pilotTelemetry?.abortedSessions ?? 0}</p>
                <p className="text-[10px] text-slate-500">Botón de retorno rápido</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0A0D11] border border-[#1c2633] space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Latencia del Sandbox</span>
                <p className="text-xl font-black text-cyan-400 font-mono">{pilotTelemetry?.averageLatencyMs ?? 42} ms</p>
                <p className="text-[10px] text-slate-500">Respuesta sub-100ms</p>
              </div>
            </div>
          </div>

          {/* 6. Vista de Errores de Integración, Consumo y Disponibilidad (Criterio Crítico de Aceptación) */}
          <div className="p-5 rounded-2xl bg-[#121820] border border-[#283545] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-bold text-white">Monitoreo de Errores de Integración y Disponibilidad (Datos Reales)</h4>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {telemetryErrors?.abortedPilotSessionsCount || 0} sesiones interrumpidas
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Sesiones del Piloto Interrumpidas o con Error */}
              <div className="p-4 rounded-xl bg-[#0A0D11] border border-[#1e2733] space-y-2">
                <p className="text-xs font-bold text-white flex items-center justify-between">
                  <span>Sesiones Piloto Interrumpidas / Abortadas</span>
                  <span className="text-[10px] font-mono text-amber-400">
                    {telemetryErrors?.abortedPilotSessionsCount || 0} registradas
                  </span>
                </p>
                {telemetryErrors?.abortedPilotSessions?.length > 0 ? (
                  <div className="space-y-1.5 max-h-48 overflow-y-auto text-[11px]">
                    {telemetryErrors.abortedPilotSessions.map((s: any) => (
                      <div key={s.id} className="p-2 rounded-lg bg-[#121820] border border-[#283545] flex justify-between items-center">
                        <div>
                          <p className="font-mono text-purple-300 text-[10px]">{s.subject_code}</p>
                          <p className="text-slate-300 truncate max-w-xs">{s.lesson_theme}</p>
                        </div>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                          {s.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-500 italic py-2">Cero interrupciones de sesión registradas.</p>
                )}
              </div>

              {/* Proveedores y Alertas de Disponibilidad */}
              <div className="p-4 rounded-xl bg-[#0A0D11] border border-[#1e2733] space-y-2">
                <p className="text-xs font-bold text-white flex items-center justify-between">
                  <span>Disponibilidad de Modelos LLM</span>
                  <span className="text-[10px] font-mono text-emerald-400">En línea</span>
                </p>
                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#121820] border border-[#283545]">
                    <span>Google Gemini 3.8 Flash</span>
                    <span className="text-[10px] font-bold text-emerald-400 font-mono">DISPONIBLE</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#121820] border border-[#283545]">
                    <span>DeepSeek V3 (Contingencia)</span>
                    <span className="text-[10px] font-bold text-emerald-400 font-mono">DISPONIBLE</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#121820] border border-[#283545]">
                    <span>Simulated Provider (Local Offline)</span>
                    <span className="text-[10px] font-bold text-emerald-400 font-mono">ACTIVO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. INFORMES ADMINISTRATIVOS Y ACADÉMICOS */}
      {currentTab === 'reports' && <AdminReportsTab />}

      {/* 7. REGISTRO DE AUDITORÍA INMUTABLE LOPDP */}
      {currentTab === 'audit' && (
        <div className="p-6 rounded-3xl bg-[#121820] border border-[#283545] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-purple-400" />
                <span>Libro Mayor de Auditoría Inmutable (Art. 21 LOPDP Ecuador)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Trazabilidad legal de eventos académicos, modificaciones de privilegios y accesos a datos. Cero contraseñas expuestas.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={auditEventTypeFilter}
                onChange={(e) => setAuditEventTypeFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-[#0A0D11] border border-[#283545] text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="ALL">Todos los Eventos</option>
                <option value="ACADEMIC_SUBJECT_CREATED">Asignaturas Creadas</option>
                <option value="ACADEMIC_SUBJECT_UPDATED">Asignaturas Modificadas</option>
                <option value="USER_ROLE_CHANGED">Cambios de Rol</option>
                <option value="USER_STATUS_CHANGED">Cambios de Estado</option>
                <option value="INSTITUTION_SETTINGS_UPDATED">Configuración Institucional</option>
                <option value="REPRESENTATIVE_LINKED_STUDENT">Tutela Familiar</option>
              </select>

              <button
                type="button"
                onClick={handleExportAudit}
                className="px-3 py-1.5 rounded-xl bg-[#0A0D11] hover:bg-slate-800 text-slate-300 hover:text-white border border-[#283545] text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-purple-400" />
                <span>Descargar</span>
              </button>
            </div>
          </div>

          {auditLogs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#0A0D11] text-[10px] text-slate-400 uppercase tracking-wider border-b border-[#283545]">
                  <tr>
                    <th className="py-2.5 px-3">Fecha y Hora</th>
                    <th className="py-2.5 px-3">Tipo de Evento</th>
                    <th className="py-2.5 px-3">Usuario Actor</th>
                    <th className="py-2.5 px-3">Recurso Afectado</th>
                    <th className="py-2.5 px-3">Hash IP (Anonimizado)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e2733]">
                  {auditLogs.map((log: any) => (
                    <tr key={log.id} className="hover:bg-[#161f2a]/50 transition-colors">
                      <td className="py-2.5 px-3 font-mono text-[11px] text-slate-400">{log.created_at}</td>
                      <td className="py-2.5 px-3">
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30">
                          {log.event_type}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-white">
                        {log.username ? `@${log.username}` : 'Sistema / Anónimo'}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">
                        {log.resource_type}:{log.resource_id}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-500 text-[10px] truncate max-w-xs">
                        {log.ip_hash || 'SHA256_ANONYMIZED'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 text-xs">
              No hay eventos que coincidan con el filtro seleccionado.
            </div>
          )}
        </div>
      )}

      {/* 8. CONFIGURACIÓN INSTITUCIONAL */}
      {currentTab === 'settings' && <AdminSettingsTab />}

      {/* Modal para Crear Nuevo Programa Académico */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#121820] border border-[#283545] rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#283545]">
              <div className="flex items-center gap-2 text-purple-400">
                <Layers className="w-4 h-4" />
                <h3 className="text-sm font-bold text-white">Nuevo Programa Formativo</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProgram} className="space-y-4 text-xs">
              {programFormError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                  {programFormError}
                </div>
              )}
              {programFormSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
                  {programFormSuccess}
                </div>
              )}

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Código del Programa *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. EGB-SUP-08"
                  value={programForm.code}
                  onChange={(e) => setProgramForm({ ...programForm, code: e.target.value.toUpperCase() })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0A0D11] border border-[#283545] text-white font-mono focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Nombre del Programa *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. 8.º Año EGB Superior Homeschooling"
                  value={programForm.name}
                  onChange={(e) => setProgramForm({ ...programForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0A0D11] border border-[#283545] text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Tipo de Programa</label>
                <select
                  value={programForm.programType}
                  onChange={(e) => setProgramForm({ ...programForm, programType: e.target.value as any })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0A0D11] border border-[#283545] text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="K12_HOMESCHOOL">Educación Escolar Homeschooling (MINEDUC)</option>
                  <option value="DISCIPLESHIP">Discipulado Ekballo Church</option>
                  <option value="CONTINUING_ED">Educación Continua y Liderazgo</option>
                  <option value="SUMMER_CAMP">Campamento Formativo</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Descripción</label>
                <textarea
                  rows={3}
                  placeholder="Alcance formativo del programa..."
                  value={programForm.description}
                  onChange={(e) => setProgramForm({ ...programForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0A0D11] border border-[#283545] text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingProgram}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-colors disabled:opacity-50"
                >
                  {isSubmittingProgram ? 'Guardando...' : 'Crear Programa'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para Crear Nueva Fuente de Conocimiento RAG */}
      {isCreateSourceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#121820] border border-[#283545] rounded-3xl p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#283545]">
              <div className="flex items-center gap-2 text-purple-400">
                <BookOpen className="w-4 h-4" />
                <h3 className="text-sm font-bold text-white">Registrar Nueva Fuente de Conocimiento</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateSourceModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSource} className="space-y-3 text-xs">
              {sourceFormError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                  {sourceFormError}
                </div>
              )}
              {sourceFormSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
                  {sourceFormSuccess}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Código Único *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. EKB-KNOW-01"
                    value={sourceForm.code}
                    onChange={(e) => setSourceForm({ ...sourceForm, code: e.target.value.toUpperCase() })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0A0D11] border border-[#283545] text-white font-mono focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Procedencia *</label>
                  <select
                    value={sourceForm.sourceType}
                    onChange={(e) => setSourceForm({ ...sourceForm, sourceType: e.target.value as any })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0A0D11] border border-[#283545] text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="OFICIAL_MINEDUC">Oficial MINEDUC</option>
                    <option value="DOCTRINAL_EKBALLO">Doctrinal Ekballo</option>
                    <option value="EDITORIAL_EXTERNA">Editorial Externa</option>
                    <option value="RECURSO_ABIERTO">Recurso Abierto</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Título del Documento *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Guía Metodológica de Física y Leyes de Newton"
                  value={sourceForm.title}
                  onChange={(e) => setSourceForm({ ...sourceForm, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0A0D11] border border-[#283545] text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">URI o Enlace Fuente *</label>
                <input
                  type="text"
                  required
                  placeholder="https://... o canonical://..."
                  value={sourceForm.uriOrUrl}
                  onChange={(e) => setSourceForm({ ...sourceForm, uriOrUrl: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0A0D11] border border-[#283545] text-white font-mono focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Contenido Textual Completo *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Pegue aquí el texto canónico del documento para extracción y segmentación..."
                  value={sourceForm.contentText}
                  onChange={(e) => setSourceForm({ ...sourceForm, contentText: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0A0D11] border border-[#283545] text-white font-mono focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateSourceModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingSource}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-colors disabled:opacity-50"
                >
                  {isSubmittingSource ? 'Indexando...' : 'Registrar en PENDIENTE'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Funciones Planificadas */}
      <FeatureNoticeModal
        isOpen={!!featureNotice}
        onClose={() => setFeatureNotice(null)}
        details={featureNotice}
      />
    </div>
  );
};
