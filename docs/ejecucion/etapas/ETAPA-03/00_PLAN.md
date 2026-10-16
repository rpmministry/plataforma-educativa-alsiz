# ETAPA-03 — Plan de Arquitectura y Plan Técnico

## 1. Alcance y Contexto de la Etapa
- **Objetivo General**: Convertir los requisitos aprobados de la Etapa 01 y el marco curricular/jurídico de la Etapa 02 en una **arquitectura de software modular**, con modelo de datos entidad-relación, contratos de API formalizados, directrices de seguridad/privacidad LOPDP y secuencia de implementación por dependencias, sin modificar código de producto en esta etapa.
- **Rama Local**: `etapa-03-arquitectura-y-plan-tecnico`.
- **Directorio de Trabajo**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`.
- **Repositorio Remoto Esperado**: `https://github.com/rpmministry/plataforma-educativa-alsiz` (origen en `main`).
- **Línea Base Previa**: Informes de Cierre aprobados de las Etapas 00, 01 y 02.

---

## 2. Objetivos Específicos
1. **Definir la Arquitectura Destino**: Preservar React 19, TypeScript 5.8, Vite 6, Tailwind CSS 4 y Express 4, justificando técnicamente cualquier migración (persistencia relacional, cookies HttpOnly, orquestación en servidor).
2. **Diseñar los Módulos Principales**: Identidad y permisos, estudiantes y representantes, currículo y programas, LMS y aula interactiva, contenido y recursos, evaluación y evidencias, seguimiento y reportes, agentes IA, centro de conocimiento e indexación semántica, administración y auditoría.
3. **Elaborar Diagramas de Arquitectura C4**: Contexto (Nivel 1), Contenedores (Nivel 2) y Componentes de Backend (Nivel 3).
4. **Diseñar el Modelo de Datos y Diccionario de Entidades**: ERD con cardinalidad, restricciones, índices, reglas de aislamiento de datos y esquema que soporte matrícula multi-programa sin duplicación de expedientes.
5. **Definir Contratos de API e Interfaces**: Endpoints RESTful `/api/v1`, DTOs en TypeScript, autorización requerida, validación de esquemas Zod y códigos de error normalizados.
6. **Especificar la Arquitectura RAG y Multi-Agente**: Tutor socrático, evaluador formativo, generador de guías, orquestador con circuit breaker en cascada y citas obligatorias `[S#]`.
7. **Documentar la Política de Roles, Minimización y Auditoría**: Matriz RBAC, directrices del Art. 22 de la LOPDP para datos de menores y libro mayor de auditoría inmutable.
8. **Plan de Implementación y Migraciones Incrementales**: Hoja de ruta en 5 fases secuenciadas por dependencias con matriz de reversión.
9. **Estimar Costes Operativos**: Proyecciones con supuestos explícitos en 4 escenarios (10, 50, 200 y 500 alumnos), distinguiendo estimaciones de cotizaciones.
10. **Registrar Decisiones Arquitectónicas (ADRs)**: 6 registros formales (ADR-001 a ADR-006).

---

## 3. Exclusiones Taxativas
- **No Implementar Módulos de Producto**: Prohibido alterar el código en `src/`, `server.ts` o archivos de configuración de despliegue en esta etapa.
- **No Alterar Esquemas Reales de Base de Datos**: No ejecutar migraciones en bases de datos activas ni modificar el almacenamiento físico.
- **No Añadir Dependencias a `package.json`**: Mantener los lockfiles intactos.

---

## 4. Criterios de Aceptación de la Etapa
- [x] Cada requisito P0 de la Etapa 01 tiene un módulo responsable y estrategia de verificación.
- [x] El modelo de datos evita duplicar expedientes y permite varias materias y programas por estudiante.
- [x] Las decisiones de seguridad y privacidad LOPDP están representadas en el diseño.
- [x] Las dependencias entre etapas de desarrollo son explícitas.
- [x] Se mantiene inalterado el código funcional rastreado (`git diff` limpio).

