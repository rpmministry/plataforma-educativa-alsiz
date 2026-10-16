# ADR-005: Cumplimiento LOPDP: Minimización de Datos de Menores y Eliminación de Activos Estáticos Públicos

- **Estado**: Aprobado
- **Fecha**: 2026-10-16
- **Autores**: Antigravity / Liderazgo Técnico ALSIZ
- **Contexto**:
  En la auditoría de línea base (Etapas 00 y 02), se identificó que la carpeta `public/students/` contenía fotografías y archivos con nombres reales de estudiantes menores de edad servidos de forma estática y pública sin autenticación por el servidor web (`server.ts:97`). Esto contraviene frontalmente el Artículo 22 de la Ley Orgánica de Protección de Datos Personales del Ecuador (LOPDP), que categoriza los datos de niños y adolescentes como una categoría especial sujeta a tutela reforzada y confidencialidad estricta.
- **Alternativas Evaluadas**:
  1. *Dejar las imágenes en `public/` ofuscando el nombre de archivo*: Insuficiente ante la ley; cualquier persona que adivine o capture el enlace tendría acceso al rostro del menor sin control de acceso.
  2. *Proteger la carpeta `public/` con basic auth de servidor*: Inflexible y no permite diferenciar permisos entre padres de familia de distintos estudiantes.
  3. *Eliminación de Activos Públicos y Uso de Almacenamiento Privado con URLs Firmadas (Elegida)*: Retirar todas las fotos reales de menores del repositorio web público; sustituirlas por avatares vectoriales ilustrados en la interfaz y almacenar las evidencias personales en cubos de almacenamiento privados accesibles solo vía URLs firmadas con expiración de 15 minutos.
- **Decisión**:
  1. Purgar y eliminar permanentemente las fotos reales de menores de `public/students/`.
  2. Implementar avatares ilustrados personalizables como representación por defecto de los estudiantes.
  3. Toda evidencia académica, entrega de tarea o fotografía subida por el estudiante se guardará en almacenamiento privado (S3 / Cloudflare R2), con acceso restringido a su representante legal y profesores mediante URLs firmadas con expiración temporal.
- **Consecuencias**:
  - *Positivas*: Cumplimiento estricto de la LOPDP; eliminación del riesgo legal de exposición de menores; resguardo ético institucional de Ekballo Church.
  - *Negativas*: Las imágenes no se sirven directamente desde CDN público; requieren una llamada previa a la API para obtener el enlace temporal firmado.

