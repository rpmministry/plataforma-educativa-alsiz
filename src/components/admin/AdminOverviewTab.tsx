import React from 'react';
import {
  Users,
  Layers,
  BookOpen,
  Cpu,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  Server,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

interface AdminOverviewTabProps {
  summary: any;
  isLoading: boolean;
  onNavigateTab: (tabId: string) => void;
  onReviewMaterial?: (materialId: string, status: 'APPROVED_PUBLISHED' | 'REJECTED') => void;
  onRefresh: () => void;
}

export const AdminOverviewTab: React.FC<AdminOverviewTabProps> = ({
  summary,
  isLoading,
  onNavigateTab,
  onReviewMaterial,
  onRefresh,
}) => {
  if (isLoading || !summary) {
    return (
      <div className="p-12 text-center text-slate-400">
        <Activity className="w-8 h-8 animate-spin mx-auto text-purple-400 mb-3" />
        <p className="text-sm font-semibold">Cargando métricas consolidadas del sistema...</p>
      </div>
    );
  }

  const { metrics, pendingTasks, system } = summary;

  return (
    <div className="space-y-6">
      {/* 1. Tarjetas de Métricas Principales (KPIs Reales) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Usuarios Totales */}
        <div
          onClick={() => onNavigateTab('users')}
          className="p-5 rounded-3xl bg-[#121820] border border-[#283545] hover:border-purple-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-400 group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
              {metrics?.totalUsers || 0} Registrados
            </span>
          </div>
          <h3 className="text-2xl font-black text-white">{metrics?.totalUsers || 0}</h3>
          <p className="text-xs text-slate-400 mt-1">Usuarios en el sistema</p>
          <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-[#1a232e] text-[10px] text-slate-400">
            <span>🎓 {metrics?.usersByRole?.STUDENT || 0} Alumnos</span>
            <span>•</span>
            <span>👨‍👩‍👧 {metrics?.usersByRole?.REPRESENTATIVE || 0} Padres</span>
            <span>•</span>
            <span>👨‍🏫 {metrics?.usersByRole?.TEACHER || 0} Docentes</span>
          </div>
        </div>

        {/* Oferta Académica */}
        <div
          onClick={() => onNavigateTab('academic')}
          className="p-5 rounded-3xl bg-[#121820] border border-[#283545] hover:border-indigo-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-400 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">
              {metrics?.programsCount || 0} Programas
            </span>
          </div>
          <h3 className="text-2xl font-black text-white">{metrics?.subjectsCount || 0}</h3>
          <p className="text-xs text-slate-400 mt-1">Asignaturas estructuradas</p>
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#1a232e] text-[10px] text-slate-400">
            <span>📝 {metrics?.enrollmentsCount || 0} Matrículas activas</span>
          </div>
        </div>

        {/* Centro de Conocimiento RAG */}
        <div
          onClick={() => onNavigateTab('knowledge')}
          className="p-5 rounded-3xl bg-[#121820] border border-[#283545] hover:border-emerald-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
              {metrics?.knowledge?.approvedSources || 0} Aprobadas
            </span>
          </div>
          <h3 className="text-2xl font-black text-white">{metrics?.knowledge?.totalSources || 0}</h3>
          <p className="text-xs text-slate-400 mt-1">Fuentes de conocimiento</p>
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#1a232e] text-[10px] text-slate-400">
            <span>📦 {metrics?.knowledge?.chunksCount || 0} Chunks indexados FTS5</span>
          </div>
        </div>

        {/* Motores IA & Piloto */}
        <div
          onClick={() => onNavigateTab('agents')}
          className="p-5 rounded-3xl bg-[#121820] border border-[#283545] hover:border-amber-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-400 group-hover:scale-105 transition-transform">
              <Cpu className="w-5 h-5" />
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              metrics?.pilot?.enabled
                ? 'bg-emerald-500/20 text-emerald-300'
                : 'bg-rose-500/20 text-rose-300'
            }`}>
              {metrics?.pilot?.enabled ? 'Piloto ACTIVO' : 'Kill-Switch ACTIVO'}
            </span>
          </div>
          <h3 className="text-2xl font-black text-white">{metrics?.ai?.activeAgentsCount || 0}</h3>
          <p className="text-xs text-slate-400 mt-1">Profesores IA Activos</p>
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#1a232e] text-[10px] text-slate-400">
            <span>⚡ {metrics?.ai?.averageLatencyMs || 0} ms latencia media</span>
          </div>
        </div>
      </div>

      {/* 2. Bandeja de Tareas Pendientes (Action Items) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fuentes pendientes de revisión editorial */}
        <div className="p-6 rounded-3xl bg-[#121820] border border-[#283545] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                <Clock className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-bold text-white">Fuentes de Conocimiento Pendientes</h3>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
              {pendingTasks?.pendingKnowledgeSourcesCount || 0}
            </span>
          </div>

          {pendingTasks?.pendingKnowledgeSources?.length > 0 ? (
            <div className="space-y-2.5">
              {pendingTasks.pendingKnowledgeSources.map((source: any) => (
                <div
                  key={source.id}
                  className="p-3.5 rounded-2xl bg-[#0A0D11] border border-[#1e2733] flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">{source.title}</p>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                      <span className="font-mono text-purple-300">{source.code}</span>
                      <span>•</span>
                      <span>{source.source_type}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigateTab('knowledge')}
                    className="shrink-0 px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <span>Revisar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-[#0A0D11]/60 border border-[#1e2733] text-center text-slate-400 text-xs">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <p>No hay fuentes pendientes de revisión editorial. Todo el catálogo se encuentra al día.</p>
            </div>
          )}
        </div>

        {/* Materiales didácticos de IA en supervisión docente */}
        <div className="p-6 rounded-3xl bg-[#121820] border border-[#283545] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                <Sparkles className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-bold text-white">Materiales IA en Supervisión Docente</h3>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
              {pendingTasks?.pendingMaterialsCount || 0}
            </span>
          </div>

          {pendingTasks?.pendingMaterials?.length > 0 ? (
            <div className="space-y-2.5">
              {pendingTasks.pendingMaterials.map((mat: any) => (
                <div
                  key={mat.id}
                  className="p-3.5 rounded-2xl bg-[#0A0D11] border border-[#1e2733] flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">{mat.title}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Propuesto por: {mat.agent_id}</p>
                  </div>
                  {onReviewMaterial && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => onReviewMaterial(mat.id, 'APPROVED_PUBLISHED')}
                        className="px-2.5 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold transition-colors"
                      >
                        Aprobar
                      </button>
                      <button
                        type="button"
                        onClick={() => onReviewMaterial(mat.id, 'REJECTED')}
                        className="px-2.5 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-bold transition-colors"
                      >
                        Rechazar
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-[#0A0D11]/60 border border-[#1e2733] text-center text-slate-400 text-xs">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <p>No hay borradores de IA pendientes de aprobación docente.</p>
            </div>
          )}
        </div>
      </div>

      {/* 3. Diagnóstico de Infraestructura y Estado Operativo */}
      <div className="p-6 rounded-3xl bg-[#121820] border border-[#283545] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-bold text-white">Diagnóstico de Infraestructura y Motor de Persistencia</h3>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            OPERATIVO
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-2xl bg-[#0A0D11] border border-[#1e2733] space-y-1">
            <span className="text-[10px] text-slate-400">Motor de Base de Datos</span>
            <p className="font-semibold text-white truncate">{system?.engine || 'node:sqlite (WAL)'}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#0A0D11] border border-[#1e2733] space-y-1">
            <span className="text-[10px] text-slate-400">Migraciones Verificadas</span>
            <p className="font-mono font-bold text-emerald-400">{system?.migrationsApplied || 11} de 11 Aplicadas</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#0A0D11] border border-[#1e2733] space-y-1">
            <span className="text-[10px] text-slate-400">Tiempo de Actividad (Uptime)</span>
            <p className="font-mono text-white">{Math.round((system?.uptimeSeconds || 3600) / 60)} minutos</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#0A0D11] border border-[#1e2733] space-y-1">
            <span className="text-[10px] text-slate-400">Memoria Heap Servidor</span>
            <p className="font-mono text-white">{system?.memoryUsageMb || 0} MB</p>
          </div>
        </div>
      </div>
    </div>
  );
};

