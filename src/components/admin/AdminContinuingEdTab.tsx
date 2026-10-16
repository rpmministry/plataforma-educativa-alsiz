import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Wrench,
  Palette,
  Code,
  Globe,
  Award,
  Search,
  PlusCircle,
  FileText,
  Users,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  Filter,
} from 'lucide-react';
import { DevelopmentBadge } from '../common/StateFeedback';

export const AdminContinuingEdTab: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Verificador de certificado
  const [verifyCode, setVerifyCode] = useState<string>('');
  const [verificationResult, setVerificationResult] = useState<any | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  // Modal de creación de curso
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [createSuccess, setCreateSuccess] = useState<string | null>(null);
  const [newCourse, setNewCourse] = useState({
    code: '',
    title: '',
    category: 'OFICIOS',
    modality: 'ONLINE_ASYNC',
    level: 'PRINCIPIANTE',
    language: 'es',
    estimatedDurationHours: 40,
    instructorName: '',
    shortDescription: '',
    status: 'PUBLISHED',
    maxCapacity: 30,
    pricingType: 'FREE',
    priceUsd: 0,
  });

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      let url = '/api/v1/continuing-ed/courses?includeDrafts=true';
      if (categoryFilter !== 'ALL') {
        url += `&category=${categoryFilter}`;
      }
      if (searchTerm) {
        url += `&search=${encodeURIComponent(searchTerm)}`;
      }
      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        setCourses(json.data || []);
      }
    } catch (e) {
      console.error('Error fetching courses:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [categoryFilter]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyCode.trim()) return;
    setIsVerifying(true);
    setVerifyError(null);
    setVerificationResult(null);

    try {
      const res = await fetch(`/api/v1/continuing-ed/certificates/verify/${encodeURIComponent(verifyCode.trim())}`);
      const json = await res.json();
      if (res.ok && json.success) {
        setVerificationResult(json.data);
      } else {
        setVerifyError(json.message || 'Certificado no encontrado o inválido');
      }
    } catch (err: any) {
      setVerifyError('Error de red al consultar el verificador');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourse.code || !newCourse.title || !newCourse.instructorName || !newCourse.shortDescription) {
      setCreateError('Todos los campos marcados son obligatorios');
      return;
    }

    setIsSubmitting(true);
    setCreateError(null);
    setCreateSuccess(null);

    try {
      const res = await fetch('/api/v1/continuing-ed/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newCourse,
          estimatedDurationHours: Number(newCourse.estimatedDurationHours),
          maxCapacity: newCourse.maxCapacity ? Number(newCourse.maxCapacity) : null,
          priceUsd: Number(newCourse.priceUsd),
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setCreateSuccess('¡Curso creado exitosamente!');
        fetchCourses();
        setTimeout(() => {
          setIsCreateModalOpen(false);
          setCreateSuccess(null);
        }, 1200);
      } else {
        setCreateError(json.error || 'Error al guardar el curso');
      }
    } catch (err: any) {
      setCreateError(err.message || 'Error de conexión');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'OFICIOS':
        return <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30"><Wrench className="w-3 h-3" /> Oficio</span>;
      case 'ARTES':
        return <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30"><Palette className="w-3 h-3" /> Artes</span>;
      case 'TECNOLOGIA':
        return <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"><Code className="w-3 h-3" /> Tecnología</span>;
      case 'IDIOMAS':
        return <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30"><Globe className="w-3 h-3" /> Idiomas</span>;
      case 'EMPRENDIMIENTO':
        return <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"><Briefcase className="w-3 h-3" /> Negocios</span>;
      case 'FORMACION_MINISTERIAL':
        return <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30"><Sparkles className="w-3 h-3" /> Ministerial</span>;
      default:
        return <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-500/20 text-slate-300 border border-slate-500/30"><BookOpen className="w-3 h-3" /> {cat}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner de Delimitación Legal y Separación Académica */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-[#161f2c] to-indigo-950/40 border border-amber-500/30 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-extrabold uppercase tracking-wider">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Formación Continua y Oficios</span>
              </span>
              <DevelopmentBadge stage="Etapa 12" label="Educación No Formal" />
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono">
                Art. 32 MINEDUC-2023-00069-A
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Cursos Profesionales, Artes y Oficios
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Catálogo de capacitación técnica, artes, idiomas, oficios y ministerio eclesiástico. Los programas aquí ofertados funcionan con régimen de <strong className="text-amber-200">educación no escolarizada</strong> y emiten constancias con código de verificación criptográfica SHA-256 y descargo legal expreso, manteniendo <strong className="text-white">estricta separación respecto a la malla formal K-12 de EGB</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-extrabold transition-all flex items-center gap-2 shadow-lg shadow-amber-950/30"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Nuevo Curso / Taller</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid de 2 columnas: Catálogo a la izquierda, Verificador de Certificados a la derecha */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna Izquierda (2/3): Catálogo de Cursos */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-[#121820] border border-[#283545]">
            <div className="flex items-center gap-2 flex-1">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchCourses()}
                placeholder="Buscar por código, nombre o descripción..."
                className="bg-transparent border-none text-xs text-white placeholder-slate-500 focus:outline-none w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-[#1a222c] border border-[#283545] rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none"
              >
                <option value="ALL">Todas las Categorías</option>
                <option value="OFICIOS">Oficios Prácticos</option>
                <option value="ARTES">Artes & Creatividad</option>
                <option value="TECNOLOGIA">Tecnología & Programación</option>
                <option value="IDIOMAS">Idiomas</option>
                <option value="EMPRENDIMIENTO">Emprendimiento & Negocios</option>
                <option value="FORMACION_MINISTERIAL">Formación Ministerial</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="p-8 text-center text-xs text-slate-400 bg-[#121820] rounded-xl border border-[#283545]">
              Cargando cursos y talleres...
            </div>
          ) : courses.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 bg-[#121820] rounded-xl border border-[#283545]">
              No se encontraron cursos con los filtros especificados.
            </div>
          ) : (
            <div className="space-y-3">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="p-4 rounded-xl bg-[#121820] border border-[#283545] hover:border-[#3b4c63] transition-all space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                          {course.code}
                        </span>
                        {getCategoryBadge(course.category)}
                        <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 font-bold">
                          {course.modality}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-bold">
                          {course.pricing_type === 'FREE' ? 'GRATUITO' : `$${course.price_usd} USD`}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white">{course.title}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2">{course.short_description}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        course.status === 'PUBLISHED'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}>
                        {course.status}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#1e2735] flex items-center justify-between text-[11px] text-slate-400">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        {course.estimated_duration_hours} horas lectivas
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-slate-500" />
                        {course.enrolled_count} {course.max_capacity ? `/ ${course.max_capacity}` : ''} inscritos
                      </span>
                      <span>Instructor: <strong className="text-slate-300">{course.instructor_name}</strong></span>
                    </div>

                    <span className="text-[10px] text-slate-500 font-mono">
                      Nivel: {course.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Columna Derecha (1/3): Verificador de Certificados & Métricas */}
        <div className="space-y-4">
          {/* Herramienta de Verificación Pública */}
          <div className="p-4 rounded-xl bg-[#121820] border border-[#283545] space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verificador de Certificados No Formales</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Consulta pública de autenticidad mediante código único o huella criptográfica SHA-256.
            </p>

            <form onSubmit={handleVerify} className="space-y-2">
              <input
                type="text"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value)}
                placeholder="Ej: CERT-OFIC-2026-A1B2C3 o hash SHA-256"
                className="w-full bg-[#1a222c] border border-[#283545] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
              <button
                type="submit"
                disabled={isVerifying}
                className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all disabled:opacity-50"
              >
                {isVerifying ? 'Consultando...' : 'Verificar Certificado'}
              </button>
            </form>

            {verifyError && (
              <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-[11px] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{verifyError}</span>
              </div>
            )}

            {verificationResult && (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-slate-200 text-xs space-y-2">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Certificado Auténtico Verificado</span>
                </div>
                <div className="text-[11px] space-y-1">
                  <div><strong>Participante:</strong> {verificationResult.studentFullName}</div>
                  <div><strong>Curso:</strong> {verificationResult.courseTitle}</div>
                  <div><strong>Horas acreditadas:</strong> {verificationResult.hoursCompleted} horas</div>
                  <div><strong>Código:</strong> <code className="bg-slate-800 px-1 rounded">{verificationResult.certificateCode}</code></div>
                  <div><strong>Fecha de emisión:</strong> {new Date(verificationResult.issuedAt).toLocaleDateString()}</div>
                </div>
                <div className="pt-2 border-t border-emerald-500/20 text-[10px] text-slate-400 italic leading-snug">
                  "{verificationResult.disclaimerLegal}"
                </div>
              </div>
            )}
          </div>

          {/* Tarjeta de Resumen Normativo */}
          <div className="p-4 rounded-xl bg-[#121820] border border-[#283545] space-y-2.5">
            <div className="flex items-center gap-2 text-white font-bold text-xs">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Marco Legal MINEDUC</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Conforme al <strong>Art. 32 del Acuerdo Ministerial MINEDUC-2023-00069-A</strong>, las instituciones y entidades promotoras pueden brindar actividades y cursos de capacitación no formal.
            </p>
            <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-200 leading-normal">
              <strong>Garantía de Aislamiento:</strong> Las constancias no formales no se computan dentro de los promedios ni proyectos interdisciplinarios del año lectivo formal de Educación General Básica.
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Creación de Curso */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-[#121820] border border-[#283545] p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#283545] pb-3">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-amber-400" />
                <h3 className="text-base font-bold text-white">Crear Nuevo Curso No Formal</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Código único *</label>
                  <input
                    type="text"
                    value={newCourse.code}
                    onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value.toUpperCase() })}
                    placeholder="Ej: OFIC-003"
                    className="w-full bg-[#1a222c] border border-[#283545] rounded-lg px-2.5 py-1.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Categoría *</label>
                  <select
                    value={newCourse.category}
                    onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                    className="w-full bg-[#1a222c] border border-[#283545] rounded-lg px-2.5 py-1.5 text-white"
                  >
                    <option value="OFICIOS">Oficios Prácticos</option>
                    <option value="ARTES">Artes & Diseño</option>
                    <option value="TECNOLOGIA">Tecnología & Programación</option>
                    <option value="IDIOMAS">Idiomas</option>
                    <option value="EMPRENDIMIENTO">Emprendimiento</option>
                    <option value="FORMACION_MINISTERIAL">Formación Ministerial</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Título del Curso *</label>
                <input
                  type="text"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  placeholder="Ej: Carpintería Básica y Restauración de Madera"
                  className="w-full bg-[#1a222c] border border-[#283545] rounded-lg px-2.5 py-1.5 text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Modalidad</label>
                  <select
                    value={newCourse.modality}
                    onChange={(e) => setNewCourse({ ...newCourse, modality: e.target.value as any })}
                    className="w-full bg-[#1a222c] border border-[#283545] rounded-lg px-2 py-1.5 text-white"
                  >
                    <option value="ONLINE_ASYNC">Online Asíncrono</option>
                    <option value="ONLINE_SYNC">Online Síncrono</option>
                    <option value="PRESENCIAL">Presencial</option>
                    <option value="HYBRID">Híbrido</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Nivel</label>
                  <select
                    value={newCourse.level}
                    onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value as any })}
                    className="w-full bg-[#1a222c] border border-[#283545] rounded-lg px-2 py-1.5 text-white"
                  >
                    <option value="PRINCIPIANTE">Principiante</option>
                    <option value="INTERMEDIO">Intermedio</option>
                    <option value="AVANZADO">Avanzado</option>
                    <option value="TODOS_LOS_NIVELES">Todos</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Duración (horas)</label>
                  <input
                    type="number"
                    value={newCourse.estimatedDurationHours}
                    onChange={(e) => setNewCourse({ ...newCourse, estimatedDurationHours: Number(e.target.value) })}
                    className="w-full bg-[#1a222c] border border-[#283545] rounded-lg px-2 py-1.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Instructor / Facilitador *</label>
                <input
                  type="text"
                  value={newCourse.instructorName}
                  onChange={(e) => setNewCourse({ ...newCourse, instructorName: e.target.value })}
                  placeholder="Ej: Mtro. Roberto Salazar"
                  className="w-full bg-[#1a222c] border border-[#283545] rounded-lg px-2.5 py-1.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Descripción Breve *</label>
                <textarea
                  value={newCourse.shortDescription}
                  onChange={(e) => setNewCourse({ ...newCourse, shortDescription: e.target.value })}
                  rows={2}
                  placeholder="Resumen del taller, habilidades que desarrollará y competencias adquiridas..."
                  className="w-full bg-[#1a222c] border border-[#283545] rounded-lg px-2.5 py-1.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Cupo Máximo</label>
                  <input
                    type="number"
                    value={newCourse.maxCapacity}
                    onChange={(e) => setNewCourse({ ...newCourse, maxCapacity: Number(e.target.value) })}
                    className="w-full bg-[#1a222c] border border-[#283545] rounded-lg px-2.5 py-1.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Tipo de Costo</label>
                  <select
                    value={newCourse.pricingType}
                    onChange={(e) => setNewCourse({ ...newCourse, pricingType: e.target.value as any })}
                    className="w-full bg-[#1a222c] border border-[#283545] rounded-lg px-2.5 py-1.5 text-white"
                  >
                    <option value="FREE">Gratuito (Ekballo Church)</option>
                    <option value="PAID">De Pago</option>
                  </select>
                </div>
              </div>

              {createError && (
                <div className="p-2 rounded bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
                  {createError}
                </div>
              )}

              {createSuccess && (
                <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
                  {createSuccess}
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#283545]">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-lg border border-[#283545] text-slate-300 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold disabled:opacity-50"
                >
                  {isSubmitting ? 'Guardando...' : 'Crear Curso'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

