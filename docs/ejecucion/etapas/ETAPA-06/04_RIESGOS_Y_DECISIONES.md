# Registro de Riesgos y Decisiones Técnicas — ETAPA 06: Núcleo Académico LMS

## 1. Decisiones de Arquitectura (ADR)

### ADR-01: Separación Estricta entre "Actividad Completada" y "Dominio Demostrado"
- **Contexto**: En los sistemas LMS convencionales (ej. Moodle o Canvas), subir un archivo o marcar una casilla de tarea suele etiquetarse como "competencia alcanzada", distorsionando la realidad pedagógica y el cumplimiento legal del currículo MINEDUC.
- **Decisión**: Se implementó una entidad dedicada (`student_competency_mastery`) gobernada por reglas cuantitativas:
  - Cuando un estudiante entrega una actividad vinculada a una competencia, se incrementa `evidence_count` y se registra `COMPLETED_NO_MASTERY`.
  - Solo si la calificación cuantitativa o el promedio de evidencias alcanza o supera el umbral oficial ecuatoriano de **7.00 / 10.00** (`average_score >= 7.00`), el estado se promueve a `DEMONSTRATED_MASTERY` y `is_mastered = true`.
- **Alternativas descartadas**:
  - *Delegar el cálculo al frontend*: Descartado por vulnerabilidad de manipulación en cliente.
  - *Calcular al vuelo sin tabla de consolidación*: Descartado por costo computacional y lentitud al generar boletines y cuadros de calificaciones masivos.

### ADR-02: Libro Mayor de Calificaciones con Rúbricas e Historial Inmutable
- **Contexto**: En entornos educativos con validez ministerial, modificar una calificación previa sin dejar rastro de auditoría o motivo pedagógico constituye una falta grave que vulnera la seguridad jurídica del menor y de la institución.
- **Decisión**: Se creó la tabla `submission_grade_history`. Cada vez que un docente evalúa o re-evalúa una entrega:
  - Se almacena la tupla `(previous_score, new_score, previous_feedback, new_feedback, rubric_scores_json, changed_by_user_id, change_reason, changed_at)`.
  - La consulta histórica ordena estrictamente por `rowid DESC, changed_at DESC` para garantizar orden cronológico exacto incluso ante evaluaciones sucesivas en fracciones de segundo.
- **Alternativas descartadas**:
  - *Sobrescribir la columna `score` en `student_submissions` sin historial*: Descartado por pérdida irreversible de trazabilidad y riesgos de auditoría MINEDUC.

### ADR-03: Internacionalización de Recursos Pedagógicos con Fallback Transparente
- **Contexto**: El programa ALSIZ incorpora materias con contenidos bilingües (Inglés, STEM, oratoria), pero no todos los recursos didácticos existentes disponen de traducción al inglés en la fase inicial.
- **Decisión**: Se estructuró `learning_resources` con el atributo `language` (`'es'`, `'en'`). El endpoint `GET /api/v1/academic/lessons/:lessonId/resources?lang=...` implementa fallback transparente:
  - Si existen recursos en el idioma solicitado, los devuelve.
  - Si un recurso no tiene traducción en el idioma pedido, devuelve la versión base en español y el frontend despliega una advertencia informativa no intrusiva ("*Mostrando recurso en español; traducción en curso*"), sin romper la experiencia del estudiante.
- **Alternativas descartadas**:
  - *Ocultar recursos no traducidos*: Descartado porque privaría al alumno de materiales esenciales de estudio.
  - *Traducción automática en tiempo real sin revisión pedagógica*: Descartado por riesgo de imprecisiones doctrinales y técnicas.

### ADR-04: Control de Acceso y Aislamiento por Middleware Dedicado (`requireStudentAccess`)
- **Contexto**: La privacidad de menores (LOPDP Art. 21 y 22) exige que ni otros estudiantes ni representantes de otras familias puedan acceder a calificaciones, actividades o boletines.
- **Decisión**: Se diseñó el middleware unificado `requireStudentAccess`, el cual verifica directamente contra la base de datos SQLite si el `req.user.id` corresponde al propio estudiante o a un representante formalmente vinculado mediante `student_representatives`.
- **Alternativas descartadas**:
  - *Validar únicamente que el usuario esté autenticado*: Descartado categóricamente (vulnerabilidad crítica IDOR / BOLA).

---

## 2. Gestión de Riesgos Residuales

| Riesgo | Severidad | Probabilidad | Mitigación Implementada | Acción Futura Recomendada |
| :--- | :---: | :---: | :--- | :--- |
| **Concurrencia en SQLite ante alta carga de entregas simultáneas** | Media | Baja | SQLite configurado en modo WAL (*Write-Ahead Logging*) con `busy_timeout = 5000ms`. Las transacciones de entrega y evaluación son atómicas y ultrarrápidas (< 5ms). | En fase de despliegue nacional con más de 1,000 alumnos concurrentes, evaluar migración a PostgreSQL administrado (RDS/Cloud SQL) usando el mismo esquema DDL. |
| **Recursos didácticos externos no disponibles (enlaces caídos)** | Baja | Media | El modelo almacena `resource_type` y `url`. En caso de fallo de red, los estudiantes tienen el texto pedagógico estructurado en `content_markdown`. | Implementar en Etapa 09 un job automatizado de verificación de enlaces y almacenamiento en caché de activos estáticos en CDN. |
| **Carga de archivos adjuntos pesados en entregas** | Media | Baja | Las entregas admiten texto directo y `attachment_asset_key` referenciado, sin almacenar binarios masivos dentro del motor de base de datos relacional. | Configurar subida directa a bucket S3/GCS con firmas prefirmadas y escaneo antivirus en la etapa de infraestructura y CDN. |
| **Manipulación inadvertida de ponderaciones en rúbricas** | Baja | Baja | Las rúbricas se almacenan como esquemas JSON estructurados y validados en backend. La suma de criterios no puede exceder el `max_score` (10.00). | Añadir en la interfaz de administración docente un visualizador interactivo de calibración de rúbricas antes de publicar tareas. |

