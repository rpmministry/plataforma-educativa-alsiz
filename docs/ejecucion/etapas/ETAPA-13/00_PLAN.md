# Plan de Ejecución — ETAPA 13
## Auditoría Integral y Pruebas de Aceptación End-to-End

- **Etapa**: ETAPA-13
- **Fecha**: 2026-10-16
- **Rama Git**: `etapa-13-auditoria-integral-y-aceptacion`
- **Repositorio**: `https://github.com/rpmministry/plataforma-educativa-alsiz`
- **Directorio de Trabajo**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`
- **Responsable**: Líder Técnico AI (Pair Programming Antigravity)

---

### 1. Contexto y Objetivos

La **ETAPA 13** constituye la fase culminante de aseguramiento de calidad, gobernanza y validación global previa al pase a producción de la **Plataforma Educativa ALSIZ para Ekballo Church**. 

Su propósito central es someter la totalidad de los subsistemas desarrollados e integrados desde la **Etapa 00 hasta la Etapa 12** a una auditoría técnica exhaustiva, reproducible, verificable y libre de datos simulados falsos ("no-mock" para validación estructural), garantizando la estabilidad operativa, la privacidad de datos conforme a la **LOPDP ecuatoriana**, la soberanía curricular del **Acuerdo Ministerial MINEDUC-2023-00069-A**, la resiliencia offline/degradada y la integridad inmutable de los respaldos criptográficos.

#### Objetivos Primarios:
1. **Auditoría de Gobernanza Documental**:
   - Verificar la existencia, coherencia y completitud de los 7 archivos normativos obligatorios (`00_PLAN.md`, `01_CAMBIOS.md`, `02_PRUEBAS.md`, `03_VALIDACION.md`, `04_RIESGOS_Y_DECISIONES.md`, `05_REVERSA.md`, `06_CIERRE.md`) en cada una de las etapas previas (Etapa 00 a Etapa 12), junto con la `bitacora.md` y `README.md` actualizados.
2. **Auditoría de Identidad, Roles RBAC y Seguridad de Credenciales**:
   - Comprobar la inmutabilidad y robustez del hashing `scrypt` (salting criptográfico), control de acceso basado en roles (`SUPER_ADMIN`, `ADMIN_MINISTERIAL`, `DIRECTOR_ACADEMICO`, `DOCENTE_TUTOR`, `ESTUDIANTE_HOMESCHOOL`, `REPRESENTANTE_PADRE`, `REPRESENTANTE_MADRE`, `AUDITOR_EXTERNO`), y la vinculación legal de patria potestad/tutela familiar.
3. **Auditoría del Núcleo Académico LMS K-12 Homeschool**:
   - Validar la consistencia relacional de la Malla Curricular EGB: programa educativo, asignaturas, unidades temáticas, lecciones diarias con estructura bíblico-pedagógica (Oración Inicial, Devocional/Fundamento Bíblico, Contenido Troncal MINEDUC, Actividad Práctica y Conexión Familiar/Discipulado), entregas de tareas, rúbricas y libro de calificaciones ponderado.
4. **Auditoría de Aislamiento Familiar Estricto (Anti-IDOR)**:
   - Verificar que los tutores/representantes legales tengan acceso exclusivo a los expedientes, asistencias, calificaciones y observaciones de sus propios hijos/pupilos, impidiendo fugas transversales de datos personales de menores de edad (Art. 21 LOPDP).
5. **Auditoría del Centro de Conocimiento RAG y Exclusión Efectiva**:
   - Validar que las fuentes canónicas aprobadas alimenten adecuadamente el índice de fragmentos (chunks) y que la desactivación o revocación de una fuente resulte en su exclusión inmediata y absoluta de cualquier respuesta o contexto del tutor de IA.
6. **Auditoría de Orquestación de Agentes IA y Degradación Elegante**:
   - Verificar la resiliencia multiproveedor (Gemini, Groq, Ollama) y el mecanismo de fallback automático al proveedor de simulación local (`SIMULATED_LOCAL`) ante cortes de red, cuotas agotadas o falta de claves de API externas, evitando caídas o errores 500 en la experiencia estudiantil.
7. **Auditoría de Formación Continua No Formal (Etapa 12)**:
   - Comprobar el catálogo de oficios/artes/tecnología/ministerio, el estricto control de cupos (`max_capacity`), el recálculo dinámico de avance por lecciones, las evaluaciones prácticas, la emisión de certificados inmutables con firma SHA-256 y el descargo legal expreso prescrito en el Art. 32 del Acuerdo MINEDUC-2023-00069-A.
8. **Auditoría de Privacidad LOPDP y Sanitización de Logs**:
   - Verificar la anonimización unidireccional de direcciones IP (HMAC/SHA-256 a 64 hexadecimales) en la bitácora de auditoría inmutable (`audit_logs`) y la ausencia absoluta de contraseñas, secretos, tokens o datos biométricos en los registros.
9. **Auditoría de Respaldos en Caliente y Restauración Determinística**:
   - Ejecutar el procedimiento de Hot Backup (`createHotBackup`) mediante SQLite Online Backup API, validar la integridad del archivo resultante (`PRAGMA integrity_check = 'ok'`) y su huella criptográfica SHA-256, verificando el procedimiento de restauración (`restoreFromBackup`).
10. **Salvaguarda Estricta de la Base de Datos de Producción**:
    - Garantizar que la base operativa `data/alsiz.db` se mantenga intacta, utilizando exclusivamente bases de datos aisladas e independientes para todas las suites de prueba automatizadas.

---

### 2. Exclusiones y Restricciones Operativas

- **PROHIBIDO modificar la base de datos de producción `data/alsiz.db`**: Las pruebas y auditorías se ejecutan sobre instancias aisladas temporales (`data/test_alsiz_*.db`).
- **PROHIBIDO inventar resultados de pruebas o métricas**: Todos los resultados deben ser reproducibles mediante scripts automatizados ejecutados vía terminal.
- **PROHIBIDO exponer secretos o credenciales reales**: Mantener variables de entorno sintéticas en `.env.example` y anonimización de PII.
- **PROHIBIDO dejar botones, enlaces o métricas decorativas/falsas**: Toda acción en la interfaz debe estar respaldada por un manejador real o retroalimentación modal honesta de estado.
- **PROHIBIDO iniciar la Etapa 14**: Concluir la etapa en estado de espera para validación y autorización humana.

---

### 3. Criterios de Aceptación Normativos

- [x] **C1**: Ejecución y aprobación al 100% de la suite de pruebas consolidada (`test:etapa05` a `test:etapa12`, más la suite integral `test:etapa13`).
- [x] **C2**: Verificación de compilación estática limpia de TypeScript (`npm run lint` / `tsc --noEmit` con 0 errores).
- [x] **C3**: Verificación de build de producción limpio (`npm run build` con Vite y esbuild con 0 errores).
- [x] **C4**: Verificación del aislamiento inter-familiar estricto (Anti-IDOR) en consultas de representantes y estudiantes.
- [x] **C5**: Verificación del RAG y retiro efectivo de fuentes revocadas.
- [x] **C6**: Verificación de la degradación elegante de IA a simulación local sin error de servidor.
- [x] **C7**: Verificación de los certificados de educación no formal con huella SHA-256 y descargo legal Art. 32 MINEDUC.
- [x] **C8**: Verificación de anonimización de IPs (HMAC/SHA-256) en bitácora de auditoría.
- [x] **C9**: Verificación de respaldo en caliente (Hot Backup) y verificación de integridad SQLite (`PRAGMA integrity_check`).
- [x] **C10**: Generación del expediente documental completo en `docs/ejecucion/etapas/ETAPA-13/` (archivos 00 al 06) y actualización de `bitacora.md` y `README.md`.

