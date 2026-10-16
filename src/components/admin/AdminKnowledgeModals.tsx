import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Edit3,
  History,
  CheckCircle2,
  RefreshCw,
  X,
  Clock,
  User,
  Shield,
} from 'lucide-react';

interface EditKnowledgeModalProps {
  source: any;
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export const EditKnowledgeModal: React.FC<EditKnowledgeModalProps> = ({
  source,
  isOpen,
  onClose,
  onSaved,
}) => {
  if (!isOpen || !source) return null;

  const [form, setForm] = useState({
    title: source.title || '',
    description: source.description || '',
    contentText: source.content_text || '',
    trustLevel: source.trust_level || 'CANONICAL_ALTO',
    licenseType: source.license_type || 'DOMINIO_PUBLICO_MINEDUC',
    authorOrPublisher: source.author_or_publisher || '',
    justification: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('El título no puede estar vacío.');
      return;
    }
    if (!form.justification.trim() || form.justification.trim().length < 5) {
      setError('Debe incluir una justificación para el libro de auditoría (mínimo 5 caracteres).');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/v1/knowledge/sources/${source.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title.trim(),
          description: form.description.trim(),
          contentText: form.contentText.trim(),
          trustLevel: form.trustLevel,
          licenseType: form.licenseType,
          authorOrPublisher: form.authorOrPublisher.trim(),
          justification: form.justification.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error?.message || 'Error al actualizar la fuente');
      }

      onSaved();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Error de conexión');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#121820] border border-[#283545] rounded-3xl p-6 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-[#283545]">
          <div className="flex items-center gap-2 text-purple-400">
            <Edit3 className="w-4 h-4" />
            <h3 className="text-sm font-bold text-white">Editar Fuente de Conocimiento</h3>
          </div>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div className="p-3 rounded-2xl bg-[#0A0D11] border border-[#1e2733] space-y-0.5">
            <span className="text-[10px] text-slate-500 font-mono">CÓDIGO CANÓNICO:</span>
            <p className="font-mono font-bold text-purple-300">{source.code}</p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="font-semibold text-slate-300">Título de la Fuente *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#0A0D11] border border-[#283545] text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-300">Descripción / Ámbito de Aplicación</label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#0A0D11] border border-[#283545] text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Nivel de Confianza</label>
              <select
                value={form.trustLevel}
                onChange={(e) => setForm({ ...form, trustLevel: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#0A0D11] border border-[#283545] text-white focus:outline-none focus:border-purple-500"
              >
                <option value="CANONICAL_ALTO">Canónico Alto (Doctrina/MINEDUC)</option>
                <option value="VERIFICADO_MEDIO">Verificado Medio</option>
                <option value="SUPLEMENTARIO_BAJO">Suplementario Bajo</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Licencia / Derechos</label>
              <select
                value={form.licenseType}
                onChange={(e) => setForm({ ...form, licenseType: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#0A0D11] border border-[#283545] text-white focus:outline-none focus:border-purple-500"
              >
                <option value="DOMINIO_PUBLICO_MINEDUC">Dominio Público MINEDUC</option>
                <option value="PROPIETARIO_EKBALLO">Propietario Ekballo Church</option>
                <option value="CREATIVE_COMMONS">Creative Commons</option>
                <option value="USO_EDUCATIVO_AUTORIZADO">Uso Educativo Autorizado</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-300">Contenido Textual</label>
            <textarea
              rows={4}
              value={form.contentText}
              onChange={(e) => setForm({ ...form, contentText: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#0A0D11] border border-[#283545] text-white font-mono text-[11px] focus:outline-none focus:border-purple-500"
            />
            <p className="text-[10px] text-slate-500">
              Si modifica el contenido, el sistema re-calculará el checksum SHA-256 y re-segmentará los fragmentos FTS5.
            </p>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-300">Justificación Editorial del Cambio (Obligatoria) *</label>
            <input
              type="text"
              required
              placeholder="Explique el motivo del ajuste para el historial de versiones..."
              value={form.justification}
              onChange={(e) => setForm({ ...form, justification: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#0A0D11] border border-[#283545] text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Guardando...' : 'Guardar y Re-Indexar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface SourceHistoryModalProps {
  sourceId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SourceHistoryModal: React.FC<SourceHistoryModalProps> = ({
  sourceId,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !sourceId) return null;

  const [historyData, setHistoryData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/v1/knowledge/sources/${sourceId}/history`);
        if (res.ok) {
          const json = await res.json();
          setHistoryData(json.data);
        }
      } catch (err) {
        console.error('Error al cargar historial de fuente:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [sourceId]);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#121820] border border-[#283545] rounded-3xl p-6 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-[#283545]">
          <div className="flex items-center gap-2 text-indigo-400">
            <History className="w-4 h-4" />
            <h3 className="text-sm font-bold text-white">Historial de Revisiones y Versiones</h3>
          </div>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {historyData && (
          <div className="p-3 rounded-2xl bg-[#0A0D11] border border-[#1e2733] space-y-0.5 text-xs">
            <p className="font-bold text-white">{historyData.sourceTitle}</p>
            <p className="font-mono text-[10px] text-purple-300">{historyData.sourceCode}</p>
          </div>
        )}

        {isLoading ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-purple-400 mb-2" />
            Consultando historial de auditoría...
          </div>
        ) : historyData?.history?.length > 0 ? (
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {historyData.history.map((h: any, idx: number) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-[#0A0D11] border border-[#1e2733] space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    h.action === 'APPROVED'
                      ? 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10'
                      : h.action === 'UPDATED'
                      ? 'border-indigo-500/40 text-indigo-300 bg-indigo-500/10'
                      : h.action === 'VERSIONED'
                      ? 'border-purple-500/40 text-purple-300 bg-purple-500/10'
                      : h.action === 'DEACTIVATED'
                      ? 'border-red-500/40 text-red-300 bg-red-500/10'
                      : 'border-slate-600 text-slate-300 bg-slate-800'
                  }`}>
                    {h.action}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">{h.performed_at}</span>
                </div>
                <p className="text-white text-[11px] leading-relaxed">{h.justification}</p>
                <div className="pt-1 text-[10px] text-slate-400 flex items-center gap-1.5">
                  <User className="w-3 h-3 text-slate-500" />
                  <span>Por: {h.first_name ? `${h.first_name} ${h.last_name} (${h.role})` : 'Sistema Automatizado'}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 text-center py-4">No se registran eventos de cambio para esta fuente.</p>
        )}

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#0A0D11] hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

