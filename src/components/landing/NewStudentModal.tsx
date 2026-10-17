import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  X,
  UserPlus,
  Sparkles,
  BookOpen,
  GraduationCap,
  Bot,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Compass,
  Layers,
  Cpu,
  Mail,
  KeyRound,
  Copy,
  Check,
} from 'lucide-react';

interface NewStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDemoStudent?: (studentData: any) => void;
}

export const NewStudentModal: React.FC<NewStudentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { createStudentInDatabase, currentUser, openAuthModal, setActiveTab } = useSchool();

  const isAuthorizedCreator = currentUser?.role === 'ADMIN' || currentUser?.role === 'REPRESENTATIVE';

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [studentName, setStudentName] = useState('');
  const [studentAge, setStudentAge] = useState<number>(10);
  const [gradeLevel, setGradeLevel] = useState<string>('elemental');
  const [pedagogy, setPedagogy] = useState<string>('charlotte');
  const [customEmail, setCustomEmail] = useState('');
  const [customPin, setCustomPin] = useState('');
  const [customPass, setCustomPass] = useState('');
  const [createdSuccess, setCreatedSuccess] = useState(false);
  const [createdCredentials, setCreatedCredentials] = useState<{ email: string; pinCode: string; password?: string } | null>(null);
  const [copiedPin, setCopiedPin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!isOpen) return null;

  const getGradeTitle = (key: string) => {
    switch (key) {
      case 'inicial':
        return 'Educación Inicial (3 - 5 años)';
      case 'elemental':
        return 'Básica Elemental (6 - 8 años / 2.º a 4.º EGB)';
      case 'media':
        return 'Básica Media (9 - 11 años / 5.º a 7.º EGB)';
      case 'superior':
        return 'Básica Superior (12 - 14 años / 8.º a 10.º EGB)';
      case 'bachillerato':
        return 'Bachillerato General / Internacional (15 - 18 años)';
      default:
        return 'Nivel Personalizado';
    }
  };

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const parts = studentName.trim().split(/\s+/);
    const firstName = parts[0] || 'Estudiante';
    const lastName = parts.slice(1).join(' ') || 'ALSIZ';

    const progId = gradeLevel === 'inicial' ? 'prog-inicial' : (gradeLevel === 'bachillerato' ? 'prog-bgu' : 'prog-egb');
    const lvlId = gradeLevel === 'inicial' ? 'lvl-inicial-2' : (gradeLevel === 'elemental' ? 'lvl-egb-04' : (gradeLevel === 'media' ? 'lvl-egb-06' : (gradeLevel === 'superior' ? 'lvl-egb-08' : 'lvl-bgu-01')));

    const res = await createStudentInDatabase({
      firstName,
      lastName,
      programId: progId,
      levelId: lvlId,
      representativeId: currentUser?.role === 'REPRESENTATIVE' ? (currentUser.representativeId || currentUser.id) : undefined,
      relationshipType: 'FATHER',
      initialPin: customPin.trim() || undefined,
      initialPassword: customPass.trim() || undefined,
      consentVerified: true,
    });

    setIsSubmitting(false);

    if (res.success && res.data) {
      setCreatedCredentials({
        email: res.data.student.email,
        pinCode: res.data.temporaryCredentials.initialPin,
        password: res.data.temporaryCredentials.initialPassword,
      });
      setCreatedSuccess(true);
    } else {
      setSubmitError(res.error || 'Error al registrar el estudiante en la base de datos.');
    }
  };

  const handleCopyPin = () => {
    if (createdCredentials?.pinCode) {
      navigator.clipboard.writeText(createdCredentials.pinCode);
      setCopiedPin(true);
      setTimeout(() => setCopiedPin(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#18181B] border border-[#27272A] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 bg-[#121214] border-b border-[#27272A] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#E0A82E]/10 text-[#E0A82E] border border-[#E0A82E]/30">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E0A82E] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Admisión & Registro de Nuevo Estudiante</span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Incorporación a Wisdom Academy
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#A1A1AA] hover:text-white hover:bg-[#27272A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto overscroll-contain space-y-6 flex-1 text-[#F4F4F5]">
          {!isAuthorizedCreator ? (
            <div className="text-center py-6 space-y-6 animate-fade-in">
              <div className="w-14 h-14 rounded-2xl bg-[#E0A82E]/10 text-[#E0A82E] border border-[#E0A82E]/30 flex items-center justify-center mx-auto shadow-lg">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-xl font-bold text-white">Registro Institucional Administrado</h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  Conforme a la Ley Orgánica de Protección de Datos Personales (LOPDP), la inscripción y creación de cuentas estudiantiles en la base de datos es gestionada exclusivamente por Representantes Legales autenticados o por la Administración Académica.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#0A0A0A] border border-[#27272A] text-xs text-[#A1A1AA] max-w-md mx-auto text-left space-y-2">
                <p>• <strong>Representantes y Docentes:</strong> Inicie sesión con sus credenciales institucionales para matricular a un menor.</p>
                <p>• <strong>Nuevas Familias:</strong> Comuníquese con la secretaría para la validación del consentimiento y apertura de expediente.</p>
              </div>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    openAuthModal();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#E0A82E] hover:bg-[#B77D06] text-[#0A0A0A] font-semibold text-xs shadow-md transition-colors"
                >
                  Iniciar Sesión como Representante / Admin
                </button>
              </div>
            </div>
          ) : !createdSuccess ? (
            <form onSubmit={handleCreateStudent} className="space-y-6">
              {submitError && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <span>{submitError}</span>
                </div>
              )}
              
              {/* Stepper indicators */}
              <div className="flex items-center justify-between border-b border-[#27272A] pb-4">
                {[
                  { num: 1, label: 'Datos Básicos' },
                  { num: 2, label: 'Nivel & Currículo' },
                  { num: 3, label: 'Credenciales & Enfoque' },
                ].map((s) => (
                  <button
                    key={s.num}
                    type="button"
                    onClick={() => setStep(s.num as any)}
                    className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors ${
                      step === s.num
                        ? 'bg-[#E0A82E] text-[#0A0A0A] shadow-md'
                        : 'bg-[#27272A] text-[#A1A1AA] hover:text-white'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-[#18181B] text-[10px] flex items-center justify-center font-bold">
                      {s.num}
                    </span>
                    <span>{s.label}</span>
                  </button>
                ))}
              </div>

              {/* STEP 1: Basic Info */}
              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Nombre Completo del Estudiante *
                    </label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Ej. Mateo Fernández"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0A0A0A] border border-[#27272A] text-white placeholder-[#71717A] focus:outline-none focus:border-[#E0A82E] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#D4D4D8] uppercase tracking-wider mb-2">
                      Edad del Estudiante: <span className="text-[#E0A82E]">{studentAge} años</span>
                    </label>
                    <input
                      type="range"
                      min={3}
                      max={18}
                      value={studentAge}
                      onChange={(e) => {
                        const age = parseInt(e.target.value);
                        setStudentAge(age);
                        if (age <= 5) setGradeLevel('inicial');
                        else if (age <= 8) setGradeLevel('elemental');
                        else if (age <= 11) setGradeLevel('media');
                        else if (age <= 14) setGradeLevel('superior');
                        else setGradeLevel('bachillerato');
                      }}
                      className="w-full accent-[#E0A82E] bg-[#27272A] rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-[#71717A] mt-1 font-mono">
                      <span>3 años</span>
                      <span>8 años</span>
                      <span>12 años</span>
                      <span>18 años</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0A0A0A] border border-[#27272A] text-xs text-[#D4D4D8] flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#E0A82E] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">Generación Automática de Perfil Personalizado</p>
                      <p className="text-[#A1A1AA] mt-0.5">
                        Al completar el registro, la plataforma configurará automáticamente el microcurrículo anual de 200 días, la asignación de materias y el Profesor Virtual de IA correspondiente a su edad.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      disabled={!studentName.trim()}
                      onClick={() => setStep(2)}
                      className="px-5 py-2.5 rounded-xl bg-[#E0A82E] hover:bg-[#B77D06] text-[#0A0A0A] font-semibold text-sm transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                      <span>Siguiente: Nivel Académico</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Academic Level */}
              {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <label className="block text-xs font-bold text-[#D4D4D8] uppercase tracking-wider mb-2">
                    Selecciona el Nivel Académico o Año Lectivo:
                  </label>

                  <div className="grid grid-cols-1 gap-3">
                    {[
                      {
                        id: 'inicial',
                        title: 'Educación Inicial (3 - 5 años)',
                        desc: 'Desarrollo motriz, lectoescritura vivencial, descubrimiento sensorial y cuentos guiados.',
                        badge: 'Educación Parvularia',
                      },
                      {
                        id: 'elemental',
                        title: 'Básica Elemental (6 - 8 años / 2.º a 4.º EGB)',
                        desc: 'Lectura comprensiva, operaciones matemáticas básicas, ciencias naturales descubiertas y diario de naturaleza.',
                        badge: 'Primaria Inicial',
                      },
                      {
                        id: 'media',
                        title: 'Básica Media (9 - 11 años / 5.º a 7.º EGB)',
                        desc: 'Pensamiento lógico abstracto, proyectos de ciencias integradas, historia narrada y experimentos simulados.',
                        badge: 'Primaria Intermedia',
                      },
                      {
                        id: 'superior',
                        title: 'Básica Superior (12 - 14 años / 8.º a 10.º EGB)',
                        desc: 'Álgebra, física e historia comparada, laboratorio PhET, debates socráticos y proyectos interdisciplinarios.',
                        badge: 'Secundaria Básica',
                      },
                      {
                        id: 'bachillerato',
                        title: 'Bachillerato General / Internacional (15 - 18 años)',
                        desc: 'Filosofía, pensamiento crítico profundo, investigación académica asistida por IA y preparación universitaria.',
                        badge: 'Bachillerato',
                      },
                    ].map((lvl) => (
                      <div
                        key={lvl.id}
                        onClick={() => setGradeLevel(lvl.id)}
                        className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                          gradeLevel === lvl.id
                            ? 'bg-[#27272A]/70 border-[#E0A82E] ring-1 ring-[#E0A82E]/50'
                            : 'bg-[#0A0A0A] border-[#27272A] hover:border-[#3F3F46]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold text-white">{lvl.title}</h4>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#27272A] text-[#E0A82E] border border-[#3F3F46]">
                            {lvl.badge}
                          </span>
                        </div>
                        <p className="text-xs text-[#A1A1AA] mt-1">{lvl.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 rounded-xl bg-[#27272A] text-[#E4E4E7] hover:bg-[#3F3F46] text-xs font-semibold"
                    >
                      Atrás
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-5 py-2.5 rounded-xl bg-[#E0A82E] hover:bg-[#B77D06] text-[#0A0A0A] font-semibold text-sm transition-colors flex items-center gap-2"
                    >
                      <span>Siguiente: Credenciales & Enfoque</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Credentials & Pedagogy */}
              {step === 3 && (
                <div className="space-y-4 animate-fade-in">
                  
                  {/* Optional Custom Credentials */}
                  <div className="p-4 rounded-xl bg-[#0A0A0A] border border-[#27272A] space-y-3">
                    <h5 className="text-xs font-semibold text-[#E0A82E] uppercase tracking-wider flex items-center gap-2">
                      <KeyRound className="w-3.5 h-3.5" />
                      <span>Credenciales Personalizadas de Acceso (Opcional):</span>
                    </h5>
                    <p className="text-[11px] text-[#A1A1AA]">
                      Si lo deseas, puedes definir el correo y PIN para este alumno. De lo contrario, se generarán automáticamente.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-[#D4D4D8] flex items-center gap-1 mb-1">
                          <Mail className="w-3 h-3 text-[#E0A82E]" />
                          <span>Correo Electrónico</span>
                        </label>
                        <input
                          type="email"
                          value={customEmail}
                          onChange={(e) => setCustomEmail(e.target.value)}
                          placeholder={`ej. ${studentName.toLowerCase().replace(/\s+/g, '') || 'alumno'}@wisdomacademy.edu`}
                          className="w-full px-3 py-2 rounded-xl bg-[#18181B] border border-[#27272A] text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#E0A82E]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-[#D4D4D8] flex items-center gap-1 mb-1">
                          <KeyRound className="w-3 h-3 text-[#E0A82E]" />
                          <span>Código PIN Personalizado</span>
                        </label>
                        <input
                          type="text"
                          value={customPin}
                          onChange={(e) => setCustomPin(e.target.value.toUpperCase())}
                          placeholder={`ej. ${studentName.slice(0, 3).toUpperCase() || 'ALU'}-2026`}
                          className="w-full px-3 py-2 rounded-xl bg-[#18181B] border border-[#27272A] text-xs text-white uppercase placeholder-[#71717A] focus:outline-none focus:border-[#E0A82E]"
                        />
                      </div>
                    </div>
                  </div>

                  <label className="block text-xs font-bold text-[#D4D4D8] uppercase tracking-wider mb-2">
                    Metodología Pedagógica Preferida:
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: 'charlotte',
                        title: 'Charlotte Mason & Montessori',
                        desc: 'Libros vivos, narración socrática, observación de la naturaleza y diarios de evidencias.',
                      },
                      {
                        id: 'stem',
                        title: 'STEM e Innovación IA',
                        desc: 'Enfoque práctico en ciencia, tecnología, ingeniería, simuladores interactivos PhET y código.',
                      },
                      {
                        id: 'standard',
                        title: 'Currículo Oficial Integrado',
                        desc: 'Alineado 100% a los estándares del Ministerio de Educación con 200 días de planificación.',
                      },
                    ].map((p) => (
                      <div
                        key={p.id}
                        onClick={() => setPedagogy(p.id)}
                        className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                          pedagogy === p.id
                            ? 'bg-[#27272A]/70 border-[#E0A82E] ring-1 ring-[#E0A82E]/50'
                            : 'bg-[#0A0A0A] border-[#27272A] hover:border-[#3F3F46]'
                        }`}
                      >
                        <div>
                          <h5 className="text-xs font-semibold text-white mb-1">{p.title}</h5>
                          <p className="text-[11px] text-[#A1A1AA] leading-snug">{p.desc}</p>
                        </div>
                        {pedagogy === p.id && (
                          <div className="mt-2 text-[#E0A82E] flex items-center gap-1 text-[10px] font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Seleccionado</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 rounded-xl bg-[#27272A] text-[#E4E4E7] hover:bg-[#3F3F46] text-xs font-semibold"
                    >
                      Atrás
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 rounded-xl bg-[#E0A82E] hover:bg-[#B77D06] disabled:opacity-50 text-[#0A0A0A] font-semibold text-sm transition-colors shadow-md flex items-center gap-2"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>{isSubmitting ? 'Guardando...' : 'Completar Inscripción'}</span>
                    </button>
                  </div>
                </div>
              )}

            </form>
          ) : (
            /* SUCCESS STATE WITH OFFICIAL CREDENTIALS */
            <div className="text-center py-6 space-y-6 animate-scale-up">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-2xl font-bold text-white">
                  ¡Inscripción Exitosa para {studentName}!
                </h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  Se ha generado el perfil pedagógico y las credenciales de acceso para ingresar a Wisdom Academy.
                </p>
              </div>

              {/* Credentials Box */}
              {createdCredentials && (
                <div className="p-5 rounded-xl bg-[#0A0A0A] border border-[#27272A] text-left max-w-md mx-auto space-y-3 shadow-inner">
                  <div className="flex items-center justify-between border-b border-[#27272A] pb-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                      <KeyRound className="w-4 h-4" />
                      <span>Credenciales Oficiales de Estudiante</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyPin}
                      className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#E0A82E] hover:text-white bg-[#27272A] px-2 py-1 rounded-lg border border-[#3F3F46]"
                    >
                      {copiedPin ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedPin ? '¡Copiado!' : 'Copiar PIN'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-2 text-xs font-mono">
                    <div className="p-2.5 rounded-xl bg-[#18181B] border border-[#27272A] flex items-center justify-between">
                      <span className="text-[#A1A1AA]">Correo Electrónico:</span>
                      <span className="text-white font-semibold">{createdCredentials.email}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#18181B] border border-[#27272A] flex items-center justify-between">
                      <span className="text-[#A1A1AA]">Código PIN de Acceso:</span>
                      <span className="text-[#E0A82E] font-semibold">{createdCredentials.pinCode}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#18181B] border border-[#27272A] flex items-center justify-between">
                      <span className="text-[#A1A1AA]">Contraseña Predeterminada:</span>
                      <span className="text-[#D4D4D8] font-semibold">{createdCredentials.password || 'Misma que PIN'}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    setActiveTab('space');
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#E0A82E] hover:bg-[#B77D06] text-[#0A0A0A] font-semibold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>Ingresar al Espacio de {studentName}</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
