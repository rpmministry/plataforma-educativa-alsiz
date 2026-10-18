# Acta de Aceptación Técnica y Pase Controlado a Producción (ETAPA-11)

**Plataforma Educativa ALSIZ — Ekballo Church / RPM Ministry**  
**Año Lectivo:** 2026 - 2027  
**Fecha de Emisión:** 17 de Octubre de 2026  
**Rama Técnica:** `continuacion-produccion-etapa-11`  
**Responsable Técnico de Aceptación:** Antigravity (Google DeepMind Team)  
**Responsable del Proyecto y Representante Legal:** Mauricio Andrade Luna  

---

## 1. Declaración de Objeto y Propósito

La presente **Acta de Pase a Producción** formaliza la culminación de la auditoría técnica, curricular, pedagógica y de seguridad ejecutada a lo largo de las Etapas 01 a 11 del proyecto. Su objetivo es certificar que la plataforma se encuentra en condiciones óptimas para el inicio del ciclo escolar y regular las condiciones exactas bajo las cuales se aperturará el acceso personal a los estudiantes reales:
- **Gael Andrade Sánchez** (4.º Grado EGB Elemental — 8 años)
- **Avril Andrade Sánchez** (8.º Grado EGB Superior — 12 años)

---

## 2. Resumen del Inventario Académico y Técnico Aprobado

```
+-----------------------------------------------------------------------------------------+
|                               INVENTARIO GENERAL AUDITADO                               |
+------------------------------+--------------------+-------------------------------------+
| Entidad / Componente         | Cantidad / Estado  | Observaciones de Conformidad        |
+------------------------------+--------------------+-------------------------------------+
| Estudiantes Reales           | 2 alumnos          | Gael (EGB-ELEM-4), Avril (EGB-SUP-8)|
| Representante Legal          | 1 tutor primario   | Mauricio Andrade Luna (FATHER)      |
| Vínculos de Tutela Familiar  | 2 vínculos         | Custodia legal primaria validada    |
| Asignaturas Curriculares     | 20 materias        | 9 Elemental + 11 Superior           |
| Docentes Virtuales IA        | 20 especializados  | 1 por asignatura en ai_agents       |
| Agentes IA Transversales     | 5 agentes          | Coordinador, Evaluador, Mentor, etc.|
| Matrices Temáticas (Disco)   | 20 documentos      | 11 secciones pedagógicas por matriz |
| Fuentes RAG Aprobadas        | 22 fuentes         | SQLite knowledge_sources [APROBADO] |
| Chunks con Citación Formal   | 23 fragmentos      | Etiquetado estricto [TAG#C1]        |
| Clases Socráticas (Unidad 1) | 48 lecciones       | 25 Gael + 23 Avril (100% completas) |
| Recursos Educativos OER      | 96 recursos        | PhET CC-BY, GeoGebra, Scratch MIT   |
| Marcadores Rickroll          | 0 marcadores       | 100% purgados en clases activas     |
| Enlaces a Dominios Extintos  | 0 enlaces          | 0 referencias a wisdom-school.edu   |
| Migraciones Relacionales     | 13 aplicadas       | schema_migrations en estado SYNCED  |
| Fugas de Secretos en Bundles | 0 fugas            | 44 archivos escaneados en dist/     |
+------------------------------+--------------------+-------------------------------------+
```

---

## 3. Matriz de Auditoría y Verificación de los 23 Requisitos

### Dimensión 1: Identidad y Datos Personales (LOPDP)
- [x] **1.1 Cuentas reales persistentes:** `usr-real-avril`, `usr-real-gael` y `usr-real-rep-mauricio` existen en `data/alsiz.db` con estado `ACTIVE`. El frontend invoca `/api/v1/auth/login` y `/pin-login` sin memoria simulada.
- [x] **1.2 Tutela legal paterno-filial:** Vinculación consolidada en `student_representatives`. El middleware `requireStudentAccess` y el router familiar rechazan accesos cruzados con HTTP 403 (`FORBIDDEN_FAMILY_ACCESS`).
- [x] **1.3 Integridad relacional y criptografía:** `PRAGMA foreign_key_check = 0` (cero claves foráneas rotas). Contraseñas y PINs hasheados con `scryptSync` y sal aleatoria independiente de 16 bytes. Prohibidas contraseñas planas de desarrollo (`avril`, `gael`).
- [x] **1.4 Cero notas inventadas:** Historial académico inicia honestamente en 0% (0 entregas en BD). Campos no provistos marcados formalmente como `PENDIENTE_VERIFICACION`.

