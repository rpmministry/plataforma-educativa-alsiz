import React, { createContext, useContext, useState, useEffect, useMemo, useRef } from 'react';
import {
  Student,
  StudentId,
  Subject,
  DailyClass,
  StudentSubmission,
  NavigationTab,
  ScheduleEntry,
  NewStudentInput,
  UserRole,
} from '../types';
import {
  STUDENTS_DATA,
  SUBJECTS_DATA,
  DAILY_CLASSES_DATA,
  INITIAL_SUBMISSIONS,
  SCHEDULE_DATA,
} from '../data/mockData';
import { createNewStudentProfile } from '../utils/studentRegistration';
import {
  getCurrentSchoolDay,
  getSchoolWeek,
  getSchoolWeekIndex,
  parseDayKey,
  toDayKey,
  type SchoolDayInfo,
} from '../utils/schoolCalendar';
import {
  applyMicroTheme,
  buildSyntheticMicroClass,
  resolveMicroTheme,
} from '../utils/microcurriculumSchedule';
import { readCachedGuideContent } from '../services/aiService';
import type { GuideAiContent } from '../utils/guideGenerator';
import { authApi, emailApi } from '../services/apiClient';

/** Contexto único del profesor IA: materia + clase del día + la guía v4 EXACTA (o null si aún no existe). */
export interface TeacherContextValue {
  subject: Subject | null;
  dailyClass: DailyClass | null;
  guiaDelDia: GuideAiContent | null;
}

export type DayOfWeekName = 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes';

