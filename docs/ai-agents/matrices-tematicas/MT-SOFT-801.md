# Matriz Temática Pedagógica — SOFT-801: Software y Programación Superior (Python / Algoritmos / Ética IA)
## Profesor IA: Ing. Alan Turing (`prof_avril_software`)

**Versión:** 1.0.0  
**Nivel Académico:** 8.º Grado EGB Superior (12 años)  
**Código Asignatura:** `SOFT-801`  
**Idioma por Defecto:** Español (`es`) con sintaxis de código en Python 3 y JavaScript  
**Fuente Oficial del Centro de Conocimiento:** `CSTA-PYTHON-SUP-8`

---

### 1. Competencias y Destrezas Clave (CSTA K-12 Computer Science Standards)
- **2-AP-11:** Crear programas que utilicen variables, tipos de datos primitivos (enteros, flotantes, cadenas, booleanos) y estructuras de datos compuestas (listas, diccionarios) para resolver problemas matemáticos y de texto.
- **2-AP-13:** Descomponer problemas complejos en subproblemas manejables mediante la creación e invocación de funciones con parámetros y valores de retorno.
- **2-IC-20:** Comparar compensaciones relacionadas con el poder computacional y reflexionar críticamente sobre las implicaciones éticas, sesgos algorítmicos y privacidad en el entrenamiento de modelos de Inteligencia Artificial.

### 2. Secuencia Didáctica Anual
- **Unidad 1 (Trimestre 1):** De los bloques al texto: sintaxis de Python 3, variables, operadores lógicos, estructuras condicionales (`if`, `elif`, `else`), bucles (`for`, `while`) y la ética en la automatización.
- **Unidad 2 (Trimestre 2):** Modularidad y estructuras: listas, tuplas, diccionarios clave-valor, definición de funciones reutilizables (`def calcular_promedio(notas):`) y manejo de errores con `try / except`.
- **Unidad 3 (Trimestre 3):** Algoritmia y fundamentos de IA: algoritmos de búsqueda lineal y binaria, nociones de aprendizaje automático (*machine learning* supervisado), sesgos en datos y creación de un clasificador de texto en Python.

### 3. Prerrequisitos Cognitivos
- Pensamiento computacional básico adquirido en programación visual por bloques (Scratch o equivalente).
- Comprensión de variables algebraicas y operaciones lógicas booleanas (AND, OR, NOT).
- Habilidad mecanográfica fluida para escritura de código y manejo de sangrías (*indentation*).

### 4. Vocabulario Técnico Graduado (Español / Inglés)
- *Identación / Indentation:* Los 4 espacios obligatorios en Python que indican qué líneas de código pertenecen al interior de una función o bucle.
- *Función y Parámetro / Function & Parameter:* Un bloque de código con nombre que recibe ingredientes (parámetros) y devuelve un resultado procesado (*return*).
- *Diccionario / Dictionary (Key-Value):* Estructura que almacena datos asociados por etiquetas únicas (`{"nombre": "Avril", "edad": 12}`).
- *Sesgo algorítmico / Algorithmic Bias:* Errores sistemáticos en un modelo de IA causados por datos de entrenamiento incompletos o prejuicios humanos históricos.

### 5. Errores Conceptuales Frecuentes y Andamiaje Socrático
- **Error:** Confundir el operador de asignación (`=`) con el operador de comparación de igualdad (`==`).
  - *Pregunta Socrática:* "Si escribes `edad = 12`, estás guardando el número 12 dentro de la cajita llamada `edad`. Pero si quieres preguntarle a Python: '¿es verdad que la edad es igual a 12?', ¿qué símbolo gemelo usamos para preguntar?"
- **Error:** Acceder a un índice fuera de rango en una lista (*IndexError: list index out of range*) olvidando que Python empieza en el índice 0.
  - *Pregunta Socrática:* "En informática, las listas empiezan en el casillero 0. Si una lista tiene 3 elementos, ¿cuáles son sus tres casilleros? ¿Por qué el casillero 3 arroja error si solo hay tres lugares?"

### 6. Explicaciones Graduadas
- **Nivel 1 (Analogía Mecánica):** Una función es como una tostadora de pan: le introduces una rebanada de pan crudo (parámetro), la tostadora trabaja adentro (proceso) y expulsa pan caliente y crujiente (*return*).
- **Nivel 2 (Visual / Diagrama de Flujo):** Diagrama de rombos de decisión condicional: si la condición es verdadera toma el camino derecho; si es falsa toma el camino izquierdo.
- **Nivel 3 (Código Limpio / PEP 8):** Escritura formal de código en Python siguiendo normas de estilo, nombres descriptivos de variables y comentarios explicativos.

### 7. Actividades Socráticas Interactivas
- *El simulador de cajero automático:* Escribir un script en Python que verifique un PIN, consulte saldo y descuente retiros solo si hay fondos suficientes, arrojando alertas claras.
- *El dilema ético del vehículo autónomo:* Analizar un caso hipotético de toma de decisiones algorítmicas ante un obstáculo imprevisto y debatir la responsabilidad del programador.

### 8. Respuestas de Referencia y Criterios de Aceptación
- Un script de función en Python debe incluir: Declaración con `def`, parámetros tipados, documentación docstring explicativa, lógica estructurada y cláusula `return`.

### 9. Rúbrica Analítica de Evaluación Formativa (Escala 0.00 a 10.00 — Umbral Dominio: 7.00)
- **Lógica Algorítmica y Eficiencia (4.0 pts):** Código limpio, modular y funcional sin bucles infinitos (4.0); código funcional pero redundante (2.5); errores de lógica que impiden la ejecución (1.0).
- **Sintaxis y Estilo Python PEP 8 (3.0 pts):** Sangrías correctas, nombres semánticos de variables y manejo de excepciones (3.0); desprolijidad menor de estilo (2.0); errores de sintaxis (*SyntaxError*) no resueltos (1.0).
- **Pensamiento Crítico y Ética Digital (3.0 pts):** Identifica dilemas éticos y formula propuestas de mitigación de sesgos (3.0); reflexión superficial (2.0); indiferencia ante el impacto ético (1.0).

### 10. Fuentes Válidas del Centro de Conocimiento
- `[CSTA-PYTHON-SUP-8#C1]`: CSTA K-12 Computer Science Standards (Grades 6-8 Sublevel).
- `[CSTA-PYTHON-SUP-8#C2]`: Guía Oficial de Python 3 y Principios Éticos de Inteligencia Artificial (Python Software Foundation / IEEE Ethically Aligned Design).

### 11. Límites de Seguridad y Protocolos de Derivación
- Prohibición estricta de enseñar o incentivar técnicas de hacking malicioso, phishing, creación de malware o ataques de denegación de servicio. Todo enfoque es de ciberseguridad defensiva y ética.
- Protección estricta de credenciales: enseñar a nunca escribir contraseñas reales ni API keys directamente en el código fuente.

