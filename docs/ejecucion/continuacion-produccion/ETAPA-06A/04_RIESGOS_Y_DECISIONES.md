# Registro de Decisiones y Gestión de Riesgos — Etapa 06A

**Fecha:** 17 de octubre de 2026  
**Rama:** `continuacion-produccion-etapa-06a`  

---

### 1. Decisiones Técnicas y Pedagógicas

#### Decisión 1: Arquitectura Modular de Lotes en `scripts/lotes/`
- **Contexto:** Se requería generar el currículo de Gael por lotes pequeños (máximo 5 sesiones consecutivas) sin arriesgar la pérdida de contexto, truncamiento de archivos o mezclas de asignaturas.
- **Decisión adoptada:** En lugar de manipular un script monolítico de miles de líneas, se estructuraron 9 módulos independientes (`lote1-len.ts` a `lote9-efi.ts`) y un agregador central `index.ts`.
- **Impacto:** Permite auditar, modificar o extender cada materia y lote de forma aislada, garantizando mantenibilidad y legibilidad a largo plazo.

#### Decisión 2: Enriquecimiento No Disruptivo de `DailyClass`
- **Contexto:** Las 20 clases heredadas de Gael tenían una estructura básica (`theme`, `objective`, `introduction`, `reading`, etc.). La Etapa 06A requería 18 campos pedagógicos avanzados (DCD, rúbricas, adaptación para dificultades, extensión, etc.).
- **Decisión adoptada:** Se agregaron los nuevos campos como opcionales (`?`) en `src/types/index.ts`.
- **Impacto:** Las clases de Gael ahora cuentan con rigor curricular completo de 18 campos, mientras que el código existente de Avril y los componentes de visualización continúan funcionando sin emitir errores de tipos.

#### Decisión 3: Sustitución Radical de Enlaces Maliciosos y Dominios Extintos
- **Contexto:** La auditoría de la Etapa 05 reveló 11 videos de broma (Rickroll: `dQw4w9WgXcQ`) y 20 enlaces al dominio extinto `wisdom-school.edu`.
- **Decisión adoptada:** Purgar de raíz cualquier vestigio de Rickroll y enlaces externos rotos. Se seleccionaron OERs de reputación internacional comprobada (PhET de la Universidad de Colorado, GeoGebra, Starfall, British Council Kids, Scratch del MIT, NASA Kids, BioWeb de la PUCE, ECU 911, StoryWeaver y Tate Kids), y las guías didácticas se unificaron bajo el endpoint nativo `/api/v1/academic/classes/:id/guide.pdf`.
- **Impacto:** Máxima seguridad y seriedad pedagógica para el estudiante menor de edad.

#### Decisión 4: Desambiguación de Claves Primarias de Clases
- **Contexto:** Existían duplicaciones de claves primarias en el repositorio legado (`class-sci-gael-01` aparecía dos veces; `class-mat-gael-02` colisionaba).
- **Decisión adoptada:** Secuenciación estricta y transparente de IDs (`class-len-gael-01` a `05`, `class-mat-gael-01` a `05`, `class-sci-gael-01` a `04`, etc.), validada por el script mediante estructuras `Set<string>`.
- **Impacto:** Cero colisiones de clave primaria en bases de datos o renderizadores React (keys únicas).

---

### 2. Matriz de Riesgos Identificados y Mitigados

| Riesgo | Severidad | Probabilidad | Mitigación Aplicada | Estado |
|---|:---:|:---:|---|:---:|
| **Regresión o daño en el currículo de Avril** | ALTA | BAJA | Aislamiento estricto de scope. Ningún archivo de Avril (`dailyClassesAvril.ts`, etc.) fue tocado ni referenciado en esta etapa. | MITIGADO |
| **Alucinación de códigos curriculares o fuentes** | MEDIA | BAJA | Contraste con el Currículo Nacional MINEDUC Ecuador vigente (Acuerdo 2023-00069-A / Reformas 2025), CSTA K-12 para software y marco de Ekballo Church para valores. | MITIGADO |
| **Ruptura de compilación de TypeScript** | ALTA | MEDIA | Verificación continua con `npx tsc --noEmit` hasta obtener código de salida 0 sin ningún warning. | MITIGADO |
| **Peligro de enlaces rotos o inapropiados para menores** | ALTA | BAJA | Validador automatizado con reglas estrictas que abortan la compilación si detecta strings prohibidos (`dQw4w9WgXcQ`, `wisdom-school.edu`). | MITIGADO |
| **Inconsistencias de despliegue o push prematuro** | ALTA | BAJA | Cumplimiento de la regla de gobernanza: no push remoto, no merge a main, detención tras validación local. | MITIGADO |