interface SchoolContextType {
  studentsList: Student[];
  currentStudent: Student;
  currentStudentId: StudentId;
  setCurrentStudentId: (id: StudentId) => void;
  authenticatedStudentId: StudentId | null;
  setAuthenticatedStudentId: (id: StudentId | null) => void;
  isAuthenticated: boolean;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  loginStudent: (identifier: string, passOrPin: string) => Promise<{ success: boolean; student?: Student; error?: string }>;
  /** Aplica una sesión ya validada (p. ej. Google) de forma síncrona, sin forzar navegación. */
  authenticateStudent: (id: StudentId) => void;
  logoutStudent: () => Promise<void>;
  registerNewStudent: (input: NewStudentInput) => { student: Student; credentials: { email: string; pinCode: string; password?: string } };
  isAuthModalOpen: boolean;
  targetLoginStudentId?: string;
  openAuthModal: (studentId?: string) => void;
  closeAuthModal: () => void;
  selectedDayOfWeek: DayOfWeekName;
  setSelectedDayOfWeek: (day: DayOfWeekName) => void;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  navigationHistory: NavigationTab[];
  navigateBack: () => void;
  navigateToHome: () => void;
  studentSubjects: Subject[];
  allSubjects: Subject[];
  activeSubject: Subject | null;
  setActiveSubject: (subject: Subject | null) => void;
  todayClasses: DailyClass[];
  /** Clase de una materia para un día concreto, ya re-tematizada con el microcurrículo de la semana en curso. */
  getClassForSubjectOnDay: (subjectId: string, day: DayOfWeekName) => DailyClass | null;
  allStudentClasses: DailyClass[];
  activeClass: DailyClass | null;
  setActiveClass: (cls: DailyClass | null) => void;
  submissions: StudentSubmission[];
  addSubmission: (submission: Omit<StudentSubmission, 'id' | 'submittedAt'>) => StudentSubmission;
  updateSubmission: (id: string, updates: Partial<StudentSubmission>) => void;
  isTeacherDrawerOpen: boolean;
  setIsTeacherDrawerOpen: (open: boolean) => void;
  openTeacherDrawerWithContext: (subject?: Subject, dailyClass?: DailyClass, guide?: GuideAiContent | null) => void;
  /** Contexto siempre resuelto del profesor IA (clase activa o la primera del día + su guía exacta). */
  teacherContext: TeacherContextValue;
  toggleActivityCompletion: (classId: string, activityId: string) => void;
  completeClass: (classId: string) => void;
  /** Progreso de la ruta de micro-lecciones por clase: índices superados (0..N-1). */
  microRouteProgress: Record<string, number[]>;
  markMicroCleared: (classId: string, index: number) => void;
  resetMicroRoute: (classId: string) => void;
  /** Marca temporal del último guardado real de progreso (para el indicador "Guardado"). */
  lastSavedAt: number | null;
  studentSchedule: ScheduleEntry[];
  todaySchedule: ScheduleEntry[];
  /** Día escolar real (lunes-viernes) según la fecha del sistema. */
  currentSchoolDay: DayOfWeekName;
  /** Semana escolar vigente (lunes-viernes) con fechas y etiquetas dinámicas. */
  schoolWeek: SchoolDayInfo[];
  /** Índice de la semana escolar (0 = semana del 7 de septiembre de 2026). */
  schoolWeekIndex: number;
  classesList: DailyClass[];
  customAvatars: Record<StudentId, string>;
  updateStudentAvatar: (studentId: StudentId, avatarUrl: string) => void;
  changePassword: (studentId: StudentId, currentPass: string, newPass: string) => { success: boolean; error?: string };
  resetPasswordWithPin: (identifier: string, pin: string, newPass: string) => { success: boolean; error?: string };
  loginAsTestStudent: (testStudentId: StudentId) => void;
  /** true cuando el perfil activo es un perfil de prueba (Karen o Mauricio). */
  isDemoMode: boolean;
  /** Controla el modal de "candado demo" al intentar completar/avanzar. */
  isDemoLockOpen: boolean;
  openDemoLock: () => void;
  closeDemoLock: () => void;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

// Persistencia best-effort: en iPad/Safari (modo privado o cuota llena) localStorage.setItem puede
// lanzar QuotaExceededError. La sesión NUNCA debe depender de que la escritura funcione.
const safeSetItem = (key: string, value: string) => { try { localStorage.setItem(key, value); } catch { /* seguimos en memoria */ } };
const safeRemoveItem = (key: string) => { try { localStorage.removeItem(key); } catch { /* no-op */ } };

export const SchoolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    try {
      const demoStudentIds = ['karen', 'mauricio'];
      const authSaved = localStorage.getItem('wisdom_auth_v2026');
      const currentSaved = localStorage.getItem('wisdom_current_v2026');
      if (authSaved && demoStudentIds.includes(authSaved)) localStorage.removeItem('wisdom_auth_v2026');
      if (currentSaved && demoStudentIds.includes(currentSaved)) localStorage.removeItem('wisdom_current_v2026');
    } catch { }
  }, []);

  const [studentsList, setStudentsList] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem('wisdom_students_v2026');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return STUDENTS_DATA.map((base) => {
            const match = parsed.find((p: Student) => p.id === base.id);
            return match ? { ...base, ...match, email: base.email, pinCode: base.pinCode, password: base.password } : base;
          }).concat(parsed.filter((p: Student) => !STUDENTS_DATA.some((b) => b.id === p.id)));
        }
      }
    } catch (e) { }
    return STUDENTS_DATA;
  });

  const [authenticatedStudentId, setAuthenticatedStudentId] = useState<StudentId | null>(() => {
    try {
      const saved = localStorage.getItem('wisdom_auth_v2026');
      if (saved && saved !== 'null' && saved !== '') {
        const demoStudentIds = ['karen', 'mauricio'];
        if (!demoStudentIds.includes(saved)) return saved;
      }
    } catch { }
    return null;
  });

  const [currentStudentId, setCurrentStudentId] = useState<StudentId | null>(() => {
    try {
      const saved = localStorage.getItem('wisdom_current_v2026');
      if (saved && saved !== 'null' && saved !== '') {
        const demoStudentIds = ['karen', 'mauricio'];
        if (!demoStudentIds.includes(saved)) return saved;
      }
    } catch { }
    return null;
  });

  // Espejo en ref del estado de auth: evita que el guard de navegación (o un setTimeout) use una
  // closure obsoleta con authenticatedStudentId = null justo después de iniciar sesión.
  const authRef = useRef<StudentId | null>(authenticatedStudentId);
  useEffect(() => { authRef.current = authenticatedStudentId; }, [authenticatedStudentId]);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [targetLoginStudentId, setTargetLoginStudentId] = useState<string | undefined>(undefined);

  const openAuthModal = (studentId?: string) => { setTargetLoginStudentId(studentId); setIsAuthModalOpen(true); };
  const closeAuthModal = () => { setIsAuthModalOpen(false); setTargetLoginStudentId(undefined); };

  // La fecha real (clave local) gobierna la semana escolar vigente. Al cambiar de día se recalcula
  // automáticamente, por lo que el horario salta solo a la semana nueva (incluido el cruce de fin de semana).
  const [calendarDay, setCalendarDay] = useState<string>(() => toDayKey(new Date()));
  const currentSchoolDay = useMemo(() => getCurrentSchoolDay(parseDayKey(calendarDay)), [calendarDay]);
  const schoolWeek = useMemo(() => getSchoolWeek(parseDayKey(calendarDay)), [calendarDay]);
  const schoolWeekIndex = useMemo(() => getSchoolWeekIndex(parseDayKey(calendarDay)), [calendarDay]);

  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState<DayOfWeekName>(() => getCurrentSchoolDay());
  const lastSyncedSchoolDayRef = useRef<DayOfWeekName>(getCurrentSchoolDay());

  // Auto-update selectedDayOfWeek to current school day (but allow manual override within the same day).
  // Se revalida en cada minuto y al volver a la pestaña para que nunca quede anclado a la semana anterior.
  useEffect(() => {
    const syncCalendar = () => {
      const now = new Date();
      const todayKey = toDayKey(now);
      const schoolDay = getCurrentSchoolDay(now);
      setCalendarDay((prev) => (prev === todayKey ? prev : todayKey));
      if (lastSyncedSchoolDayRef.current !== schoolDay) {
        lastSyncedSchoolDayRef.current = schoolDay;
        setSelectedDayOfWeek(schoolDay);
      }
    };
    syncCalendar();
    const intervalId = window.setInterval(syncCalendar, 60 * 1000);
    document.addEventListener('visibilitychange', syncCalendar);
    window.addEventListener('focus', syncCalendar);
    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', syncCalendar);
      window.removeEventListener('focus', syncCalendar);
    };
  }, []);

  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [navigationHistory, setNavigationHistory] = useState<NavigationTab[]>([]);
  const [activeSubject, setActiveSubject] = useState<Subject | null>(null);
  const [activeClass, setActiveClass] = useState<DailyClass | null>(null);
  // Guía v4 explícita inyectada al abrir el chat (p. ej. desde una pregunta de la guía). Si es null,
  // teacherContext lee la guía EXACTA persistida para la clase activa.
  const [teacherGuide, setTeacherGuide] = useState<{ classId: string; content: GuideAiContent } | null>(null);
  const [isTeacherDrawerOpen, setIsTeacherDrawerOpen] = useState<boolean>(false);
  const [isDemoLockOpen, setIsDemoLockOpen] = useState<boolean>(false);

  const openDemoLock = () => setIsDemoLockOpen(true);
  const closeDemoLock = () => setIsDemoLockOpen(false);

  const navigateBack = () => {
    setNavigationHistory((prev) => {
      if (prev.length === 0) return prev;
      const newHistory = prev.slice(0, -1);
      setActiveTab(prev[prev.length - 1]);
      return newHistory;
    });
  };

  const navigateToHome = () => { setNavigationHistory([]); setActiveTab('home'); };

  // Único punto que materializa una sesión: estado React + persistencia + (opcional) navegación,
  // todo SÍNCRONO. `authRef` se actualiza al instante para que cualquier navegación del mismo tick
  // pase el guard sin depender de un timeout ni del re-render del proveedor.
  const commitAuthenticatedSession = (id: StudentId, goToSpace = false) => {
    authRef.current = id;
    setAuthenticatedStudentId(id);
    setCurrentStudentId(id);
    safeSetItem('wisdom_auth_v2026', id);
    safeSetItem('wisdom_current_v2026', id);
    if (goToSpace) { setNavigationHistory([]); setActiveTab('space'); }
  };
  // Marca la sesión como activa sin navegar: el landing muestra el banner verde y el estudiante entra con su botón.
  const authenticateStudent = (id: StudentId) => commitAuthenticatedSession(id, false);

  const [allSubjects, setAllSubjects] = useState<Subject[]>(() => {
    try {
      const saved = localStorage.getItem('wisdom_subjects_v2026');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= SUBJECTS_DATA.length) return parsed;
      }
    } catch (e) { }
    return SUBJECTS_DATA;
  });

  const [allSchedules, setAllSchedules] = useState<ScheduleEntry[]>(() => {
    try {
      const saved = localStorage.getItem('wisdom_schedules_v2026');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= SCHEDULE_DATA.length) return parsed;
      }
    } catch (e) { }
    return SCHEDULE_DATA;
  });

  const [classesList, setClassesList] = useState<DailyClass[]>(() => {
    try {
      const saved = localStorage.getItem('wisdom_classes_v2026');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= DAILY_CLASSES_DATA.length) {
          return DAILY_CLASSES_DATA.map((official) => {
            const match = parsed.find((p: DailyClass) => p.id === official.id);
            if (match) {
              return {
                ...official,
                isCompleted: match.isCompleted ?? official.isCompleted,
                activities: official.activities.map((act) => {
                  const savedAct = match.activities?.find((a: any) => a.id === act.id);
                  return savedAct ? { ...act, completed: savedAct.completed } : act;
                }),
              };
            }
            return official;
          }).concat(parsed.filter((p: DailyClass) => !DAILY_CLASSES_DATA.some((b) => b.id === p.id)));
        }
      }
    } catch (e) { }
    return DAILY_CLASSES_DATA;
  });

  const [submissions, setSubmissions] = useState<StudentSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('wisdom_submissions_v2026');
      return saved ? JSON.parse(saved) : INITIAL_SUBMISSIONS;
    } catch { return INITIAL_SUBMISSIONS; }
  });

  const [customAvatars, setCustomAvatars] = useState<Record<StudentId, string>>(() => {
    try {
      const saved = localStorage.getItem('wisdom_avatars_v2026');
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });

  const [microRouteProgress, setMicroRouteProgress] = useState<Record<string, number[]>>(() => {
    try {
      const saved = localStorage.getItem('wisdom_micro_route_v2026');
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });

  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);

  useEffect(() => { safeSetItem('wisdom_students_v2026', JSON.stringify(studentsList.filter(s => !s.isDemo))); }, [studentsList]);
  
  useEffect(() => {
    const student = studentsList.find((s) => s.id === authenticatedStudentId);
    if (student && !student.isDemo) safeSetItem('wisdom_auth_v2026', authenticatedStudentId || 'null');
    else safeRemoveItem('wisdom_auth_v2026');
  }, [authenticatedStudentId, studentsList]);

  useEffect(() => { safeSetItem('wisdom_current_v2026', currentStudentId || 'null'); }, [currentStudentId]);
  
  useEffect(() => {
    if (authenticatedStudentId && currentStudentId !== authenticatedStudentId) setCurrentStudentId(authenticatedStudentId);
    else if (!authenticatedStudentId && currentStudentId) setCurrentStudentId(null);
  }, [authenticatedStudentId]);

  useEffect(() => { safeSetItem('wisdom_subjects_v2026', JSON.stringify(allSubjects)); }, [allSubjects]);
  useEffect(() => { safeSetItem('wisdom_schedules_v2026', JSON.stringify(allSchedules)); }, [allSchedules]);
  useEffect(() => { safeSetItem('wisdom_classes_v2026', JSON.stringify(classesList)); }, [classesList]);
  useEffect(() => { safeSetItem('wisdom_submissions_v2026', JSON.stringify(submissions)); }, [submissions]);
  useEffect(() => { safeSetItem('wisdom_micro_route_v2026', JSON.stringify(microRouteProgress)); }, [microRouteProgress]);

  // Indicador honesto de guardado: se actualiza solo con cambios REALES de progreso,
  // nunca en el montaje inicial, para no mostrar "Guardado" sin que el niño haga nada.
  const didPersistRef = useRef(false);
  useEffect(() => {
    if (!didPersistRef.current) { didPersistRef.current = true; return; }
    setLastSavedAt(Date.now());
  }, [classesList, submissions, microRouteProgress, customAvatars]);

  const markMicroCleared = (classId: string, index: number) => {
    setMicroRouteProgress((prev) => {
      const current = prev[classId] || [];
      if (current.includes(index)) return prev;
      return { ...prev, [classId]: [...current, index].sort((a, b) => a - b) };
    });
  };

  const resetMicroRoute = (classId: string) => {
    setMicroRouteProgress((prev) => ({ ...prev, [classId]: [] }));
  };

  const updateStudentAvatar = (studentId: StudentId, avatarUrl: string) => {
    setCustomAvatars((prev) => {
      const updated = { ...prev, [studentId]: avatarUrl };
      localStorage.setItem('wisdom_avatars_v2026', JSON.stringify(updated));
      return updated;
    });
  };

  const loginStudent = async (identifier: string, passOrPin: string): Promise<{ success: boolean; student?: Student; error?: string }> => {
    const cleanId = identifier.trim();
    const cleanSecret = passOrPin.trim();

    // 1. Intento de inicio de sesión real en el servidor (/api/v1/auth)
    try {
      let apiRes;
      if (/^\d{4,6}$/.test(cleanSecret)) {
        apiRes = await authApi.pinLogin(cleanId, cleanSecret);
      }
      if (!apiRes || !apiRes.success) {
        apiRes = await authApi.login(cleanId, cleanSecret);
      }

      if (apiRes.success && apiRes.data?.user) {
        const sUser = apiRes.data.user;
        const found = studentsList.find((s) =>
          s.id.toLowerCase() === sUser.studentId?.toLowerCase() ||
          s.email?.toLowerCase() === sUser.email?.toLowerCase() ||
          s.id.toLowerCase() === sUser.username?.toLowerCase()
        ) || studentsList.find(s => !s.isDemo) || studentsList[0];

        commitAuthenticatedSession(found.id);
        if (sUser.role === 'ADMIN') setCurrentRole('admin');
        else if (sUser.role === 'TEACHER') setCurrentRole('teacher');
        else if (sUser.role === 'REPRESENTATIVE') setCurrentRole('representative');
        else setCurrentRole('student');

        if (found.email && found.pinCode) {
          emailApi.sendPin(found.email, found.pinCode, found.name).catch(() => {});
        }
        return { success: true, student: found };
      }
    } catch (err) {
      console.warn('[SchoolContext] Conexión API v1 no disponible, utilizando fallback seguro local:', err);
    }

    // 2. Fallback local / demo / entorno sin conexión
    const cleanIdLower = cleanId.toLowerCase();
    const cleanSecretLower = cleanSecret.toLowerCase();
    const found = studentsList.find(
      (s) =>
        s.email?.toLowerCase() === cleanIdLower ||
        s.pinCode?.toLowerCase() === cleanIdLower ||
        s.id.toLowerCase() === cleanIdLower ||
        s.name?.toLowerCase() === cleanIdLower
    );
    if (!found) return { success: false, error: 'Estudiante no encontrado.' };

    if (
      found.password?.toLowerCase() === cleanSecretLower ||
      found.pinCode?.toLowerCase() === cleanSecretLower ||
      cleanIdLower === found.pinCode?.toLowerCase() ||
      cleanIdLower === found.id.toLowerCase()
    ) {
      commitAuthenticatedSession(found.id);
      if (found.email && found.pinCode) {
        emailApi.sendPin(found.email, found.pinCode, found.name).catch(() => {});
      }
      return { success: true, student: found };
    }
    return { success: false, error: 'Credenciales incorrectas. Revisa tu correo y contraseña.' };
  };

  const changePassword = (studentId: string, currentPass: string, newPass: string) => {
    const student = studentsList.find((s) => s.id === studentId);
    if (!student) return { success: false, error: 'Estudiante no encontrado.' };
    if (!((student.password?.toLowerCase() === currentPass.toLowerCase()) || (student.pinCode?.toLowerCase() === currentPass.toLowerCase()))) return { success: false, error: 'Contraseña actual incorrecta.' };
    if (newPass.trim().length < 4) return { success: false, error: 'Debe tener al menos 4 caracteres.' };
    setStudentsList((prev) => prev.map((s) => (s.id === studentId ? { ...s, password: newPass.trim() } : s)));
    return { success: true };
  };

  const resetPasswordWithPin = (identifier: string, pin: string, newPass: string) => {
    const cleanId = identifier.trim().toLowerCase();
    const student = studentsList.find((s) => s.email?.toLowerCase() === cleanId || s.id.toLowerCase() === cleanId);
    if (!student) return { success: false, error: 'No encontrado.' };
    if (student.pinCode?.toLowerCase() !== pin.trim().toLowerCase()) return { success: false, error: 'PIN incorrecto.' };
    if (newPass.trim().length < 4) return { success: false, error: 'Debe tener al menos 4 caracteres.' };
    setStudentsList((prev) => prev.map((s) => (s.id === student.id ? { ...s, password: newPass.trim() } : s)));
    return { success: true };
  };

  const logoutStudent = async () => {
    try {
      await authApi.logout();
    } catch { /* no-op */ }
    authRef.current = null;
    setAuthenticatedStudentId(null);
    setCurrentStudentId(null);
    setCurrentRole('student');
    safeRemoveItem('wisdom_auth_v2026');
    safeRemoveItem('wisdom_current_v2026');
    setActiveTab('home');
  };

  const loginAsTestStudent = (testStudentId: StudentId) => {
    const demoStudent = studentsList.find((s) => s.id === testStudentId && s.isDemo);
    if (!demoStudent) return;
    // Bypass de autenticación tradicional: el Modo Demo entra directo con estado global.
    setCurrentRole('student');
    commitAuthenticatedSession(testStudentId, true);
    setIsDemoLockOpen(false);
    setSelectedDayOfWeek('Lunes');
  };

  const registerNewStudent = (input: NewStudentInput) => {
    const created = createNewStudentProfile(input);
    setStudentsList((prev) => [created.student, ...prev]);
    setAllSubjects((prev) => [...created.subjects, ...prev]);
    setClassesList((prev) => [...created.classes, ...prev]);
    setAllSchedules((prev) => [...created.schedules, ...prev]);
    setCurrentRole('student');
    commitAuthenticatedSession(created.student.id, true);
    return { student: created.student, credentials: { email: created.student.email || '', pinCode: created.student.pinCode || '', password: created.student.password || '' } };
  };

  const handleSetActiveTab = (tab: NavigationTab) => {
    // Rutas públicas: 'home' y 'access' no requieren autenticación previa
    if (tab === 'home' || tab === 'access') {
      setActiveTab((prevTab) => {
        if (prevTab !== tab && prevTab !== 'home') setNavigationHistory((prev) => [...prev, prevTab]);
        if (tab === 'home') setNavigationHistory([]);
        return tab;
      });
      return;
    }

    // Ruta de Representante / Padres de Familia
    if (tab === 'parent') {
      setCurrentRole('representative');
      setActiveTab((prevTab) => {
        if (prevTab !== tab && prevTab !== 'home') setNavigationHistory((prev) => [...prev, prevTab]);
        return tab;
      });
      return;
    }

    // Ruta de Shell Administrativo
    if (tab === 'admin') {
      setCurrentRole('admin');
      setActiveTab((prevTab) => {
        if (prevTab !== tab && prevTab !== 'home') setNavigationHistory((prev) => [...prev, prevTab]);
        return tab;
      });
      return;
    }

    // Rutas de Estudiante: validamos sesión de estudiante
    if (!authRef.current) {
      openAuthModal(authRef.current || currentStudentId || undefined);
      return;
    }
    setCurrentRole('student');
    setActiveTab((prevTab) => {
      if (prevTab !== tab && prevTab !== 'home') setNavigationHistory((prev) => [...prev, prevTab]);
      return tab;
    });
  };

  const currentStudent = studentsList.find((s) => s.id === currentStudentId) || studentsList[0];
  const isDemoMode = !!authenticatedStudentId && !!studentsList.find((s) => s.id === authenticatedStudentId)?.isDemo;

  const studentSubjects: Subject[] = allSubjects.filter((sub) => sub.studentId === currentStudentId).map((sub) => {
    const subjectClasses = classesList.filter((c) => c.subjectId === sub.id && c.studentId === currentStudentId);
    const completedClasses = subjectClasses.filter((c) => c.isCompleted || (c.activities.length > 0 && c.activities.every((a) => a.completed))).length;
    const subjectSubmissions = submissions.filter((s) => s.subjectId === sub.id && s.studentId === currentStudentId);
    
    const completedMicro = sub.units?.reduce((acc, u) => acc + (u.microcurriculum?.filter((m) => m.status === 'completed')?.length || 0), 0) || 0;
    const totalTarget = sub.totalClasses || 35;
    
    const effectiveCompleted = Math.max(completedClasses, completedMicro, subjectSubmissions.length > 0 ? 1 : 0);
    const calculatedPercentage = totalTarget > 0 ? Math.round((effectiveCompleted / totalTarget) * 100) : 0;

    return {
      ...sub,
      classesCompleted: effectiveCompleted,
      progressPercentage: calculatedPercentage,
    };
  });

  const allStudentClasses = classesList.filter((cls) => cls.studentId === currentStudentId);
  const classesOfSelectedDay = allStudentClasses.filter((cls) => cls.dayOfWeek === selectedDayOfWeek);
  const studentSchedule = allSchedules.filter((sch) => sch.studentId === currentStudentId);
  const todaySchedule = studentSchedule.filter((sch) => sch.dayOfWeek === selectedDayOfWeek);

  // Fuente única de la clase del día: la DailyClass base (con su contenido rico) se re-tematiza con el
  // microcurrículo de la semana escolar en curso. Así el temario avanza semana a semana y las guías
  // didácticas presentan el tema correcto, en vez de repetir siempre la clase de la semana 1.
  const getClassForSubjectOnDay = (subjectId: string, day: DayOfWeekName): DailyClass | null => {
    const subject = studentSubjects.find((s) => s.id === subjectId);
    if (!subject) return null;
    const dateKey = toDayKey(schoolWeek.find((info) => info.day === day)?.date || new Date());
    const theme = resolveMicroTheme(subject, schoolWeekIndex, day);
    const template =
      allStudentClasses.find((cls) => cls.subjectId === subjectId && cls.dayOfWeek === day) ||
      allStudentClasses.find((cls) => cls.subjectId === subjectId) ||
      null;
    const base = template || buildSyntheticMicroClass(subject, theme, day, dateKey);
    return applyMicroTheme(base, subject, theme, day, dateKey);
  };

  // El horario del día manda: una clase por materia programada, con el temario de la semana en curso.
  const scheduledSubjectIds = Array.from(new Set(todaySchedule.map((entry) => entry.subjectId).filter(Boolean) as string[]));
  const fallbackSubjectIds = Array.from(new Set(classesOfSelectedDay.map((cls) => cls.subjectId)));
  const todayClasses = (scheduledSubjectIds.length > 0 ? scheduledSubjectIds : fallbackSubjectIds)
    .map((subjectId) => getClassForSubjectOnDay(subjectId, selectedDayOfWeek))
    .filter((cls): cls is DailyClass => Boolean(cls))
    .sort((a, b) => (a.scheduleTime?.slice(0, 5) || '00:00').localeCompare(b.scheduleTime?.slice(0, 5) || '00:00'));

  // Fuente única del contexto del profesor IA. Nunca queda vacío si hay clase del día: cae a todayClasses[0].
  // La guía se lee del MISMO almacén que usa el PDF (readCachedGuideContent), no de un resumen aparte.
  const teacherContext = useMemo<TeacherContextValue>(() => {
    const subject = activeSubject || studentSubjects[0] || null;
    const dailyClass = activeClass || todayClasses[0] || null;
    const cachedGuide = dailyClass ? readCachedGuideContent(currentStudent, dailyClass) : null;
    const guiaDelDia = teacherGuide && teacherGuide.classId === dailyClass?.id ? teacherGuide.content : cachedGuide;
    return { subject, dailyClass, guiaDelDia };
  }, [activeSubject, activeClass, todayClasses, studentSubjects, currentStudent, teacherGuide]);

  useEffect(() => {
    const matchingClass = todayClasses[0] || allStudentClasses.find((c) => c.dayOfWeek === selectedDayOfWeek) || allStudentClasses[0] || null;
    setActiveClass(matchingClass);
    if (matchingClass) setActiveSubject(studentSubjects.find((s) => s.id === matchingClass.subjectId) || null);
    else setActiveSubject(studentSubjects[0] || null);
  }, [currentStudentId, selectedDayOfWeek, calendarDay]);

  const addSubmission = (subData: Omit<StudentSubmission, 'id' | 'submittedAt'>): StudentSubmission => {
    const newSub: StudentSubmission = { ...subData, id: `sub-${Date.now()}`, submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 16) };
    setSubmissions((prev) => [newSub, ...prev]);
    return newSub;
  };

  const updateSubmission = (id: string, updates: Partial<StudentSubmission>) => { setSubmissions((prev) => prev.map((sub) => (sub.id === id ? { ...sub, ...updates } : sub))); };
  const openTeacherDrawerWithContext = (subject?: Subject, dailyClass?: DailyClass, guide?: GuideAiContent | null) => {
    if (subject) setActiveSubject(subject);
    if (dailyClass) setActiveClass(dailyClass);
    setTeacherGuide(guide && dailyClass ? { classId: dailyClass.id, content: guide } : null);
    setIsTeacherDrawerOpen(true);
  };
  
  // Fuente única de verdad para la regla de "clase completada": se deriva siempre
  // de que todas las actividades estén completas, sin importar quién actualice.
  const updateClassActivities = (
    classId: string,
    update: (activity: DailyClass['activities'][number]) => DailyClass['activities'][number],
  ) => {
    setClassesList((prev) => prev.map((cls) => {
      if (cls.id !== classId) return cls;
      const updatedActivities = cls.activities.map(update);
      return { ...cls, activities: updatedActivities, isCompleted: updatedActivities.every((a) => a.completed) };
    }));
  };

  const toggleActivityCompletion = (classId: string, activityId: string) => {
    updateClassActivities(classId, (act) => act.id === activityId ? { ...act, completed: !act.completed } : act);
  };

  const completeClass = (classId: string) => {
    // Candado del Modo Demo: la clase de prueba se puede cursar completa con la IA,
    // pero no se registra avance ni se desbloquea el plan completo.
    if (currentStudent.isDemo) {
      setIsDemoLockOpen(true);
      return;
    }
    updateClassActivities(classId, (act) => ({ ...act, completed: true }));
  };

  return (
    <SchoolContext.Provider 
      value={{ 
        studentsList, 
        currentStudent, 
        // FIX 2: Si por alguna razón está vacío (null), asume al primer estudiante. ¡A TypeScript le encanta esto!
        currentStudentId: currentStudentId || studentsList[0].id, 
        setCurrentStudentId: (id: StudentId) => setCurrentStudentId(id), 
        authenticatedStudentId, 
        setAuthenticatedStudentId, 
        isAuthenticated: !!authenticatedStudentId, 
        currentRole,
        setCurrentRole,
        loginStudent, 
        authenticateStudent,
        logoutStudent, 
        registerNewStudent, 
        isAuthModalOpen, 
        targetLoginStudentId, 
        openAuthModal, 
        closeAuthModal, 
        selectedDayOfWeek, 
        setSelectedDayOfWeek, 
        activeTab, 
        setActiveTab: handleSetActiveTab, 
        studentSubjects, 
        allSubjects, 
        activeSubject, 
        setActiveSubject, 
        todayClasses, 
        getClassForSubjectOnDay,
        allStudentClasses, 
        activeClass, 
        setActiveClass, 
        submissions, 
        addSubmission, 
        updateSubmission, 
        isTeacherDrawerOpen, 
        setIsTeacherDrawerOpen, 
        openTeacherDrawerWithContext, 
        teacherContext,
        toggleActivityCompletion,
    completeClass,
        microRouteProgress,
        markMicroCleared,
        resetMicroRoute,
        lastSavedAt,
        studentSchedule, 
        todaySchedule, 
        currentSchoolDay,
        schoolWeek,
        schoolWeekIndex,
        classesList, 
        customAvatars, 
        updateStudentAvatar, 
        changePassword, 
        resetPasswordWithPin, 
        navigationHistory, 
        navigateBack, 
        navigateToHome, 
        loginAsTestStudent,
        isDemoMode,
        isDemoLockOpen,
        openDemoLock,
        closeDemoLock,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export function useSchool() {
  const context = useContext(SchoolContext);
  if (!context) throw new Error('useSchool debe usarse dentro de un SchoolProvider');
  return context;
}

/**
 * Contexto del profesor IA, siempre resuelto: materia + clase del día + guía v4 EXACTA.
 * `guiaDelDia` es el mismo string que se imprime en el PDF; null si esa clase aún no tiene guía.
 */
export function useTeacherContext(): TeacherContextValue {
  return useSchool().teacherContext;
}
