# Plan de Trabajo — Etapa 11: Preparación del Inicio de Clases y Pase Controlado a Producción

**Plataforma Educativa ALSIZ — Ekballo Church**  
**Fecha:** 17 de Octubre de 2026  
**Rama de Trabajo:** `continuacion-produccion-etapa-11`  
**Commit Base:** `c63a11c`  
**Responsable Técnico de Aceptación:** Antigravity (Google DeepMind Team)  

---

## 1. Objetivo General

Actuar como responsable de aceptación técnica final para auditar integralmente la plataforma educativa antes del inicio del año escolar 2026-2027, garantizando que el acceso de los estudiantes reales **Gael Andrade Sánchez (4.º EGB Elemental)** y **Avril Andrade Sánchez (8.º EGB Superior)** se aperture **únicamente** cuando se encuentren formalmente verificadas las cuentas persistentes, la malla curricular de Unidad 1, los agentes socráticos IA, la seguridad criptográfica, las garantías operativas y el alcance legal e institucional.

---

## 2. Dimensiones de Evaluación y Alcance

La Etapa 11 abarca la auditoría de 5 dimensiones indivisibles conforme al **PROMPT 11**:

```
+-----------------------------------------------------------------------------------+
|                        DIMENSIONES DE ACEPTACIÓN FINAL                            |
+--------------------------+--------------------------------------------------------+
| 1. Identidad y Datos     | Cuentas reales persistentes, tutela paterna, scrypt,   |
|                          | aislamiento Anti-IDOR, cero notas ficticias.           |
+--------------------------+--------------------------------------------------------+
| 2. Malla Curricular      | 20 materias con docente IA, 48 clases de Unidad 1,      |
|                          | 0 Rickrolls, 0 dominios muertos, licencias OER.        |
+--------------------------+--------------------------------------------------------+
| 3. IA y Conocimiento     | Cascada ProviderManager, fallback SIMULATED_LOCAL,     |
|                          | 20 matrices temáticas, RAG fundamentado, cero fugas.   |
+--------------------------+--------------------------------------------------------+
| 4. Operación y Seguridad | SQLite WAL persistente, 9 migraciones v013, hot backup |
|                          | VACUUM INTO, cookies HttpOnly/SameSite=Lax, telemetría.|
+--------------------------+--------------------------------------------------------+
| 5. Alcance y Legalidad   | Distinción explícita de apoyo pedagógico / homeschool, |
|                          | sin títulos no autorizados, semáforo y acta formal.    |
+--------------------------+--------------------------------------------------------+
```

---

## 3. Plan de Acción y Tareas Específicas

1. **Auditoría Técnica de Identidad y Persistencia Relacional:**
   - Validar la presencia de `usr-real-avril`, `usr-real-gael` y `usr-real-rep-mauricio` en `data/alsiz.db`.
   - Comprobar la integridad relacional de claves foráneas (`PRAGMA foreign_key_check = 0`).
   - Confirmar el almacenamiento de hashes `scrypt` con sal única e independiente de 16 bytes y rechazo de contraseñas de mockData.

2. **Inspección Curricular y Calidad de Materiales Didácticos:**
   - Auditar las 25 clases socráticas de Gael (`dailyClassesGael.ts`) y las 23 clases de Avril (`dailyClassesAvril.ts`).
   - Verificar la erradicación total de marcadores de posición de broma (Rickrolls) y enlaces a dominios extintos (`wisdom-school.edu`).
   - Comprobar que los recursos interactivos pertenezcan a repositorios abiertos con licencias verificadas (PhET Colorado CC-BY, GeoGebra, Scratch MIT).

3. **Verificación de Agentes IA y RAG Fundamentado:**
   - Validar la cobertura de las 20 materias con los 20 profesores virtuales en `ai_agents` + 5 roles transversales.
   - Constatar la presencia de las 20 matrices temáticas (`MT-*.md`) en `docs/ai-agents/matrices-tematicas/`.
   - Confirmar la existencia de fragmentos indexados con citación formal `[TAG#C1]` y degradación transparente en contingencia.

4. **Saneamiento Institucional y Blindaje Legal:**
   - Actualizar pie de página (`Footer.tsx`), modales de error y componentes con la denominación `ALSIZ • EKBALLO CHURCH`.
   - Incorporar un descargo legal visible que distinga el servicio de tutoría/apoyo pedagógico de modalidades escolarizadas con titulación oficial estatal directa.
   - Erradicar backdoors en `src/app/avril/page.tsx` y `src/app/gael/page.tsx` que fijaban sesiones en `localStorage` sin credenciales.

5. **Construcción de la Suite de Aceptación Determinista:**
   - Implementar `scripts/test-etapa-11-acceptance.ts` con 19 verificaciones exhaustivas y reproducibles.
   - Registrar `npm run test:etapa11-acceptance` en `package.json`.

6. **Construcción del Acta de Pase a Producción y Documentación de Cierre:**
   - Redactar `ACTA_PASE_PRODUCCION.md` para revisión y suscripción formal por parte de Mauricio Andrade Luna.
   - Documentar cambios, pruebas, matriz de validación, riesgos, procedimiento de reversión y cierre final.

---

## 4. Criterios de Aceptación y Reglas de Detención

- **Compilación Estricta:** `npm run lint` (`tsc --noEmit`) con código de salida 0.
- **Seguridad P0:** 10/10 pruebas pasadas en `test-security-p0.ts` y 0 secretos en `test-scan-dist-secrets.ts`.
- **Semáforo y Puerta de Producción:** Si existe algún riesgo residual crítico sin mitigar, declarar semáforo **ROJO**; si el sistema está técnicamente verificado pero condicionado a provisión externa y firma humana, declarar **AMARILLO**.
- **Detención Operativa:** No realizar `git push`, no fusionar ramas, no desplegar a producción sin orden expresa del responsable.

