# ADR-001: Adopción de Arquitectura Híbrida SPA React + Backend Modular en Node.js/Express

- **Estado**: Aprobado
- **Fecha**: 2026-10-16
- **Autores**: Antigravity / Liderazgo Técnico ALSIZ
- **Contexto**:
  El repositorio base heredado de Wisdom School opera como una Single Page Application (SPA) construida en React 19, TypeScript y Vite, con un backend Express incipiente que solo maneja un endpoint de chat IA. La persistencia actual reside en `localStorage`, lo que genera riesgos severos de pérdida de datos por limpieza de caché y no permite supervisión de padres ni sincronización multidispositivo.
- **Alternativas Evaluadas**:
  1. *Migración Total a Next.js / OpenMAIC*: Implicaba descartar la SPA actual y reescribir la interfaz para un entorno server-side rendering (SSR), introduciendo dependencias pesadas de PostgreSQL 16 y destruyendo la fluidez táctil optimizada para iPads.
  2. *Mantener solo Frontend con BaaS (Firebase / Supabase puro directo desde el cliente)*: Expondría lógica sensible en el navegador y complicaría la orquestación de la cascada multi-proveedor de IA y la generación de guías PDF.
  3. *Arquitectura Híbrida Evolutiva (Elegida)*: Mantener la SPA en React 19 desacoplada, potenciando el backend en Express 4 como una API REST modular con persistencia relacional y orquestación segura.
- **Decisión**:
  Adoptar una **Arquitectura Híbrida**: preservar el cliente SPA en React 19 (con capacidades offline vía Service Worker y PWA Cache) conectado mediante API REST versionada (`/api/v1`) a un backend modular en Node.js/Express.
- **Consecuencias**:
  - *Positivas*: Se preserva el 100% de los componentes visuales táctiles existentes; se desacopla la seguridad y persistencia; se mantiene compatibilidad dual con despliegues serverless (Vercel) o contenedores Docker.
  - *Negativas*: Requiere mantener dos capas de despliegue coordinadas (build de frontend y bundle de servidor con esbuild).

