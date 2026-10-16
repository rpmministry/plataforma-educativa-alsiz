/**
 * ==============================================================================
 * Motor Multiagente de Aula Interactiva — Piloto (Etapa 09)
 * Plataforma Educativa ALSIZ para Ekballo Church
 * ==============================================================================
 * Orquesta la dinámica de aula:
 * 1. Profesor Socrático (Kepler)
 * 2. Compañero Virtual de Clase (Sofía / Mateo)
 * 3. Estado Físico y Matemático del Simulador Interactivo (Lienzo / Óptica)
 */

import { PilotTurnResponse } from './types';

export class PilotMultiAgentEngine {
  /**
   * Ejecuta un turno multiagente en el aula interactiva de física/óptica
   */
  public static processTurn(params: {
    turnIndex: number;
    userAction: 'ADJUST_ANGLE' | 'CHANGE_MEDIUM' | 'ASK_QUESTION' | 'EXPLORE_CRITICAL_ANGLE';
    studentMessage?: string;
    n1?: number;
    n2?: number;
    angleIncidentDeg?: number;
  }): PilotTurnResponse {
    const startTime = Date.now();
    const turnIndex = params.turnIndex || 1;

    // Medios e Índices
    const n1 = params.n1 ?? 1.00; // Aire por defecto
    const n2 = params.n2 ?? 1.33; // Agua por defecto
    const angleIncident = Math.max(0, Math.min(89.9, params.angleIncidentDeg ?? 30));

    // Cálculo físico exacto de la Ley de Snell: n1 * sen(theta1) = n2 * sen(theta2)
    const radIncident = (angleIncident * Math.PI) / 180;
    const sinRefracted = (n1 / n2) * Math.sin(radIncident);

    let angleRefractedDeg = 0;
    let isTotalInternalReflection = false;

    if (sinRefracted > 1.0) {
      isTotalInternalReflection = true;
      angleRefractedDeg = 90;
    } else {
      const radRefracted = Math.asin(sinRefracted);
      angleRefractedDeg = Math.round(((radRefracted * 180) / Math.PI) * 10) / 10;
    }

    // Objetivo pedagógico del reto interactivo:
    // Reto: Ajustar el ángulo incidente para obtener un ángulo refractado de 22° ± 1° en agua (n=1.33)
    // O descubrir el ángulo crítico si n1 > n2.
    const challengeTargetMet = Math.abs(angleRefractedDeg - 22.0) <= 1.0 || isTotalInternalReflection;

    let teacherSpeech = '';
    let virtualPeerSpeech = '';
    const virtualPeerName = 'Sofía (Compañera Virtual)';
    let socraticPrompt = '';

    if (isTotalInternalReflection) {
      teacherSpeech = `¡Extraordinario descubrimiento físico! El seno del ángulo refractado superaría 1.0, lo cual es trigonométricamente imposible en el segundo medio. El rayo no puede escapar y ocurre la Reflexión Total Interna.`;
      virtualPeerSpeech = `¡Wow, el rayo rebotó por completo como en un espejo! ¿Es por este mismo principio que viajan los datos en los cables de fibra óptica?`;
      socraticPrompt = `¿Qué condición obligatoria sobre los índices de refracción (n₁ vs n₂) se requiere para que pueda ocurrir la reflexión total interna?`;
    } else if (challengeTargetMet && Math.abs(angleRefractedDeg - 22.0) <= 1.0) {
      teacherSpeech = `¡Excelente calibración! Con un ángulo de incidencia de ${angleIncident}°, el rayo entra en el agua y se desvía a ${angleRefractedDeg}°. Has cumplido la meta del reto experimental.`;
      virtualPeerSpeech = `¡Lo lograste! Noté que al pasar a un medio más denso (n₂ > n₁), el rayo siempre se curva acercándose a la línea normal punteada.`;
      socraticPrompt = `Observa el haz: si aumentamos la densidad del segundo medio aún más (por ejemplo a diamante con n=2.42), ¿el rayo se acercará más o se alejará de la normal?`;
    } else {
      teacherSpeech = `Estamos observando la interfaz entre los dos medios ópticos. Con n₁ = ${n1.toFixed(2)} y n₂ = ${n2.toFixed(2)}, el ángulo incidente de ${angleIncident}° produce una refracción de ${angleRefractedDeg}°.`;
      virtualPeerSpeech = `Mmm, ¿te fijas cómo la velocidad de la luz disminuye en el segundo medio y por eso la trayectoria cambia de dirección? ¿Qué pasará si colocas el ángulo en 0°?`;
      socraticPrompt = `¿Hacia dónde se inclina el rayo respecto a la recta perpendicular (normal) cuando la luz viaja de un medio rápido a uno más lento?`;
    }

    const latencyMs = Math.max(15, Date.now() - startTime);
    const tokensEstimated = 150 + (turnIndex * 25);

    return {
      turnIndex,
      teacherSpeech,
      virtualPeerSpeech,
      virtualPeerName,
      simulationState: {
        n1,
        n2,
        angleIncidentDeg: angleIncident,
        angleRefractedDeg,
        isTotalInternalReflection,
        challengeTargetMet,
      },
      socraticPrompt,
      tokensEstimated,
      latencyMs,
    };
  }
}