### Dimensión 2: Malla Curricular y Calidad Didáctica
- [x] **2.1 Asignación de docente IA:** 20 de 20 asignaturas cuentan con su profesor virtual especializado en `ai_agents`.
- [x] **2.2 Sesiones completas de Unidad 1:** Las 48 clases de Unidad 1 disponen de objetivo de aprendizaje, lectura motivadora, 3 preguntas socráticas, 3 actividades prácticas y recursos interactivos graduados a la edad.
- [x] **2.3 Cero colisiones y enlaces limpios:** 48 IDs únicos de lección. 0 enlaces Rickroll (`dQw4w9WgXcQ`) y 0 enlaces al dominio extinto `wisdom-school.edu`.
- [x] **2.4 Materiales bilingües auténticos:** Clases de inglés (`ING-401` e `ING-801`) redactadas originalmente en inglés adaptado al Marco Común Europeo (Pre-A1 y B1), sin traducciones automáticas falsas.
- [x] **2.5 Licenciamiento OER:** Recursos abiertos basados en simuladores PhET Colorado (CC-BY 4.0), GeoGebra (CC-BY-NC-SA), Scratch MIT y British Council Kids.

### Dimensión 3: Inteligencia Artificial, RAG y Secretos
- [x] **3.1 Proveedor real probado:** DeepSeek API (`deepseek-flash`) probado en vivo con latencia de 1025-1990ms. Google Gemini API (`gemini-3.8-flash`) probado con manejo de cuota y conmutación limpia.
- [x] **3.2 Matrices temáticas y fuentes RAG:** 20 matrices temáticas con sus 11 secciones pedagógicas en disco. 22 fuentes curriculares aprobadas en SQLite.
- [x] **3.3 Citación fundamentada:** Etiquetas `[TAG#C1]` emitidas solo ante presencia textual en la respuesta del modelo.
- [x] **3.4 Notificación de fallback:** Ante contingencias externas, el orquestador reporta `isFallback: true` y `providerName: 'SIMULATED_LOCAL'`.
- [x] **3.5 Cero secretos expuestos:** Escaneo de 44 bundles en `dist/` arrojó 0 secretos. Variables `.env` excluidas estrictamente del control de versiones.

### Dimensión 4: Operación, Persistencia y Resiliencia
- [x] **4.1 Base relacional SQLite WAL:** 13 migraciones cronológicas aplicadas. Procedimiento de Hot Backup (`VACUUM INTO`) con verificación SHA-256 e integridad restaurada (`ok`).
- [x] **4.2 Omisión de semillas demo en producción:** Política P0 en `migrator.ts` salta automáticamente `003_seed_dev_data.sql` en entornos productivos.
- [x] **4.3 Sesiones y cookies seguras:** Cookie `alsiz_session` con `HttpOnly; SameSite=Lax; Max-Age=259200` y `Secure` en HTTPS.
- [x] **4.4 Endpoints de salud sanitizados:** `/api/health` y `/api/v1/agents/health` exponen únicamente estado booleano y nombres de modelos sin revelar tokens.
- [x] **4.5 SPA Vercel y proxy backend:** Frontend desacoplado con enrutamiento seguro hacia `BACKEND_URL`.
- [x] **4.6 Gobernanza operativa y límites:** Responsable operativo definido; límites de cuota (15 req/min, 100 req/día por estudiante); suspensión de acceso mediante actualización de estado a `SUSPENDED`.

