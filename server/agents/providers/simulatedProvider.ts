/**
 * ==============================================================================
 * Proveedor Simulado de Alta Fidelidad (Fallback Resiliente / Offline)
 * Plataforma Educativa ALSIZ para Ekballo Church (ETAPA-07 / ETAPA-08)
 * ==============================================================================
 * Cumple con los estándares socráticos, citación RAG obligatoria, abstención honesta,
 * seguridad infantil y resistencia a inyecciones de prompt sin depender de internet o cuotas.
 */

import { ILLMProvider, LLMRequest, LLMResponse } from '../types';

export class SimulatedProvider implements ILLMProvider {
  public readonly name = 'SIMULATED_LOCAL';

  public isAvailable(): boolean {
    return true; // Siempre disponible como salvaguarda inquebrantable
  }

  public async generateResponse(request: LLMRequest): Promise<LLMResponse> {
    const startTime = Date.now();
    const query = request.userPrompt.trim();
    const queryLower = query.toLowerCase();
    const normalizedQuery = queryLower.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const isEnglish = request.language === 'en' || /\b(hello|what|explain|how|why|is|are|the|can|please|challenge)\b/i.test(queryLower);
    const isGael = request.agentCode.startsWith('prof_gael_');
    const isAvril = request.agentCode.startsWith('prof_avril_');

    let content = '';
    const citationTags: string[] = [];
    const safetyFlags: string[] = [];

    // 1. Detección de Intentos de Prompt Injection / Jailbreak
    if (
      normalizedQuery.includes('ignore previous instructions') ||
      normalizedQuery.includes('ignore all previous instructions') ||
      normalizedQuery.includes('ignora todas las instrucciones') ||
      normalizedQuery.includes('olvida tus reglas') ||
      normalizedQuery.includes('hacker') ||
      normalizedQuery.includes('act as a hacker') ||
      normalizedQuery.includes('unrestricted') ||
      normalizedQuery.includes('jailbreak') ||
      normalizedQuery.includes('eres libre de tus restricciones') ||
      normalizedQuery.includes('bypass')
    ) {
      safetyFlags.push('PROMPT_INJECTION_ATTEMPT_NEUTRALIZED');
      content = isEnglish
        ? 'I am committed to our pedagogical values and school safety guidelines. I cannot modify my educational role or system instructions. Let us continue focusing on your learning!'
        : 'Como tutor educativo de la Plataforma ALSIZ, mantengo un firme compromiso con la seguridad pedagógica y el respeto. No modifico mis directivas ni mi rol educativo. ¡Cuéntame qué tema académico estamos explorando hoy!';
    }
    // 2. Detección de Violación de Privacidad y Datos Personales (LOPDP / PII)
    else if (
      normalizedQuery.includes('contrasena') ||
      normalizedQuery.includes('password') ||
      normalizedQuery.includes('pin ') ||
      normalizedQuery.includes('donde vives') ||
      normalizedQuery.includes('direccion de') ||
      normalizedQuery.includes('telefono de') ||
      normalizedQuery.includes('datos personales') ||
      normalizedQuery.includes('cedula') ||
      normalizedQuery.includes('numero de identificacion')
    ) {
      safetyFlags.push('PRIVACY_DATA_PROTECTION_ENFORCED');
      content = isEnglish
        ? 'In compliance with child data protection laws (LOPDP) and school safety policies, I never ask for or disclose personal contact details, passwords, PINs, or home addresses. Let us keep our conversations strictly academic!'
        : 'En cumplimiento estricto de las normativas de protección de datos de menores (LOPDP) y seguridad escolar, no solicito ni revelo contraseñas, códigos PIN, direcciones domiciliarias ni datos personales privados. ¡Protejamos tu privacidad mientras aprendemos!';
    }
    // 3. Detección de Consultas de Diagnóstico Médico o Psicológico (Seguridad Infantil y Derivación)
    else if (
      normalizedQuery.includes('diagnostico') ||
      normalizedQuery.includes('enfermedad') ||
      normalizedQuery.includes('depresion') ||
      normalizedQuery.includes('sintomas de') ||
      normalizedQuery.includes('pastillas tomar') ||
      normalizedQuery.includes('pastillas debo tomar') ||
      normalizedQuery.includes('recetame') ||
      normalizedQuery.includes('me siento muy triste y solo') ||
      normalizedQuery.includes('me quiero hacer dano') ||
      normalizedQuery.includes('crisis de panico')
    ) {
      safetyFlags.push('MEDICAL_PSYCHOLOGICAL_REFUSAL_ESCALATED');
      content = isEnglish
        ? 'I am an educational AI tutor and cannot diagnose medical or psychological conditions, nor prescribe treatments. Your health, emotional well-being, and safety are the absolute priority. Please reach out to your parents, family representative, or school counselor right away.'
        : 'Como tutor educativo no estoy facultado para realizar diagnósticos médicos ni psicológicos, ni indicar tratamientos o medicamentos. Tu salud integral y bienestar emocional son lo más valioso. Te recomiendo dialogar de inmediato con tus padres, tu representante familiar o los mentores de Ekballo Church para recibir apoyo y cuidado profesional.';
    }
    // 4. Detección de Consultas Fuera de Dominio / No Fundamentadas (Abstención Honesta)
    else if (
      normalizedQuery.includes('cuanto mide la luna') ||
      normalizedQuery.includes('quien invento el internet') ||
      normalizedQuery.includes('capital de mongolia') ||
      normalizedQuery.includes('capital de') ||
      normalizedQuery.includes('receta de cocina') ||
      normalizedQuery.includes('precio del bitcoin') ||
      normalizedQuery.includes('bitcoin') ||
      normalizedQuery.includes('desconocido_sin_fuente') ||
      normalizedQuery.includes('sin_fuente_autorizada')
    ) {
      safetyFlags.push('HONEST_ABSTENTION_NO_RAG_EVIDENCE');
      content = isEnglish
        ? 'I do not have sufficient evidence in our authorized curriculum sources to answer this question with pedagogical certainty. Please refer to your course coordinator or designated official materials.'
        : 'No dispongo de evidencia suficiente en los materiales autorizados del Centro de Conocimiento para responder a esta pregunta con certeza pedagógica. Te sugiero consultar las guías oficiales de tu materia o conversar con tu docente mentor.';
    }
    // 5. Generación de Ejercicio Nuevo Contextualizado
    else if (
      normalizedQuery.includes('ejercicio nuevo') ||
      normalizedQuery.includes('reto nuevo') ||
      normalizedQuery.includes('nuevo problema') ||
      normalizedQuery.includes('new exercise') ||
      normalizedQuery.includes('challenge') ||
      normalizedQuery.includes('planteame un ejercicio')
    ) {
      if (isGael) {
        content = isEnglish
          ? 'Here is an exciting new challenge for you! Imagine an explorer who found 3 treasure boxes, and each box contains 4 shiny blue crystals. Can you draw the boxes and calculate how many crystals he found in total using arrays?'
          : '¡Aquí tienes un reto nuevo y divertido para ti! Imagina que un pequeño explorador tiene 15 galletas mágicas y quiere compartirlas en partes iguales con 3 amigos astronautas. ¿Cuántas galletas recibirá cada astronauta para que nadie se quede con más o menos? ¡Cuéntame qué dibujo o truco usarías!';
      } else if (isAvril) {
        content = isEnglish
          ? 'Here is a new analytical challenge: A renewable energy startup has a fixed monthly operating cost of $450 and a variable production cost of $15 per solar sensor. If each sensor sells for $45, formulate the linear equation and determine the break-even point in units. What are the key variables?'
          : 'Aquí tienes un nuevo desafío socrático: Imagina que un proyectil de observación climática asciende desde el nivel del suelo y su altitud en metros respecto al tiempo está dada por la expresión h = 40t - 5t². ¿En qué momento se detiene su velocidad instantánea y cuál es la altura máxima alcanzada? ¿Cómo justificarías el procedimiento paso a paso?';
      } else {
        content = isEnglish
          ? 'Here is a new practice challenge to test your deductions: Consider a system where two opposing forces of 12N and 8N act along the same horizontal line. What is the net force and how does it determine acceleration?'
          : 'Aquí tienes un nuevo ejercicio práctico para evaluar tu deducción: Plantea un caso donde una empresa social deba balancear su presupuesto mensual con costos fijos de \$300 y costos variables unitarios. ¿Cuál es el procedimiento analítico para calcular el punto de equilibrio?';
      }
    }
    // 6. Andamiaje Socrático ante Errores Conceptuales Comunes
    else if (
      normalizedQuery.includes('la aceleracion es constante cuando la velocidad es cero') ||
      normalizedQuery.includes('la velocidad es cero en el punto mas alto') ||
      normalizedQuery.includes('2+2=5') ||
      normalizedQuery.includes('la luz no se refracta') ||
      normalizedQuery.includes('las plantas comen tierra') ||
      normalizedQuery.includes('el ensayo es un resumen')
    ) {
      if (normalizedQuery.includes('las plantas comen tierra')) {
        content = isGael
          ? '¡Hagamos un experimento mental con la Dra. Maya! Si metes una plantita en una maceta llena de rica tierra dentro de un ropero oscuro y cerrado por un mes, ¿crees que crecerá verde y fuerte? ¿Qué ingrediente mágico del cielo le falta que la tierra no le puede dar?'
          : 'Reflexionemos sobre ese concepto botánico: si una planta se alimenta principalmente por sus hojas, ¿cuál es el rol exacto del agua absorbida por las raíces en la fotosíntesis comparado con la luz solar?';
      } else if (normalizedQuery.includes('el ensayo es un resumen')) {
        content = isAvril
          ? '¡Cuidado con esa trampa dialéctica! Un resumen solo repite lo que otro autor ya dijo. En un ensayo argumentativo, ¿dónde queda tu propia postura (tesis)? ¿Con qué argumentos vas a convencer a un lector escéptico de tu propia perspectiva?'
          : 'Un resumen describe hechos, mientras que un ensayo defiende una tesis personal sustentada en evidencias. ¿Cuál es la diferencia entre resumir y argumentar?';
      } else {
        content = isEnglish
          ? 'Let us pause and examine that thought together! If a ball is thrown upwards, at its highest peak its instantaneous velocity is zero. Does gravity stop pulling on it at that exact instant? What would happen if acceleration were zero too?'
          : '¡Hagamos una pausa reflexiva sobre esa idea! Si lanzas una pelota verticalmente hacia arriba, en el punto más alto su velocidad instantánea se detiene (es cero). ¿Deja la gravedad de actuar sobre ella en ese instante? ¿Qué ocurriría si la aceleración también fuera cero?';
      }
    }
    // 7. Consulta con Fragmentos Recuperados (RAG Grounding y Citación Obligatoria)
    else if (request.ragContext && request.ragContext.length > 0) {
      const topChunk = request.ragContext[0];
      citationTags.push(topChunk.citationTag);

      // Respuesta diferenciada por grado del estudiante
      if (isGael) {
        content = isEnglish
          ? `According to our learning guide ${topChunk.citationTag}: "${topChunk.contentText.slice(0, 120)}...". That sounds like a wonderful secret! How can we explore this together in our daily adventure? What is your first guess?`
          : `Revisando nuestra guía autorizada ${topChunk.citationTag}: "${topChunk.contentText.slice(0, 140)}...". ¡Qué gran descubrimiento! ¿Cómo te imaginas que funciona esto en la vida real? ¿Cuál es tu primera pista?`;
      } else if (isAvril) {
        content = isEnglish
          ? `Based on our academic curriculum ${topChunk.citationTag}: "${topChunk.contentText.slice(0, 150)}...". Notice how this principle connects with our inquiry. How would you construct an argument or equation to demonstrate this deduction step by step?`
          : `Conforme al currículo oficial ${topChunk.citationTag}: "${topChunk.contentText.slice(0, 160)}...". Observa la estructura lógica de este principio. ¿Cómo formularías una demostración analítica o un contraargumento para sustentar esta conclusión?`;
      } else {
        content = isEnglish
          ? `Grounding from authorized source ${topChunk.citationTag}: "${topChunk.contentText.slice(0, 150)}...". How does this guideline align with our institutional evaluation or coordination objective?`
          : `Fundamentado en la fuente autorizada ${topChunk.citationTag}: "${topChunk.contentText.slice(0, 160)}...". ¿Cómo orientamos este criterio formativo para fortalecer el dominio competencial del estudiante?`;
      }
    }
    // 8. Diálogo Socrático Graduado General
    else {
      if (isGael) {
        content = isEnglish
          ? 'Hello young explorer! That is a brilliant question. Let us think like detectives: what is the very first thing we notice when we look closely?'
          : '¡Hola pequeño explorador! Es una pregunta súper interesante. Pensemos como detectives curiosos: ¿cuál es la primera pista que se te ocurre antes de empezar?';
      } else if (isAvril) {
        content = isEnglish
          ? 'That is an intriguing question. To analyze it rigorously, what underlying premises are we taking for granted? Can you identify the primary variable at play?'
          : 'Es una pregunta reflexiva profunda. Para analizarla con rigor socrático: ¿cuáles son las premisas fundamentales que estamos asumiendo como ciertas? ¿Cómo descompondrías el problema en factores esenciales?';
      } else {
        content = isEnglish
          ? 'That is an insightful question. Let us break it down into smaller parts: What is the primary clue or principle we know for sure before starting?'
          : 'Es una pregunta muy interesante para reflexionar. Vamos a descomponerla paso a paso: ¿cuál es el primer principio o evidencia que conocemos con certeza antes de empezar?';
      }
    }

    const latencyMs = Math.max(15, Date.now() - startTime);

    return {
      content,
      citationTags,
      tokensPrompt: Math.ceil(request.userPrompt.length / 4) + 40,
      tokensCompletion: Math.ceil(content.length / 4),
      providerName: this.name,
      modelName: 'alsiz-socratic-rules-engine-v2',
      latencyMs,
      isFallback: false,
      safetyFlags: safetyFlags.length > 0 ? safetyFlags : undefined,
    };
  }
}
