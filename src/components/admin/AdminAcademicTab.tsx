import React, { useState, useEffect } from 'react';
import {
  Layers,
  BookOpen,
  PlusCircle,
  Edit3,
  Calendar,
  CheckCircle2,
  RefreshCw,
  X,
  Clock,
  User,
} from 'lucide-react';

interface ProgramItem {
  id: string;
  code: string;
  name: string;
  program_type: string;
  description: string;
  is_active: number;
}

interface SubjectItem {
  id: string;
  program_id: string;
  level_id: string;
  code: string;
  name: string;
  category: string;
  weekly_hours: number;
  program_name?: string;
  level_name?: string;
  teacher_first_name?: string;
  teacher_last_name?: string;
}

interface AdminAcademicTabProps {
  programs: ProgramItem[];
  onRefreshPrograms: () => void;
  onOpenCreateProgramModal: () => void;
}

export const AdminAcademicTab: React.FC<AdminAcademicTabProps> = ({
  programs,
  onRefreshPrograms,
  onOpenCreateProgramModal,
}) => {
  const [subjects, setSubjects] = useState<SubjectItem[]>([]);
  const [periods, setPeriods] = useState<any[]>([]);
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(false);
  const [teachers, setTeachers] = useState<any[]>([]);

  // Modal para Crear Asignatura
  const [isCreateSubjectModalOpen, setIsCreateSubjectModalOpen] = useState(false);
  const [subjectForm, setSubjectForm] = useState({
    programId: '',
    levelId: '',
    code: '',
    name: '',
    category: 'TRONCAL_MINEDUC',
    weeklyHours: 4,
    defaultTeacherId: '',
  });
  const [subjectFormError, setSubjectFormError] = useState<string | null>(null);
  const [isSubmittingSubject, setIsSubmittingSubject] = useState(false);

  // Modal para Modificar/Editar Asignatura (Criterio Crítico de Aceptación)
  const [editingSubject, setEditingSubject] = useState<SubjectItem | null>(null);
  const [editSubjectForm, setEditSubjectForm] = useState({
    name: '',
    code: '',
    category: 'TRONCAL_MINEDUC',
    weeklyHours: 4,
    defaultTeacherId: '',
  });
  const [editSubjectError, setEditSubjectError] = useState<string | null>(null);
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);

  const fetchSubjects = async () => {
    setIsLoadingSubjects(true);
    try {
      const res = await fetch('/api/v1/academic/subjects?limit=50');
      if (res.ok) {
        const json = await res.json();
        setSubjects(json.data || []);
      }
    } catch (err) {
      console.error('Error al cargar asignaturas:', err);
    } finally {
      setIsLoadingSubjects(false);
    }
  };

  const fetchPeriodsAndTeachers = async () => {
    try {
      const [periodsRes, teachersRes] = await Promise.all([
        fetch('/api/v1/academic/periods'),
        fetch('/api/v1/admin/users?role=TEACHER'),
      ]);
      if (periodsRes.ok) {
        const pJson = await periodsRes.json();
        setPeriods(pJson.data || []);
      }
      if (teachersRes.ok) {
        const tJson = await teachersRes.json();
        setTeachers(tJson.data?.users || []);
      }
    } catch (err) {
      console.error('Error al cargar datos auxiliares:', err);
    }
  };

  useEffect(() => {
    fetchSubjects();
    fetchPeriodsAndTeachers();
  }, []);

  const handleOpenCreateSubject = () => {
    setSubjectForm({
      programId: programs[0]?.id || '',
      levelId: 'lvl-egb-08',
      code: '',
      name: '',
      category: 'TRONCAL_MINEDUC',
      weeklyHours: 4,
      defaultTeacherId: '',
    });
    setSubjectFormError(null);
    setIsCreateSubjectModalOpen(true);
  };

  const handleSaveSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectForm.code || !subjectForm.name || !subjectForm.programId) {
      setSubjectFormError('El código, nombre y programa son obligatorios.');
      return;
    }

    setIsSubmittingSubject(true);
    setSubjectFormError(null);

    try {
      const res = await fetch('/api/v1/academic/subjects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...subjectForm,
          code: subjectForm.code.trim().toUpperCase(),
          weeklyHours: Number(subjectForm.weeklyHours),
          defaultTeacherId: subjectForm.defaultTeacherId || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error?.message || 'Error al crear asignatura.');
      }

      setIsCreateSubjectModalOpen(false);
      fetchSubjects();
    } catch (err: any) {
      setSubjectFormError(err.message || 'Error de conexión.');
    } finally {
      setIsSubmittingSubject(false);
    }
  };

  const handleOpenEditSubject = (subj: SubjectItem) => {
    setEditingSubject(subj);
    setEditSubjectForm({
      name: subj.name,
      code: subj.code,
      category: subj.category || 'TRONCAL_MINEDUC',
      weeklyHours: subj.weekly_hours || 4,
      defaultTeacherId: '',
    });
    setEditSubjectError(null);
  };

  const handleSaveEditSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSubject) return;
    if (!editSubjectForm.name.trim() || !editSubjectForm.code.trim()) {
      setEditSubjectError('El código y el nombre no pueden quedar vacíos.');
      return;
    }

    setIsSubmittingEdit(true);
    setEditSubjectError(null);

    try {
      const res = await fetch(`/api/v1/academic/subjects/${editingSubject.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editSubjectForm.name.trim(),
          code: editSubjectForm.code.trim().toUpperCase(),
          category: editSubjectForm.category,
          weeklyHours: Number(editSubjectForm.weeklyHours),
          defaultTeacherId: editSubjectForm.defaultTeacherId || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error?.message || 'Error al actualizar la asignatura.');
      }

      setEditingSubject(null);
      fetchSubjects();
    } catch (err: any) {
      setEditSubjectError(err.message || 'Error de conexión.');
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Catálogo de Programas Académicos */}
      <div className="p-6 rounded-3xl bg-[#121820] border border-[#283545] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-bold text-white">Programas y Oferta Curricular Activa</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenCreateProgramModal}
              className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Nuevo Programa</span>
            </button>
            <button
              type="button"
              onClick={onRefreshPrograms}
              className="p-1.5 rounded-xl bg-[#0A0D11] hover:bg-slate-800 text-slate-400 hover:text-white border border-[#283545]"
              title="Refrescar programas"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {programs.map((program) => (
            <div
              key={program.id}
              className="p-4 rounded-2xl bg-[#0A0D11] border border-[#1e2733] space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-purple-300">{program.code}</span>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {program.is_active ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white mt-1">{program.name}</h4>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{program.description}</p>
              </div>
              <div className="pt-2 border-t border-[#1a232e] text-[10px] text-slate-500 flex justify-between">
                <span>Tipo: {program.program_type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Catálogo de Asignaturas y Modificación (Prueba de Aceptación Crítica) */}
      <div className="p-6 rounded-3xl bg-[#121820] border border-[#283545] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Malla Curricular: Asignaturas y Cargas Horarias</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleOpenCreateSubject}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Nueva Asignatura</span>
            </button>
            <button
              type="button"
              onClick={fetchSubjects}
              className="p-1.5 rounded-xl bg-[#0A0D11] hover:bg-slate-800 text-slate-400 hover:text-white border border-[#283545]"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingSubjects ? 'animate-spin text-purple-400' : ''}`} />
            </button>
          </div>
        </div>

        {isLoadingSubjects ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-purple-400 mb-2" />
            Cargando asignaturas...
          </div>
        ) : subjects.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#0A0D11] text-[10px] text-slate-400 uppercase tracking-wider border-b border-[#283545]">
                <tr>
                  <th className="py-2.5 px-3">Código</th>
                  <th className="py-2.5 px-3">Nombre Asignatura</th>
                  <th className="py-2.5 px-3">Categoría</th>
                  <th className="py-2.5 px-3">Carga Horaria</th>
                  <th className="py-2.5 px-3">Docente Asignado</th>
                  <th className="py-2.5 px-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e2733]">
                {subjects.map((subj) => (
                  <tr key={subj.id} className="hover:bg-[#161f2a]/50 transition-colors">
                    <td className="py-2.5 px-3 font-mono text-[11px] text-purple-300 font-bold">{subj.code}</td>
                    <td className="py-2.5 px-3 font-bold text-white">{subj.name}</td>
                    <td className="py-2.5 px-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {subj.category}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono">{subj.weekly_hours} hrs/sem</td>
                    <td className="py-2.5 px-3 text-slate-400 text-[11px]">
                      {subj.teacher_first_name ? `${subj.teacher_first_name} ${subj.teacher_last_name}` : 'Sin asignar'}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleOpenEditSubject(subj)}
                        className="px-2.5 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[11px] font-bold transition-colors inline-flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Editar</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-slate-400 text-xs">
            No se han registrado asignaturas en la base de datos.
          </div>
        )}
      </div>

      {/* 3. Periodos Lectivos y Calendario Escolar */}
      <div className="p-6 rounded-3xl bg-[#121820] border border-[#283545] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Periodos Lectivos y Calendario Institucional</h3>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold">Año Activo: 2026-2027</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {periods.map((p) => (
            <div key={p.id} className="p-4 rounded-2xl bg-[#0A0D11] border border-[#1e2733] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-purple-300">{p.code}</span>
                {p.is_current ? (
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                    ACTIVO
                  </span>
                ) : null}
              </div>
              <p className="font-bold text-white text-xs">{p.name}</p>
              <p className="text-[10px] text-slate-400">
                {p.start_date} al {p.end_date}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para Crear Nueva Asignatura */}
      {isCreateSubjectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#121820] border border-[#283545] rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#283545]">
              <div className="flex items-center gap-2 text-indigo-400">
                <PlusCircle className="w-4 h-4" />
                <h3 className="text-sm font-bold text-white">Crear Nueva Asignatura</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateSubjectModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSubject} className="space-y-4 text-xs">
              {subjectFormError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                  {subjectFormError}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Código Asignatura *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. MAT-801"
                    value={subjectForm.code}
                    onChange={(e) => setSubjectForm({ ...subjectForm, code: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0A0D11] border border-[#283545] text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Horas Semanales *</label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={subjectForm.weeklyHours}
                    onChange={(e) => setSubjectForm({ ...subjectForm, weeklyHours: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0A0D11] border border-[#283545] text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Nombre de la Asignatura *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Matemáticas y Razonamiento Lógico"
                  value={subjectForm.name}
                  onChange={(e) => setSubjectForm({ ...subjectForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#0A0D11] border border-[#283545] text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Categoría Curricular</label>
                <select
                  value={subjectForm.category}
                  onChange={(e) => setSubjectForm({ ...subjectForm, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#0A0D11] border border-[#283545] text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="TRONCAL_MINEDUC">Troncal MINEDUC (Ecuador)</option>
                  <option value="FORMACION_CRISTIANA">Formación Cristiana Ekballo</option>
                  <option value="COMPLEMENTARIA">Complementaria / STEM</option>
                  <option value="AMPLIACION_INTERNACIONAL">Ampliación Bilingüe Internacional</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Docente Responsable</label>
                <select
                  value={subjectForm.defaultTeacherId}
                  onChange={(e) => setSubjectForm({ ...subjectForm, defaultTeacherId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#0A0D11] border border-[#283545] text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="">Sin docente asignado</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.first_name} {t.last_name} (@{t.username})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateSubjectModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingSubject}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors disabled:opacity-50"
                >
                  {isSubmittingSubject ? 'Creando...' : 'Crear Asignatura'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para Modificar / Editar Asignatura (Prueba de Aceptación Crítica) */}
      {editingSubject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#121820] border border-[#283545] rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#283545]">
              <div className="flex items-center gap-2 text-indigo-400">
                <Edit3 className="w-4 h-4" />
                <h3 className="text-sm font-bold text-white">Modificar Asignatura</h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingSubject(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEditSubject} className="space-y-4 text-xs">
              {editSubjectError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                  {editSubjectError}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Código *</label>
                  <input
                    type="text"
                    required
                    value={editSubjectForm.code}
                    onChange={(e) => setEditSubjectForm({ ...editSubjectForm, code: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0A0D11] border border-[#283545] text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Horas Semanales *</label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={editSubjectForm.weeklyHours}
                    onChange={(e) => setEditSubjectForm({ ...editSubjectForm, weeklyHours: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0A0D11] border border-[#283545] text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Nombre de la Asignatura *</label>
                <input
                  type="text"
                  required
                  value={editSubjectForm.name}
                  onChange={(e) => setEditSubjectForm({ ...editSubjectForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#0A0D11] border border-[#283545] text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Categoría Curricular</label>
                <select
                  value={editSubjectForm.category}
                  onChange={(e) => setEditSubjectForm({ ...editSubjectForm, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#0A0D11] border border-[#283545] text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="TRONCAL_MINEDUC">Troncal MINEDUC (Ecuador)</option>
                  <option value="FORMACION_CRISTIANA">Formación Cristiana Ekballo</option>
                  <option value="COMPLEMENTARIA">Complementaria / STEM</option>
                  <option value="AMPLIACION_INTERNACIONAL">Ampliación Bilingüe Internacional</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingSubject(null)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingEdit}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors disabled:opacity-50"
                >
                  {isSubmittingEdit ? 'Guardando Cambios...' : 'Guardar Modificaciones'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