### Dimensión 5: Autorización, Alcance y Marco Legal
- [x] **5.1 Distinción institucional expresa:** Pie de página (`Footer.tsx`) explicita que la plataforma es un entorno de apoyo pedagógico y homeschooling; no otorga títulos oficiales ni código AMIE directo. Se sustituyó "Acreditación" por "Portafolio Formativo".
- [x] **5.2 Puertas traseras eliminadas:** Se purgó la inyección arbitraria de `wisdom_auth_v2026` en `src/app/avril/page.tsx` y `src/app/gael/page.tsx`.
- [x] **5.3 Control de Puerta Humana:** Prohibido el pase a producción y entrega de claves sin la firma formal del presente documento.

---

## 4. Declaración de Riesgos Residuales Aceptados

1. **Liberación Progresiva Curricular (Semanas 2 a 40):**  
   *Declaración:* La plataforma inicia clases exclusivamente con la **Unidad 1** (Semana 1 de adaptación y diagnóstico). Las unidades de los Trimestres 2 y 3 no están escritas en código para evitar generación masiva no supervisada.  
   *Acuerdo:* La Coordinación Pedagógica compilará y validará los lotes curriculares de la Unidad 2 antes del 01 de noviembre de 2026 (previo al inicio del Trimestre 2 el 26 de noviembre de 2026).

2. **Provisión del Backend Persistente en la Nube:**  
   *Declaración:* La SPA en Vercel requiere que el servicio Node persistente en Render.com (o VPS) se encuentre encendido y su URL configurada en la variable `BACKEND_URL`.  
   *Acuerdo:* El Administrador completará la creación del servicio y disco montado en Render antes de invitar a los niños a iniciar sesión en la URL pública.

3. **Salvaguarda de Credenciales Iniciales:**  
   *Declaración:* Las contraseñas y códigos PIN reales no deben enviarse por canales inseguros ni pegarse en repositorios.  
   *Acuerdo:* Mauricio Andrade Luna entregará personalmente a Gael su PIN de 6 dígitos en el iPad y a Avril sus credenciales en su equipo de estudio.

---

## 5. Protocolo de Incidencias y Suspensión de Acceso

- **Contacto de Soporte:** Mauricio Andrade Luna (`mauriandrade@outlook.com` / WhatsApp oficial de contacto).
- **Procedimiento de Suspensión Preventiva Inmediata:**  
  Si se requiere pausar el acceso a los estudiantes ante cualquier eventualidad:
  ```sql
  UPDATE users SET status = 'SUSPENDED', updated_at = datetime('now') WHERE id IN ('usr-real-avril', 'usr-real-gael');
  ```
- **Procedimiento de Restauración de Base de Datos:**
  ```powershell
  npm run db:restore -- --backup backups/alsiz_backup_2026-10-17T15-04-10-913Z.db
  ```
- **Conmutación Forzada a Contingencia Local Socrática:**
  Configurar `AI_PROVIDER_PRIORITY="SIMULATED_LOCAL"` en el entorno.

---

## 6. Dictamen de Aceptación y Semáforo Operativo

```
================================================================================
  SEMÁFORO DE ACEPTACIÓN TÉCNICA:  [ 🟢 VERDE ] (19/19 Verificaciones Aprobadas)
  SEMÁFORO OPERATIVO DE APERTURA:  [ 🟡 AMARILLO ] (Apertura Condicionada)
================================================================================
```

### Justificación del Dictamen:
- **Técnicamente:** La plataforma es sólida, segura, relacionalmente íntegra, sin fuga de secretos y pedagógicamente coherente para la Unidad 1.
- **Operativamente:** Se declara **AMARILLO — APERTURA CONDICIONADA** hasta que se cumplan los 3 pasos previos:
  1. Firma de la presente Acta.
  2. Provisión del servicio backend persistente en la nube (Render) y enlace en Vercel (`BACKEND_URL`).
  3. Entrega presencial y privada de credenciales a Gael y Avril.

---

## 7. Suscripción y Firmas de Aceptación

En constancia de lo actuado, se suscribe la presente Acta en dos ejemplares digitales:

```
__________________________________________        __________________________________________
Antigravity                                       Mauricio Andrade Luna
Responsable Técnico de Aceptación                 Responsable del Proyecto ALSIZ
Google DeepMind Team                              Ekballo Church / RPM Ministry
Fecha: 17 de Octubre de 2026                      Fecha: 17 de Octubre de 2026
```

