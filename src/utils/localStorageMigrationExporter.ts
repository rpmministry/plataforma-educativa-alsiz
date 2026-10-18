/**
 * ==============================================================================
 * Utilidad de Exportación Controlada de Progreso LocalStorage
 * Plataforma Educativa ALSIZ — Ekballo Church
 * ==============================================================================
 * Esta utilidad permite a los administradores o representantes extraer el progreso
 * escolar real almacenado en el navegador del dispositivo físico original
 * (iPad, tablet o PC) para su posterior ingesta controlada en la base de datos.
 * ==============================================================================
 */

export interface LocalStorageExportPayload {
  version: '1.0';
  exportedAt: string;
  sourceOrigin: string;
  userAgent: string;
  students: any[];
  completedClasses: {
    classId: string;
    studentId: string;
    isCompleted: boolean;
    completedActivities: string[];
  }[];
  submissions: any[];
  customAvatars: Record<string, string>;
  microRouteProgress: Record<string, number[]>;
  guideNotes: {
    key: string;
    studentId?: string;
    classId?: string;
    dateKey?: string;
    data: any;
  }[];
  checksumSha256?: string;
}

/**
 * Recopila todos los datos de progreso escolar legados almacenados en localStorage.
 */
export function exportLocalStudentProgress(): LocalStorageExportPayload {
  if (typeof window === 'undefined' || !window.localStorage) {
    throw new Error('exportLocalStudentProgress solo puede ejecutarse en un entorno de navegador con localStorage disponible.');
  }

  const payload: LocalStorageExportPayload = {
    version: '1.0',
    exportedAt: new Date().toISOString(),
    sourceOrigin: window.location.origin,
    userAgent: navigator.userAgent,
    students: [],
    completedClasses: [],
    submissions: [],
    customAvatars: {},
    microRouteProgress: {},
    guideNotes: [],
  };

  // 1. Estudiantes
  try {
    const rawStudents = localStorage.getItem('wisdom_students_v2026');
    if (rawStudents) payload.students = JSON.parse(rawStudents);
  } catch (e) {
    console.warn('[Export] Error leyendo wisdom_students_v2026:', e);
  }

  // 2. Clases completadas y actividades marcadas
  try {
    const rawClasses = localStorage.getItem('wisdom_classes_v2026');
    if (rawClasses) {
      const parsedClasses = JSON.parse(rawClasses);
      if (Array.isArray(parsedClasses)) {
        payload.completedClasses = parsedClasses
          .filter((c: any) => c.isCompleted || (c.activities && c.activities.some((a: any) => a.completed)))
          .map((c: any) => ({
            classId: c.id,
            studentId: c.studentId,
            isCompleted: Boolean(c.isCompleted),
            completedActivities: (c.activities || []).filter((a: any) => a.completed).map((a: any) => a.id),
          }));
      }
    }
  } catch (e) {
    console.warn('[Export] Error leyendo wisdom_classes_v2026:', e);
  }

  // 3. Entregas / Submissions
  try {
    const rawSubmissions = localStorage.getItem('wisdom_submissions_v2026');
    if (rawSubmissions) payload.submissions = JSON.parse(rawSubmissions);
  } catch (e) {
    console.warn('[Export] Error leyendo wisdom_submissions_v2026:', e);
  }

  // 4. Avatares personalizados
  try {
    const rawAvatars = localStorage.getItem('wisdom_avatars_v2026');
    if (rawAvatars) payload.customAvatars = JSON.parse(rawAvatars);
  } catch (e) {
    console.warn('[Export] Error leyendo wisdom_avatars_v2026:', e);
  }

  // 5. Progreso en micro-rutas
  try {
    const rawMicroRoute = localStorage.getItem('wisdom_micro_route_v2026');
    if (rawMicroRoute) payload.microRouteProgress = JSON.parse(rawMicroRoute);
  } catch (e) {
    console.warn('[Export] Error leyendo wisdom_micro_route_v2026:', e);
  }

  // 6. Guías y notas de clase (wisdom_guide_*)
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('wisdom_guide_')) {
      try {
        const val = localStorage.getItem(key);
        if (val) {
          const parts = key.split('_');
          payload.guideNotes.push({
            key,
            studentId: parts[2],
            classId: parts[3],
            dateKey: parts.slice(4).join('_'),
            data: JSON.parse(val),
          });
        }
      } catch (e) {
        console.warn(`[Export] Error parseando ${key}:`, e);
      }
    }
  }

  return payload;
}

/**
 * Descarga el archivo JSON exportado directamente en el navegador del usuario.
 */
export function downloadProgressExportFile(fileName = 'alsiz_device_progress_export.json'): void {
  const data = exportLocalStudentProgress();
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Si se ejecuta en consola de navegador, exponer globalmente para facilidad de soporte técnico
if (typeof window !== 'undefined') {
  (window as any).__ALSIZ_EXPORT_PROGRESS__ = {
    exportData: exportLocalStudentProgress,
    downloadFile: downloadProgressExportFile,
  };
}

