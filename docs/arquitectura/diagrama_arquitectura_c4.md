# Diagrama de Arquitectura Modular C4 — Plataforma Educativa ALSIZ

## 1. Visión General de la Arquitectura

La arquitectura de la **Plataforma Educativa ALSIZ para Ekballo Church** evoluciona desde el prototipo heredado monolítico de Wisdom School (centrado en el cliente con `localStorage` y llamadas directas de IA) hacia una **arquitectura modular de servicios desacoplados**, orientada a la privacidad, la resiliencia en conectividad intermitente (*offline-first / async*) y el cumplimiento normativo ecuatoriano (LOPDP y MINEDUC).

### Principios Arquitectónicos
1. **Preservación y Rentabilización de Activos**: Se conserva el núcleo frontend React 19 + TypeScript + Vite 6 + Tailwind CSS 4, aprovechando la rica interfaz táctil probada en iPads y la biblioteca de componentes interactivos.
2. **Backend de Orquestación y Seguridad Centralizada**: Unificación de servicios en una capa de backend modular en Node.js/Express (con soporte serverless para Vercel o proceso standalone en contenedor Docker), eliminando toda exposición de claves o lógica crítica en el navegador.
3. **Persistencia Híbrida y Resiliencia ante Desconexión**: Modo *Offline-First* con sincronización bidireccional basada en eventos. Los estudiantes en zonas rurales de Ecuador pueden descargar guías didácticas y materiales, registrar progreso localmente y sincronizar al recuperar conectividad.
4. **Capa IA Aislada con Cascada de Proveedores y Circuit Breaker**: Orquestación en servidor que conmuta entre DeepSeek V3, Google Gemini 2.0/1.5 Flash y OpenRouter de forma transparente, garantizando alta disponibilidad a costes operativos reducidos.
5. **Seguridad y Privacidad por Diseño (LOPDP Art. 22)**: Cero exposición pública de expedientes o imágenes de menores; autenticación basada en credenciales robustas y tokens de sesión con cookies `HttpOnly` y protección CSRF.

---

## 2. Diagrama C4 — Nivel 1: Contexto del Sistema

El diagrama de contexto ilustra cómo los diferentes actores humanos y sistemas externos interactúan con la Plataforma ALSIZ.

```mermaid
flowchart TD
    subgraph Actores["Usuarios del Sistema ALSIZ"]
        E["Estudiante (Homeschool / Discipulado)<br/>[Gael / Avril / Alumnos Ekballo]"]
        R["Representante Legal / Padre de Familia<br/>[Tutor legal responsable ante MINEDUC]"]
        D["Docente / Mentor / Pastor<br/>[Guía socrático y evaluador formativo]"]
        A["Administrador del Sistema<br/>[Gestor de programas y auditoría LOPDP]"]
    end

    subgraph Sistema_ALSIZ["Sistema Central ALSIZ"]
        ALSIZ["Plataforma Educativa ALSIZ<br/>(LMS Integral, Tutoría IA y Discipulado)"]
    end

    subgraph Externos["Servicios y Entidades Externas"]
        MINEDUC["Ministerio de Educación de Ecuador<br/>(Acreditación por Evaluaciones de Subnivel)"]
        SOF["Escuela Sombrilla Internacional (EE. UU.)<br/>(Apostilla y Homologación SASRE)"]
        LLM_DS["DeepSeek API<br/>(Modelo Primario Socrático / Razonamiento)"]
        LLM_GEM["Google Gemini API<br/>(Embeddings y Modelo Secundario Multimodal)"]
        LLM_OR["OpenRouter API<br/>(Proveedor Fallback de Respaldo)"]
        STORE["Almacenamiento Seguro S3 / R2<br/>(Archivos privados y guías didácticas)"]
    end

    E -->|"Accede a clases, laboratorios, resuelve quizzes y conversa con tutor IA"| ALSIZ
    R -->|"Supervisa avance, aprueba consentimientos LOPDP y descarga bitácoras"| ALSIZ
    D -->|"Revisa proyectos, califica evidencias y modera tutoría"| ALSIZ
    A -->|"Gestiona catálogo, usuarios, llaves y audita accesos"| ALSIZ

    ALSIZ -->|"Genera bitácoras alineadas a destrezas oficiales"| MINEDUC
    ALSIZ -->|"Exporta récords académicos para convalidación"| SOF
    ALSIZ -->|"Genera inferencias socráticas y evalúa tareas"| LLM_DS
    ALSIZ -->|"Genera embeddings semánticos y visión multimodal"| LLM_GEM
    ALSIZ -->|"Conmutación automática ante caída de cuota"| LLM_OR
    ALSIZ -->|"Almacena evidencias y guías cifradas"| STORE
```

