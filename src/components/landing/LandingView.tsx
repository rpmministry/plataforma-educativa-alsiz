import React, { useState, useEffect, useRef } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { SchoolLogo } from '../common/SchoolLogo';
import { StudentAvatar } from '../common/StudentAvatar';
import { Footer } from '../layout/Footer';
import { NewStudentModal } from './NewStudentModal';
import { AccessRestrictedModal } from '../auth/AccessRestrictedModal';
import { CurriculumLevelsSection } from './CurriculumLevelsSection';
import { AITeacherTryoutWidget } from './AITeacherTryoutWidget';
import { authApi } from '../../services/apiClient';
import {
  Sparkles,
  Bot,
  BrainCircuit,
  FileCheck2,
  CalendarCheck,
  Award,
  Compass,
  CheckCircle,
  Lightbulb,
  Camera,
  UserPlus,
  GraduationCap,
  Globe,
  Layers,
  Cpu,
  ShieldCheck,
  BookOpen,
  Users,
  Star,
  ArrowRight,
  Lock,
  AlertCircle,
  Play,
} from 'lucide-react';

export const LandingView: React.FC = () => {
  const {
    studentsList,
    authenticatedStudentId,
    isAuthenticated,
    authenticateStudent,
    refreshSession,
    openAuthModal,
    setActiveTab,
    loginAsTestStudent,
  } = useSchool();

  // Check if authenticated student is a demo/test student (no persistent session allowed)
  const isDemoStudent = authenticatedStudentId 
    ? studentsList.some((s) => s.id === authenticatedStudentId && s.isDemo)
    : false;

  const [admissionModalOpen, setAdmissionModalOpen] = useState(false);
  const [restrictedEmail, setRestrictedEmail] = useState<string | null>(null);

  const googleButtonRef = useRef<HTMLDivElement>(null);
  const [googleReady, setGoogleReady] = useState(false);

  const handleGoogleResponse = async (response: any) => {
    const idToken = response?.credential;
    if (!idToken) {
      console.error('No se recibió token de Google');
      return;
    }

    try {
      const res = await authApi.googleLogin(idToken);
      if (res.success && res.data?.user) {
        await refreshSession();
        return;
      }

      if (res.error?.code === 'USER_NOT_FOUND' || res.error?.code === 'UNAUTHORIZED' || res.error?.code === 'AUTH_UNAUTHORIZED') {
        console.warn(`[AuthGuard] Cuenta no inscrita en la base de datos institucional`);
        try { window.google?.accounts?.id?.disableAutoSelect?.(); } catch { /* no-op */ }
        setRestrictedEmail(res.error?.details?.email || 'cuenta no inscrita');
      }
    } catch (e) {
      console.error('Error al verificar Google Sign-In con servidor:', e);
    }
  };

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    if (!clientId) {
      console.warn('[GoogleSignIn] VITE_GOOGLE_CLIENT_ID no está definido');
      setGoogleReady(false);
      return;
    }

    const loadAndRender = () => {
      if (!window.google?.accounts) return;
      if (!googleButtonRef.current) return;

      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleGoogleResponse,
          auto_select: false,
          prompt: 'select_account'
        });
        window.google.accounts.id.renderButton(
          googleButtonRef.current,
          { 
            theme: 'outline', 
            size: 'large', 
            width: '100%', 
            text: 'continue_with'
          }
        );
        console.log('[GoogleSignIn] Botón de Google renderizado correctamente en banner');
        setGoogleReady(true);
      } catch (err) {
        console.error('[GoogleSignIn] Error al renderizar botón:', err);
        setGoogleReady(false);
      }
    };

    if (window.google?.accounts) {
      loadAndRender();
    } else {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = loadAndRender;
      script.onerror = () => {
        console.error('[GoogleSignIn] Error cargando gsi/client');
        setGoogleReady(false);
      };
      document.head.appendChild(script);
    }
  }, [studentsList]);

  const ActiveSessionBanner = () => (
    <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/60 border border-emerald-500/30 flex flex-col items-start justify-start gap-6 shadow-xl min-h-[360px]">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex-shrink-0 mt-1">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <span>Sesión Autenticada Activa</span>
          </div>
          <h3 className="text-xl font-extrabold text-white leading-tight">
            ¡Bienvenido/a de nuevo!
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed max-w-xs">
            Has ingresado a tu perfil privado. Accede directamente a tus materias, microcurrículo diario, profesores virtuales y aula virtual completa.
          </p>
        </div>
      </div>

      <div className="space-y-3 w-full pt-4 border-t border-emerald-500/20">
        <button
          onClick={() => setActiveTab('space')}
          className="w-full px-5 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-950/40 transition-all flex items-center justify-center gap-2 transform hover:scale-[1.02]"
        >
          <span>Ir a mi Espacio Educativo</span>
          <ArrowRight className="w-4.5 h-4.5" />
        </button>
        <button
          onClick={() => openAuthModal()}
          className="w-full px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-bold transition-colors"
        >
          Cambiar Cuenta
        </button>
      </div>
    </div>
  );

  const InactiveSessionBanner = () => (
    <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-orange-950/60 border border-amber-500/30 flex flex-col items-start justify-start gap-6 shadow-xl min-h-[360px]">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex-shrink-0 mt-1">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <span>Sesión Inactiva</span>
          </div>
          <h3 className="text-xl font-extrabold text-white leading-tight">
            Accede a tu Espacio Educativo
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed max-w-xs">
            Ingresa con tu cuenta de Google para acceder a tu perfil, materias, microcurrículo y aula virtual completa.
          </p>
        </div>
      </div>

      <div className="space-y-3 w-full pt-4 border-t border-amber-500/20">
        <div ref={googleButtonRef} className="w-full" id="landing-google-signin-button" />
        {!googleReady && (
          <p className="text-center text-xs text-slate-400">
            Ingreso con Google sujeto a validación institucional en servidor. Usa tus credenciales o PIN.
          </p>
        )}
        <button
          onClick={() => openAuthModal()}
          className="w-full px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-bold transition-colors"
        >
          Ingresar con Correo / PIN
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-10 pt-0 pb-8">
      <section className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/20 px-6 py-6 sm:px-10 sm:py-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#121820] border border-amber-500/40 shadow-lg shadow-black/40 flex items-center justify-center">
              <SchoolLogo size="md" variant="monogram" className="w-10 h-10 object-contain" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>Plataforma Educativa ALSIZ • Ekballo Church</span>
              </div>
              <h2 className="text-xs text-slate-400 font-mono mt-0.5">Año Lectivo 2026 - 2027</h2>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="max-w-5xl space-y-4 lg:max-w-2xl">
              <div className="inline-flex items-center gap-3 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 shadow-[0_0_25px_rgba(229,144,0,0.12)] backdrop-blur-sm">
                <SchoolLogo size="sm" variant="monogram" className="w-6 h-6 object-contain" />
                <span className="text-sm sm:text-base font-black uppercase tracking-[0.28em] text-amber-200">ALSIZ • EKBALLO</span>
              </div>

              <div className="space-y-2">
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.32em] text-amber-300/80">Homeschooling K-12 • Formación Cristiana & Discipulado</p>
                <h1 className="max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.06em] text-white leading-[0.9]">
                  Educación personalizada, <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500">rigor pedagógico y fe</span>
                </h1>
              </div>

              <p className="max-w-3xl text-base sm:text-xl text-slate-300 leading-relaxed font-normal">
                Diseñada para la formación integral de los estudiantes de Ekballo Church y familias en homeschooling. Acompaña desde la educación elemental hasta el bachillerato con microcurrículo estructurado día a día, profesores virtuales socráticos, devocionales diarios y evaluación formativa por evidencias sin exámenes memorísticos.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('access')}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 px-6 py-3.5 text-sm font-extrabold text-slate-950 shadow-xl shadow-amber-950/50 transition-all hover:scale-[1.02]"
                >
                  <ShieldCheck className="w-4.5 h-4.5" />
                  <span>Ingresar a la Plataforma (Portal Roles)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAdmissionModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#121820] hover:bg-[#1a222c] border border-[#283545] px-5 py-3.5 text-sm font-bold text-white transition-all hover:scale-[1.02]"
                >
                  <UserPlus className="w-4 h-4 text-amber-400" />
                  <span>Registrar Estudiante</span>
                </button>
              </div>
            </div>

            <div className="lg:w-[400px] lg:flex-shrink-0 w-full">
              {isAuthenticated && !isDemoStudent ? <ActiveSessionBanner /> : <InactiveSessionBanner />}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 pt-1">
            {[
              { label: 'Currículo Adaptativo', value: '3 a 18 años', icon: GraduationCap, color: 'text-indigo-400' },
              { label: 'Microcurrículo Diario', value: '200 Días Lectivos', icon: CalendarCheck, color: 'text-amber-400' },
              { label: 'Tutoría Pedagógica', value: 'IA Socrática 24/7', icon: Bot, color: 'text-emerald-400' },
              { label: 'Evaluación Formativa', value: 'Portafolio & Tareas', icon: FileCheck2, color: 'text-purple-400' },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="rounded-2xl border border-slate-700/80 bg-slate-900/80 p-3.5 shadow-[0_10px_30px_rgba(15,23,42,0.22)]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-800/90 border border-slate-700">
                      <Icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-300">{stat.label}</span>
                  </div>
                  <p className="text-base font-extrabold text-white leading-tight">{stat.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MODO DEMO — protagonista, above the fold */}
      <section className="relative overflow-hidden rounded-[1.75rem] border border-purple-500/30 bg-gradient-to-br from-purple-950/60 via-slate-900 to-indigo-950/50 px-6 py-8 sm:px-10 sm:py-10 shadow-2xl">
        <div className="absolute -top-16 -right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-7">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/40 text-purple-200 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Sin registro · Acceso inmediato</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Explora el Modo Demo
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Prueba la experiencia interactiva de Wisdom School con dos perfiles de muestra. Interactúa con el
              profesor IA, escucha la voz guía y recorre una clase completa antes de registrarte.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {([
              {
                id: 'karen' as const,
                world: '🐶 Mundo Snoopy',
                blurb: 'Álgebra, literatura y pensamiento crítico de 8.º EGB.',
                cardClass: 'from-amber-950/50 via-slate-900 to-amber-900/20 border-amber-500/40 hover:border-amber-400/70',
                badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
                buttonClass: 'bg-amber-500 hover:bg-amber-400 text-slate-950',
              },
              {
                id: 'mauricio' as const,
                world: '🍄 Mundo Mario',
                blurb: 'Cuentos, matemáticas lúdicas y ciencia para 4.º EGB.',
                cardClass: 'from-red-950/50 via-slate-900 to-red-900/20 border-red-500/40 hover:border-red-400/70',
                badgeClass: 'bg-red-500/20 text-red-300 border-red-500/40',
                buttonClass: 'bg-red-600 hover:bg-red-500 text-white',
              },
            ]).map((profile) => {
              const student = studentsList.find((s) => s.id === profile.id);
              if (!student) return null;
              return (
                <div
                  key={profile.id}
                  className={`group relative flex flex-col gap-4 p-6 rounded-3xl border bg-gradient-to-br shadow-xl transition-all hover:-translate-y-1 ${profile.cardClass}`}
                >
                  <div className="flex items-center gap-4">
                    <StudentAvatar studentId={student.id} name={student.name} size="xl" />
                    <div className="min-w-0">
                      <span className={`inline-block text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${profile.badgeClass}`}>
                        {profile.world}
                      </span>
                      <h3 className="text-xl font-black text-white mt-1.5">{student.name}</h3>
                      <p className="text-xs font-bold text-slate-400">
                        {student.age} años · {student.grade}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">{profile.blurb}</p>

                  <div className="flex flex-wrap gap-2 text-[11px] font-bold text-slate-300">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/60 border border-slate-700/70">
                      <Bot className="w-3.5 h-3.5 text-emerald-400" /> Profesor IA
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/60 border border-slate-700/70">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> 1 clase por materia
                    </span>
                  </div>

                  <button
                    onClick={() => loginAsTestStudent(profile.id)}
                    className={`mt-auto w-full py-3.5 rounded-2xl font-black text-sm shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${profile.buttonClass}`}
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Entrar al Modo Demo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          <p className="text-center text-[11px] text-slate-500">
            El progreso del Modo Demo es temporal: explora libremente y regístrate cuando quieras continuar.
          </p>
        </div>
      </section>

      <CurriculumLevelsSection />

      <section className="space-y-4">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Motor de Resiliencia IA de Doble Capa</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Interacción Socrática en Tiempo Real
          </h2>
          <p className="text-sm text-slate-300">
            Los profesores virtuales de la Plataforma Educativa ALSIZ utilizan el Método Socrático para formular preguntas guiadas y pistas progresivas en lugar de regalar respuestas mecánicas.
          </p>
        </div>

        <AITeacherTryoutWidget />
      </section>

      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Pilares de la Plataforma Educativa ALSIZ • Ekballo Church</h2>
          <p className="text-sm text-slate-400">
            Un ecosistema integral diseñado para cultivar el pensamiento autónomo, la cosmovisión bíblica, la disciplina de estudio y el amor por el aprendizaje.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 transition-colors space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20 shadow-inner">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">Profesores IA Socráticos</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Cada asignatura cuenta con un tutor virtual adaptado a la edad del alumno. Guía paso a paso con preguntas razonadas, explicaciones fonéticas para inglés y ejemplos contextualizados.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-colors space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20 shadow-inner">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">Microcurrículo Estructurado</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Planificación anual dividida día a día en 3 trimestres con lecturas vivas, recursos PhET interactivas, videos instructivos y guías de trabajo listas para imprimir o resolver digitalmente.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-colors space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 shadow-inner">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">Análisis Formativo por Evidencias</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Los estudiantes suben fotos o archivos de sus cuadernos y tareas. La IA evalúa la precisión, felicita los aciertos y señala errores conceptuales de forma constructiva.
            </p>
          </div>
        </div>
      </section>

      {admissionModalOpen && (
        <NewStudentModal
          isOpen={admissionModalOpen}
          onClose={() => setAdmissionModalOpen(false)}
        />
      )}

      {/* Cápsula de Información (Auth Guard) para cuentas de Google no inscritas. */}
      <AccessRestrictedModal
        isOpen={!!restrictedEmail}
        onClose={() => setRestrictedEmail(null)}
        email={restrictedEmail || undefined}
      />

      <Footer />
    </div>
  );
};