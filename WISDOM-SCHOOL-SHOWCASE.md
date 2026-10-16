# Wisdom School — Educación Virtual con Inteligencia Artificial

## ¿Qué es Wisdom School?

**Wisdom School** es un colegio virtual inteligente diseñado para transformar la educación en casa. Nacido de la necesidad real de dos estudiantes —Avril (12 años) y Gael (8 años)—, el sistema entrega una experiencia educativa completa, personalizada y alineada al currículo oficial del Ministerio de Educación del Ecuador, potenciada por inteligencia artificial de última generación.

No es una plataforma de videos pregrabados ni un LMS genérico. Wisdom School reemplaza el aula tradicional con **tutores de IA que enseñan con el método socrático**: no dan respuestas, guían al estudiante con preguntas, pistas y analogías hasta que descubre el conocimiento por sí mismo.

---

## Funcionalidades principales

### Tutores de IA con personalidad propia
Cada materia tiene un profesor de IA con identidad y estilo pedagógico únicos. La Dra. Sophia Euler para Matemáticas, el Prof. Gabriel Neruda para Lengua, Teacher Emma para Inglés, y así con cada una de las 11 materias. El tutor contextualiza cada conversación al tema, objetivo y lectura del día. Nunca se sale del tema académico. Nunca da respuestas directas. Siempre guía con el método socrático.

### Clases diarias estructuradas
Cada día escolar presenta las materias correspondientes con contenido completo: unidad, tema, objetivo, introducción, lectura, preguntas socráticas, recursos multimedia verificados (simuladores PhET, videos educativos), actividades y tareas. Todo organizado en un flujo de cuatro fases: contenido → laboratorio → taller → evidencia.

### Micro-lecciones interactivas generadas por IA
Dentro de cada clase, la IA genera lecciones progresivas en porciones pequeñas —teoría, analogías cotidianas, ejemplos y quizzes de opción múltiple— que el estudiante recorre a su propio ritmo. Si se equivoca, la IA reformula la explicación con una analogía nueva sin revelar la respuesta.

### Guías didácticas imprimibles
Un solo clic genera una guía de estudio de una página con explicación y preguntas de tres niveles (literal, interpretativa, aplicación), adaptada al grado del estudiante y lista para imprimir. Perfecta para repasar lejos de la pantalla.

### Voz del profesor con tecnología neuronal
El tutor de IA **habla de verdad**. Usando voces neuronales de Google Cloud Text-to-Speech, cada profesor tiene su propia voz según su género y personalidad. El estudiante escucha las explicaciones, no solo las lee.

### Análisis de trabajos y retroalimentación formativa
El estudiante sube sus trabajos —texto o fotos— y la IA los analiza al instante: identifica fortalezas, señala errores, explica la corrección y ofrece recomendaciones personalizadas. Retroalimentación real, inmediata y constructiva.

### Progreso en tiempo real
Dashboard con porcentaje de avance por materia, clases completadas, actividades marcadas y ruta de micro-lecciones. Todo visible para el estudiante y sus padres en cualquier momento.

### Experiencia temática por estudiante
Cada estudiante vive su propio mundo visual: Avril en el universo Peanuts/Snoopy, Gael en el mundo de Mario. La experiencia es coherente, inmersiva y adaptada a su edad e intereses.

### Acceso multidispositivo
Funciona en computadora, tableta y celular. Navegación adaptada con barra inferior en móviles, gestos táctiles, y botón de retroceso por hardware en Android. Experiencia nativa sin necesidad de instalar nada.

### Horario escolar visual
Calendario del año lectivo completo con horario semanal codificado por colores, recreos y franjas horarias. El sistema avanza automáticamente semana a semana según el calendario escolar oficial.

---

## Tecnología utilizada

Wisdom School está construido sobre una arquitectura moderna, robusta y escalable:

| Capa | Tecnología |
|---|---|
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS |
| **Backend** | Node.js, Express, TypeScript |
| **Infraestructura** | Vercel (serverless + static hosting) |
| **Inteligencia Artificial** | DeepSeek, OpenRouter, Google Gemini — cascada multicapa con tolerancia a fallos |
| **Voz neuronal** | Google Cloud Text-to-Speech (voces Neural2) |
| **Correo electrónico** | Nodemailer — envío de credenciales y notificaciones |
| **Persistencia** | Almacenamiento local con sincronización de estado |
| **Despliegue** | Integración continua con Vercel, build automatizado con esbuild |