---

## 3. Diagrama C4 — Nivel 2: Contenedores del Sistema

El diagrama de contenedores describe las aplicaciones de alto nivel, bases de datos y almacenes de datos que conforman la solución técnica.

```mermaid
flowchart TB
    subgraph Cliente["Navegador del Usuario (Dispositivos Móviles, Tablets, Escritorio)"]
        SPA["Single Page Application (SPA)<br/>[React 19, TypeScript, Vite, Tailwind CSS]<br/>Interfaz socrática, visor de clases, quizzes y estado offline"]
        SW["Service Worker / Cache Storage<br/>[PWA Cache & Local Storage]<br/>Almacén temporal de progreso offline y guías PDF"]
        SPA <--> SW
    end

    subgraph Servidor["Servidor de Aplicación ALSIZ (Node.js / Express Modular)"]
        API["API Gateway & Middleware de Seguridad<br/>[Express 4 + Helmet + CORS + RateLimit]<br/>Autenticación JWT HttpOnly, validación Zod y RBAC"]
        
        subgraph Modulos_Servicio["Módulos de Servicio del Backend"]
            MOD_AUTH["Módulo de Identidad y Permisos"]
            MOD_CURR["Módulo Curricular y LMS"]
            MOD_EVAL["Módulo de Evaluación y Evidencias"]
            MOD_AI["Orquestador Multi-Agente e IA"]
            MOD_RAG["Motor de Indexación Semántica (RAG)"]
            MOD_AUDIT["Módulo de Auditoría y Cumplimiento"]
        end

        API --> MOD_AUTH & MOD_CURR & MOD_EVAL & MOD_AI & MOD_RAG & MOD_AUDIT
    end

    subgraph Persistencia["Capa de Persistencia de Datos"]
        DB[(Base de Datos Relacional<br/>[PostgreSQL 16 / SQLite en dev]<br/>Expedientes, matrículas, notas, auditoría)]
        VEC[(Almacén Vectorial<br/>[pgvector / HNSW Memory Index]<br/>Embeddings de las 7 clases Ekballo y currículo)]
        OBJ[(Almacenamiento de Objetos Seguro<br/>[S3 / Cloudflare R2 privado]<br/>PDFs de guías, evidencias de alumnos cifradas)]
    end

    subgraph Proveedores_IA["Servicios Externos de Inteligencia Artificial"]
        P_DEEPSEEK["DeepSeek V3 / R1 (Chat socrático y código)"]
        P_GEMINI["Google Gemini 2.0 Flash / Text-Embedding-004"]
        P_OPENROUTER["OpenRouter (Fallback multi-modelo)"]
    end

    SPA -->|"HTTPS / JSON REST API<br/>(Cookies HttpOnly seguras)"| API
    MOD_AUTH & MOD_CURR & MOD_EVAL & MOD_AUDIT -->|"SQL / ORM Seguro (Prisma / Drizzle)"| DB
    MOD_RAG -->|"Consultas vectoriales similitud coseno"| VEC
    MOD_EVAL & MOD_CURR -->|"URLs firmadas temporales (Presigned URLs)"| OBJ
    MOD_AI -->|"Inferencia HTTPS con Circuit Breaker"| P_DEEPSEEK & P_GEMINI & P_OPENROUTER
```

---

## 4. Diagrama C4 — Nivel 3: Componentes del Backend Modular

Desglose de los componentes internos de la capa de backend de ALSIZ:

