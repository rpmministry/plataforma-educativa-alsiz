import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles, ShieldCheck, ArrowLeft, RefreshCw, Cpu, MessageSquare,
  AlertTriangle, CheckCircle, HelpCircle, Layers, Eye
} from 'lucide-react';
import { PilotTurnResponse } from '../../../server/pilot/types';

interface InteractivePilotSandboxProps {
  subjectCode: string;
  lessonTheme: string;
  onExit: () => void;
}

export const InteractivePilotSandbox: React.FC<InteractivePilotSandboxProps> = ({
  subjectCode,
  lessonTheme,
  onExit,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [syntheticAlias, setSyntheticAlias] = useState<string>('Estudiante Explorador');
  const [turnIndex, setTurnIndex] = useState<number>(1);
  const [maxTurns] = useState<number>(6);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Estado físico de la simulación
  const [n1, setN1] = useState<number>(1.00); // Aire
  const [n2, setN2] = useState<number>(1.33); // Agua
  const [incidentAngle, setIncidentAngle] = useState<number>(30);
  const [turnData, setTurnData] = useState<PilotTurnResponse | null>(null);
  const [studentInput, setStudentInput] = useState<string>('');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 1. Iniciar sesión efímera segura (Anti-PII)
  useEffect(() => {
    let isCancelled = false;

    async function startSession() {
      try {
        setIsLoading(true);
        setErrorMsg(null);

        const res = await fetch('/api/v1/pilot/sessions/initiate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ subjectCode, lessonTheme }),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'No se pudo iniciar el piloto interactivo.');
        }

        if (!isCancelled) {
          setToken(data.data.ephemeralToken);
          setSyntheticAlias(data.data.studentSyntheticAlias);

          // Ejecutar primer turno
          const turnRes = await fetch(`/api/v1/pilot/sessions/${data.data.ephemeralToken}/interact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              turnIndex: 1,
              userAction: 'ADJUST_ANGLE',
              n1: 1.00,
              n2: 1.33,
              angleIncidentDeg: 30,
            }),
          });

          const turnJson = await turnRes.json();
          if (turnJson.success) {
            setTurnData(turnJson.data);
          }
        }
      } catch (err: any) {
        if (!isCancelled) {
          setErrorMsg(err.message || 'Error al conectar con el motor del piloto.');
        }
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }

    startSession();

    return () => {
      isCancelled = true;
    };
  }, [subjectCode, lessonTheme]);

  // 2. Renderizado del simulador físico en Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const midY = height / 2;
    const midX = width / 2;

    // Limpiar fondo
    ctx.clearRect(0, 0, width, height);

    // Medio 1 (Superior)
    ctx.fillStyle = '#0f172a'; // Slate 900
    ctx.fillRect(0, 0, width, midY);

    // Medio 2 (Inferior)
    ctx.fillStyle = n2 > 1.4 ? '#1e1b4b' : '#082f49'; // Índices densos
    ctx.fillRect(0, midY, width, midY);

    // Línea de interfaz
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, midY);
    ctx.lineTo(width, midY);
    ctx.stroke();

    // Línea Normal (Punteada vertical)
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(midX, 20);
    ctx.lineTo(midX, height - 20);
    ctx.stroke();
    ctx.setLineDash([]);

    // Etiquetas de medios
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText(`Medio 1: n₁ = ${n1.toFixed(2)} (ej. Aire)`, 20, 30);
    ctx.fillText(`Medio 2: n₂ = ${n2.toFixed(2)} (ej. ${n2 > 1.4 ? 'Vidrio' : 'Agua'})`, 20, midY + 30);

    // Trazado de rayos
    const rayLength = 160;
    const radIncident = (incidentAngle * Math.PI) / 180;

    // Rayo incidente (viene desde el cuadrante superior izquierdo)
    const startX = midX - rayLength * Math.sin(radIncident);
    const startY = midY - rayLength * Math.cos(radIncident);

    ctx.strokeStyle = '#fbbf24'; // Ámbar / Luz
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(midX, midY);
    ctx.stroke();

    // Cálculo de refracción
    const sinRefracted = (n1 / n2) * Math.sin(radIncident);
    const isTIR = sinRefracted > 1.0;

    if (isTIR) {
      // Reflexión Total Interna (rebota en el medio 1)
      const reflectX = midX + rayLength * Math.sin(radIncident);
      const reflectY = midY - rayLength * Math.cos(radIncident);

      ctx.strokeStyle = '#f43f5e'; // Rojo advertencia
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(midX, midY);
      ctx.lineTo(reflectX, reflectY);
      ctx.stroke();

      ctx.fillStyle = '#f43f5e';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.fillText('¡Reflexión Total Interna!', midX + 30, midY - 40);
    } else {
      // Rayo refractado
      const radRefracted = Math.asin(sinRefracted);
      const endX = midX + rayLength * Math.sin(radRefracted);
      const endY = midY + rayLength * Math.cos(radRefracted);

      ctx.strokeStyle = '#34d399'; // Verde esmeralda refractado
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(midX, midY);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      const degRefracted = ((radRefracted * 180) / Math.PI).toFixed(1);
      ctx.fillStyle = '#34d399';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.fillText(`θ₂ = ${degRefracted}°`, midX + 25, midY + 45);
    }

    // Punto de impacto
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(midX, midY, 5, 0, Math.PI * 2);
    ctx.fill();
  }, [n1, n2, incidentAngle]);

  // 3. Enviar turno interactivo al motor
  const handleSendTurn = async (action: 'ADJUST_ANGLE' | 'CHANGE_MEDIUM' | 'ASK_QUESTION', customMsg?: string) => {
    if (!token) return;
    try {
      setIsLoading(true);
      const nextTurn = turnIndex + 1;
      const res = await fetch(`/api/v1/pilot/sessions/${token}/interact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          turnIndex: nextTurn,
          userAction: action,
          studentMessage: customMsg || studentInput,
          n1,
          n2,
          angleIncidentDeg: incidentAngle,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setTurnData(json.data);
        setTurnIndex(nextTurn);
        setStudentInput('');
      } else {
        setErrorMsg(json.error);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error durante la interacción.');
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Salida ordenada
  const handleExit = async () => {
    if (token) {
      try {
        await fetch(`/api/v1/pilot/sessions/${token}/terminate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            exitReason: 'USER_EXIT',
            telemetry: {
              turnsCount: turnIndex,
              latencyMs: turnData?.latencyMs || 40,
              tokensEstimated: turnData?.tokensEstimated || 150,
              simulationInteractions: turnIndex,
            },
          }),
        });
      } catch { /* ignorar fallo de salida */ }
    }
    onExit();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Cabecera del Piloto Aislado */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-3xl bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border border-cyan-500/30 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-white">Piloto de Aula Interactiva Multiagente</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                SANDBOX BETA
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Sesión Aislada Anti-PII: <strong className="text-cyan-400">{syntheticAlias}</strong> • Turno {turnIndex} de {maxTurns}
            </p>
          </div>
        </div>

        {/* Botón de Salida Inmediata y Resiliencia */}
        <button
          onClick={handleExit}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-xs font-bold transition-all shadow-md touch-lift shrink-0"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400" />
          <span>Volver al Aula Tradicional</span>
        </button>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-200 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Contenedor Principal: Simulador Físico + Diálogo Multiagente */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* COLUMNA 1: Lienzo Físico de Snell (7 columnas) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Simulador de Refracción (Leyes de Óptica)</span>
              </h3>
              <span className="text-xs font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
                n₁·sen(θ₁) = n₂·sen(θ₂)
              </span>
            </div>

            {/* Canvas de Trazado de Rayos */}
            <div className="w-full rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-950 relative shadow-inner">
              <canvas
                ref={canvasRef}
                width={560}
                height={320}
                className="w-full h-auto block"
              />
            </div>

            {/* Controles de Parámetros Físicos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Ángulo de Incidencia (θ₁):</span>
                  <strong className="font-mono text-amber-400">{incidentAngle}°</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="85"
                  value={incidentAngle}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setIncidentAngle(val);
                  }}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <span className="text-xs text-slate-300 block">Cambio de Medio:</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => { setN1(1.00); setN2(1.33); handleSendTurn('CHANGE_MEDIUM', 'Cambiamos a interfaz Aire -> Agua'); }}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${n1 === 1.00 && n2 === 1.33 ? 'bg-cyan-600 border-cyan-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'}`}
                  >
                    Aire → Agua
                  </button>
                  <button
                    onClick={() => { setN1(1.52); setN2(1.00); handleSendTurn('CHANGE_MEDIUM', 'Cambiamos a interfaz Vidrio -> Aire para explorar ángulo crítico'); }}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${n1 === 1.52 && n2 === 1.00 ? 'bg-cyan-600 border-cyan-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'}`}
                  >
                    Vidrio → Aire
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleSendTurn('ADJUST_ANGLE')}
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Eye className="w-4 h-4" />}
              <span>Consultar Observación con Kepler y Sofía</span>
            </button>
          </div>
        </div>

        {/* COLUMNA 2: Diálogo Multiagente Colaborativo (5 columnas) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-400" />
              <span>Interacción Multiagente en Vivo</span>
            </h3>

            {/* Intervención del Profesor Kepler */}
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-indigo-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Profesor Kepler (Física)
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Tutor Socrático</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {turnData?.teacherSpeech || 'Cargando directivas pedagógicas del profesor...'}
              </p>
            </div>

            {/* Intervención de Sofía (Compañera Virtual) */}
            <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-cyan-300 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-cyan-400" /> {turnData?.virtualPeerName || 'Sofía (Compañera)'}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Pregunta Curiosa</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed italic">
                "{turnData?.virtualPeerSpeech || 'Observando el experimento con atención...'}"
              </p>
            </div>

            {/* Pregunta de Andamiaje Socrático */}
            {turnData?.socraticPrompt && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-1">
                <strong className="block font-bold">Reto Reflexivo para ti:</strong>
                <p>{turnData.socraticPrompt}</p>
              </div>
            )}

            {/* Entrada del Estudiante */}
            <div className="space-y-2 pt-2">
              <textarea
                value={studentInput}
                onChange={(e) => setStudentInput(e.target.value)}
                placeholder="Escribe tu deducción o responde a Sofía y al profesor..."
                rows={3}
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={() => handleSendTurn('ASK_QUESTION')}
                disabled={isLoading || !studentInput.trim()}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md"
              >
                Enviar Respuesta Reflexiva
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