La arquitectura de IA es **resiliente por diseño**: si un proveedor falla, el sistema escala automáticamente al siguiente —DeepSeek → OpenRouter → Gemini— garantizando que el estudiante nunca se quede sin su tutor, incluso en condiciones de alta demanda o cortes de servicio.

---

## Flujo de trabajo diario

Así es un día típico en Wisdom School:

1. **Inicio de sesión** — El estudiante ingresa con su correo y PIN. El sistema carga su perfil, configuración, progreso y horario del día.

2. **Panel principal** — Ve su devocional del día, el horario, las materias programadas, el proyecto integrador del trimestre y su progreso general. Con un toque abre el chat del tutor de IA para consultar cualquier duda.

3. **Clase del día** — Entra a una materia. El sistema despliega el contenido en cuatro fases:
   - **Contenido**: tema, objetivo, introducción y lectura del día.
   - **Laboratorio**: simulador interactivo (PhET), video educativo narrado, recursos verificados.
   - **Taller**: micro-lecciones generadas por IA con quizzes. El estudiante responde y recibe retroalimentación inmediata.
   - **Evidencia**: actividades para completar, tarea asignada y espacio para subir trabajos.

4. **Tutor socrático** — En cualquier momento, el estudiante abre el chat contextual. El tutor de IA conoce exactamente el tema, la lectura y las actividades del día. Guía con preguntas, nunca con respuestas.

5. **Guía imprimible** — Al finalizar, genera la guía didáctica en PDF con un clic. La explicación y las preguntas están ancladas al contenido exacto que el tutor usó durante la clase.

6. **Progreso y cierre** — El sistema marca automáticamente las actividades completadas y actualiza el porcentaje de avance. El estudiante ve su evolución en tiempo real.

---

## ¿Por qué Wisdom School es diferente?

**No es un chatbot genérico con capa educativa.** Es un sistema diseñado desde cero para replicar —y mejorar— la experiencia de un colegio presencial. Cada componente —desde el calendario escolar hasta la voz del profesor, desde las guías imprimibles hasta los quizzes progresivos— existe porque resuelve una necesidad real de dos estudiantes que lo usan a diario.

**No depende de un solo proveedor de IA.** La cascada de modelos garantiza disponibilidad 24/7. Si DeepSeek no responde, OpenRouter toma el relevo. Si OpenRouter falla, Gemini cierra la cadena. El estudiante nunca ve un error: solo ve a su profesor.

**Está alineado al currículo oficial.** No es contenido genérico. Las 492 unidades de micro-currículo, las 43 clases diarias y los 11 perfiles docentes de IA están construidos sobre el plan de estudios del Ministerio de Educación del Ecuador — Actualización y Fortalecimiento Curricular.

**Funciona sin instalar nada.** Es una aplicación web progresiva. Abre el navegador, inicia sesión, aprende. Funciona en cualquier dispositivo con conexión a internet.

---

## ¿Quieres una solución como Wisdom School para tu institución?

En **AliszTech** diseñamos y desarrollamos plataformas educativas a la medida, combinando inteligencia artificial, diseño pedagógico y tecnología de punta para crear experiencias de aprendizaje que funcionan de verdad.

**Lo que podemos construir para ti:**

- Plataformas educativas virtuales con tutores de IA personalizados por materia
- Sistemas de micro-aprendizaje con quizzes adaptativos y retroalimentación instantánea
- Colegios virtuales completos con horarios, calificaciones, portafolio y progreso
- Integración con currículos oficiales de cualquier país
- Guías didácticas generadas por IA y listas para imprimir
- Voces neuronales multilingües para narración de contenidos
- Análisis automatizado de trabajos y tareas con IA multimodal
- Aulas virtuales temáticas con experiencias visuales inmersivas
- Dashboards de progreso para estudiantes, padres y administradores
- Infraestructura tolerante a fallos con múltiples proveedores de IA

**No importa el tamaño de tu proyecto.** Desde un tutor de IA para una materia específica hasta un colegio virtual completo con decenas de materias y cientos de estudiantes: tenemos la experiencia técnica y pedagógica para hacerlo realidad.

---

**Contáctanos y transformemos juntos la educación.**

AliszTech — Tecnología que enseña.