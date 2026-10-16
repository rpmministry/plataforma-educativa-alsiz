import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Award,
  CheckCircle2,
  AlertCircle,
  Clock,
  RefreshCw,
  FileSpreadsheet,
} from 'lucide-react';

export const AdminReportsTab: React.FC = () => {
  const [reportData, setReportData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReport = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/v1/admin/reports/academic-summary');
      if (res.ok) {
        const json = await res.json();
        setReportData(json.data);
      }
    } catch (err) {
      console.error('Error al cargar reporte académico:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  const mastery = reportData?.competencyMasteryDistribution || {
    DEMONSTRATED_MASTERY: 0,
    COMPLETED_NO_MASTERY: 0,
    IN_PROGRESS: 0,
  };

  const totalMasteryEvents =
    (mastery.DEMONSTRATED_MASTERY || 0) +
    (mastery.COMPLETED_NO_MASTERY || 0) +
    (mastery.IN_PROGRESS || 0);

  const demonstratedPercent = totalMasteryEvents > 0
    ? Math.round(((mastery.DEMONSTRATED_MASTERY || 0) / totalMasteryEvents) * 100)
    : 100;

  return (
    <div className="space-y-6">
      {/* 1. Tarjetas de Resumen Competencial MINEDUC */}
      <div className="p-6 rounded-3xl bg-[#121820] border border-[#283545] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm font-bold text-white">Logro de Competencias Curriculares (MINEDUC Art. 32)</h3>
              <p className="text-xs text-slate-400">Seguimiento diferenciado: Actividades Completadas vs Dominio Demostrado</p>
            </div>
          </div>
          <button
            type="button"
            onClick={fetchReport}
            className="p-1.5 rounded-xl bg-[#0A0D11] hover:bg-slate-800 text-slate-400 hover:text-white border border-[#283545]"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-purple-400' : ''}`} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#0A0D11] border border-[#1e2733] space-y-1">
            <div className="flex items-center justify-between text-xs text-emerald-400">
              <span className="font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Dominio Demostrado
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20">
                ≥ 7.00/10
              </span>
            </div>
            <p className="text-2xl font-black text-white">{mastery.DEMONSTRATED_MASTERY || 0}</p>
            <p className="text-[10px] text-slate-400">{demonstratedPercent}% de las destrezas evaluadas</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0A0D11] border border-[#1e2733] space-y-1">
            <div className="flex items-center justify-between text-xs text-amber-400">
              <span className="font-semibold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                Completado sin Dominio
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/20">
                &lt; 7.00/10
              </span>
            </div>
            <p className="text-2xl font-black text-white">{mastery.COMPLETED_NO_MASTERY || 0}</p>
            <p className="text-[10px] text-slate-400">Requiere refuerzo pedagógico</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0A0D11] border border-[#1e2733] space-y-1">
            <div className="flex items-center justify-between text-xs text-indigo-400">
              <span className="font-semibold flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                En Progreso / Formativo
              </span>
            </div>
            <p className="text-2xl font-black text-white">{mastery.IN_PROGRESS || 0}</p>
            <p className="text-[10px] text-slate-400">En proceso de evaluación</p>
          </div>
        </div>
      </div>

      {/* 2. Rendimiento y Evaluaciones por Asignatura */}
      <div className="p-6 rounded-3xl bg-[#121820] border border-[#283545] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-bold text-white">Rendimiento Académico por Asignatura</h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {reportData?.totalSubjectsEvaluated || 0} materias monitoreadas
          </span>
        </div>

        {isLoading ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-purple-400 mb-2" />
            Generando reporte consolidado...
          </div>
        ) : reportData?.subjectMetrics?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#0A0D11] text-[10px] text-slate-400 uppercase tracking-wider border-b border-[#283545]">
                <tr>
                  <th className="py-2.5 px-3">Código</th>
                  <th className="py-2.5 px-3">Asignatura</th>
                  <th className="py-2.5 px-3">Categoría Curricular</th>
                  <th className="py-2.5 px-3">Evaluaciones</th>
                  <th className="py-2.5 px-3">Entregas</th>
                  <th className="py-2.5 px-3 text-right">Promedio General</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e2733]">
                {reportData.subjectMetrics.map((sm: any) => (
                  <tr key={sm.id} className="hover:bg-[#161f2a]/50 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-purple-300">{sm.code}</td>
                    <td className="py-3 px-3 font-bold text-white">{sm.name}</td>
                    <td className="py-3 px-3 text-[10px] text-slate-400">{sm.category}</td>
                    <td className="py-3 px-3 font-mono">{sm.evaluations_count}</td>
                    <td className="py-3 px-3 font-mono">{sm.total_submissions}</td>
                    <td className="py-3 px-3 text-right">
                      {sm.average_score !== null ? (
                        <span className={`font-mono font-bold px-2 py-0.5 rounded-full text-xs ${
                          sm.average_score >= 9.0
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : sm.average_score >= 7.0
                            ? 'bg-indigo-500/20 text-indigo-400'
                            : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {sm.average_score.toFixed(2)} / 10.00
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500 italic">Sin calificaciones</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-slate-400 text-xs">
            No se han registrado entregas evaluativas en el periodo actual.
          </div>
        )}
      </div>
    </div>
  );
};