```mermaid
flowchart LR
    subgraph Gateway["Capa de Entrada y Seguridad"]
        RTR["Express Router"]
        AUTH_MW["Auth & Session Middleware (JWT)"]
        ROLE_MW["RBAC Middleware (Verificación de Roles)"]
        VAL_MW["Zod Validation Middleware"]
        AUDIT_MW["Audit Trail Interceptor"]
    end

    subgraph Controladores["Controladores de Módulos"]
        C_AUTH["AuthController"]
        C_STUDENT["StudentController"]
        C_CURR["CurriculumController"]
        C_EVAL["EvaluationController"]
        C_AI["AgentChatController"]
        C_REPORT["ReportController"]
    end

    subgraph Servicios_Negocio["Servicios de Negocio"]
        S_AUTH["AuthService (Bcrypt, JWT)"]
        S_STUDENT["StudentService (Gestión familiar)"]
        S_CURR["CurriculumService (K-12 & Ekballo)"]
        S_EVAL["EvaluationService (Rúbricas & Portafolio)"]
        S_AGENT["AgentOrchestratorService"]
        S_RAG["RagEngineService (Chunking & Búsqueda)"]
        S_AUDIT["AuditLogService (Inmutable)"]
    end

    subgraph Integracion["Adaptadores e Infraestructura"]
        ADAPT_DB["DatabaseRepository (Drizzle/Prisma)"]
        ADAPT_LLM["LLMCascadeProvider (DeepSeek/Gemini/OpenRouter)"]
        ADAPT_S3["StorageProvider (S3/R2 Presigned)"]
    end

    RTR --> AUTH_MW --> ROLE_MW --> VAL_MW --> AUDIT_MW
    AUDIT_MW --> C_AUTH & C_STUDENT & C_CURR & C_EVAL & C_AI & C_REPORT

    C_AUTH --> S_AUTH
    C_STUDENT --> S_STUDENT
    C_CURR --> S_CURR
    C_EVAL --> S_EVAL
    C_AI --> S_AGENT
    C_REPORT --> S_CURR & S_EVAL

    S_AGENT --> S_RAG
    S_AGENT --> ADAPT_LLM
    S_RAG --> ADAPT_DB
    S_STUDENT & S_CURR & S_EVAL & S_AUTH & S_AUDIT --> ADAPT_DB
    S_EVAL --> ADAPT_S3
```

---

## 5. Procesamiento Asíncrono y Tolerancia a Fallos

```mermaid
sequenceDiagram
    autonumber
    actor Alumno as Estudiante (Tablet / Web)
    participant Client as Frontend SPA (React)
    participant API as Backend (Express)
    participant Orch as Agent Orchestrator
    participant RAG as RAG Semantic Search
    participant LLM_P as Proveedor Primario (DeepSeek)
    participant LLM_S as Proveedor Secundario (Gemini)

    Alumno->>Client: Envía pregunta socrática o entrega tarea
    Client->>API: POST /api/agents/chat (Session Cookie + Payload)
    API->>API: Valida token, rol y sanitiza texto (Zod)
    API->>Orch: Dispatch a Tutor Socrático
    Orch->>RAG: Buscar fragmentos doctrinales relevantes
    RAG-->>Orch: Retorna chunks con citas oficiales [S1-C3-P12]
    
    Orch->>LLM_P: Prompt enriquecido con directivas pedagógicas
    alt Proveedor Primario responde exitosamente
        LLM_P-->>Orch: Respuesta socrática con preguntas guía
    else Proveedor Primario falla o agota cuota (Timeout / 429)
        Orch->>Orch: Registra degradación en circuito
        Orch->>LLM_S: Reintento inmediato a Gemini 2.0 Flash
        LLM_S-->>Orch: Respuesta socrática alternativa
    end
    
    Orch->>API: Respuesta validada y libre de alucinaciones
    API->>API: Registra evento en bitácora de auditoría
    API-->>Client: 200 OK con texto, citas y sugerencias
    Client-->>Alumno: Renderiza mensaje y actualiza estado
```

---

## 6. Justificación Técnica de Migraciones Propuestas

| Componente Actual (Wisdom School) | Componente Destino (ALSIZ) | Justificación Técnica y de Negocio |
| :--- | :--- | :--- |
| **`localStorage` exclusivo** | **Base de Datos Relacional (PostgreSQL / SQLite) + Sync Local** | `localStorage` tiene límite de 5 MB, se borra al limpiar caché y no permite acceso multi-dispositivo ni supervisión remota de los representantes legales. La BD relacional garantiza integridad referencial, seguridad LOPDP y trazabilidad para el MINEDUC. |
| **Llamadas directas de IA desde el cliente** (`aiService.ts` con fallback `VITE_*`) | **Orquestador Centralizado en Backend** (`/api/agents/chat`) | Impedir la fuga de credenciales API en el bundle JavaScript del navegador (vulnerabilidad crítica de seguridad), implementar *rate-limiting* por usuario y aplicar políticas de contención de costes. |
| **Bypass de autenticación por ID** (`cleanId === found.id`) | **Autenticación robusta con Argon2 / Bcrypt + Tokens JWT HttpOnly** | Cerrar la brecha de acceso no autorizado, cumplir con la LOPDP en datos de menores y permitir sesiones independientes para padres, docentes y alumnos. |
| **Imágenes estáticas públicas** en `/public/students/` | **Almacenamiento de Objetos Cifrado con URLs Firmadas** | Los rostros y datos de menores de edad son categorías especiales protegidas por el Art. 22 de la LOPDP; no pueden servirse de forma pública e indexable en internet. |

