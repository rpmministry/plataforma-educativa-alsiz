import React, { useState, useEffect } from 'react';
import {
  Sliders,
  Save,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Shield,
  Server,
  Lock,
} from 'lucide-react';

export const AdminSettingsTab: React.FC = () => {
  const [settings, setSettings] = useState<any[]>([]);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/v1/admin/settings');
      if (res.ok) {
        const json = await res.json();
        setSettings(json.data?.settings || []);
        setFormValues(json.data?.settingsMap || {});
      }
    } catch (err) {
      console.error('Error al cargar ajustes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (key: string, val: string) => {
    setFormValues((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(null);
    setSaveError(null);

    try {
      const res = await fetch('/api/v1/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error?.message || 'Error al guardar los ajustes institucionales.');
      }

      setSaveSuccess(data.message || 'Configuración guardada exitosamente.');
      fetchSettings();
    } catch (err: any) {
      setSaveError(err.message || 'Error de conexión.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-[#121820] border border-[#283545] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#283545]">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-purple-400" />
            <div>
              <h3 className="text-sm font-bold text-white">Configuración Institucional de la Plataforma</h3>
              <p className="text-xs text-slate-400">
                Parámetros oficiales de identidad, seguridad LOPDP y políticas pedagógicas (Restringido a ADMIN).
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={fetchSettings}
            className="p-1.5 rounded-xl bg-[#0A0D11] hover:bg-slate-800 text-slate-400 hover:text-white border border-[#283545]"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-purple-400' : ''}`} />
          </button>
        </div>

        {saveSuccess && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{saveSuccess}</span>
          </div>
        )}

        {saveError && (
          <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{saveError}</span>
          </div>
        )}

        {isLoading ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-purple-400 mb-2" />
            Cargando parámetros institucionales...
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-5 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nombre Institucional */}
              <div className="p-4 rounded-2xl bg-[#0A0D11] border border-[#1e2733] space-y-2">
                <label className="font-bold text-white block">Nombre Oficial de la Institución</label>
                <input
                  type="text"
                  value={formValues['institution_name'] || ''}
                  onChange={(e) => handleChange('institution_name', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#121820] border border-[#283545] text-white focus:outline-none focus:border-purple-500"
                />
                <p className="text-[10px] text-slate-500">Visible en boletines oficiales, encabezados y reportes MINEDUC.</p>
              </div>

              {/* Año Lectivo Activo */}
              <div className="p-4 rounded-2xl bg-[#0A0D11] border border-[#1e2733] space-y-2">
                <label className="font-bold text-white block">Año Lectivo Activo</label>
                <input
                  type="text"
                  value={formValues['current_school_year'] || ''}
                  onChange={(e) => handleChange('current_school_year', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#121820] border border-[#283545] text-white focus:outline-none focus:border-purple-500"
                />
                <p className="text-[10px] text-slate-500">Periodo académico predeterminado para nuevas matrículas.</p>
              </div>

              {/* Correo de Soporte */}
              <div className="p-4 rounded-2xl bg-[#0A0D11] border border-[#1e2733] space-y-2">
                <label className="font-bold text-white block">Correo Electrónico de Atención a Familias</label>
                <input
                  type="email"
                  value={formValues['support_email'] || ''}
                  onChange={(e) => handleChange('support_email', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#121820] border border-[#283545] text-white focus:outline-none focus:border-purple-500"
                />
                <p className="text-[10px] text-slate-500">Canal institucional de comunicación para representantes legales.</p>
              </div>

              {/* Retención de Auditoría LOPDP */}
              <div className="p-4 rounded-2xl bg-[#0A0D11] border border-[#1e2733] space-y-2">
                <label className="font-bold text-white block">Días de Retención de Auditoría (LOPDP Art. 21)</label>
                <input
                  type="number"
                  min={90}
                  max={3650}
                  value={formValues['audit_retention_days'] || '365'}
                  onChange={(e) => handleChange('audit_retention_days', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#121820] border border-[#283545] text-white focus:outline-none focus:border-purple-500"
                />
                <p className="text-[10px] text-slate-500">Plazo mínimo legal de preservación del libro mayor inmutable.</p>
              </div>

              {/* Límite Diario de Turnos IA */}
              <div className="p-4 rounded-2xl bg-[#0A0D11] border border-[#1e2733] space-y-2">
                <label className="font-bold text-white block">Límite Diario de Interacciones IA por Estudiante</label>
                <input
                  type="number"
                  min={5}
                  max={100}
                  value={formValues['max_daily_ai_turns_student'] || '30'}
                  onChange={(e) => handleChange('max_daily_ai_turns_student', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#121820] border border-[#283545] text-white focus:outline-none focus:border-purple-500"
                />
                <p className="text-[10px] text-slate-500">Previene sobre-dependencia en tutores IA y controla consumo de API.</p>
              </div>

              {/* Consentimiento Parental Obligatorio */}
              <div className="p-4 rounded-2xl bg-[#0A0D11] border border-[#1e2733] space-y-2 flex flex-col justify-between">
                <div>
                  <label className="font-bold text-white block">Consentimiento Parental Obligatorio (Art. 22)</label>
                  <p className="text-[10px] text-slate-500 mt-1">Exige firma informada antes de habilitar cuadernos digitales.</p>
                </div>
                <select
                  value={formValues['require_parent_consent'] || 'true'}
                  onChange={(e) => handleChange('require_parent_consent', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#121820] border border-[#283545] text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="true">Activo (Estricto cumplimiento LOPDP)</option>
                  <option value="false">Desactivado (Solo pruebas de desarrollo)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-[#283545] flex items-center justify-between">
              <span className="text-[10px] text-slate-500 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                Los cambios quedan firmados en el libro mayor de auditoría inmutable.
              </span>
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs transition-all shadow-lg shadow-purple-950/40 flex items-center gap-2 disabled:opacity-50"
              >
                {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>{isSaving ? 'Guardando...' : 'Guardar Configuración Institucional'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

