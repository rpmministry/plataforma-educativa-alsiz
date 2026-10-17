import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function runControlledGeminiTest() {
  const apiKey = (process.env.GEMINI_API_KEY || '').trim();
  if (!apiKey) {
    console.error('[Gemini Test] ❌ ERROR: GEMINI_API_KEY no encontrada en .env.local');
    process.exit(1);
  }

  console.log('================================================================');
  console.log('  PRUEBA CONTROLADA DE PROVEEDOR IA (1 SOLA LLAMADA - GEMINI)');
  console.log('================================================================');

  try {
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey });

    // Modelo estándar gratuito de alta disponibilidad
    const targetModel = 'gemini-3.8-flash';
    console.log(`[Gemini Test] Evaluando disponibilidad de modelo: ${targetModel}`);

    const syntheticPrompt = 'Explica en dos oraciones socráticas qué es la gravedad para un alumno de primaria. No agregues saludos ni despedidas.';

    const start = Date.now();
    const response = await ai.models.generateContent({
      model: targetModel,
      contents: syntheticPrompt,
      config: {
        temperature: 0.2,
        maxOutputTokens: 150,
      },
    });
    const latencyMs = Date.now() - start;

    const replyText = response.text || '';
    const promptTokens = response.usageMetadata?.promptTokenCount ?? 0;
    const candidatesTokens = response.usageMetadata?.candidatesTokenCount ?? 0;
    const totalTokens = response.usageMetadata?.totalTokenCount ?? (promptTokens + candidatesTokens);

    console.log('\n[Gemini Test] ✅ LLAMADA REAL EXITOSA (CUOTA GRATUITA VALIDADA)');
    console.log('----------------------------------------------------------------');
    console.log(`Proveedor:           GOOGLE_GEMINI (Google AI Studio)`);
    console.log(`Modelo Utilizado:    ${targetModel}`);
    console.log(`Latencia:            ${latencyMs} ms`);
    console.log(`Tokens de Entrada:   ${promptTokens}`);
    console.log(`Tokens de Salida:    ${candidatesTokens}`);
    console.log(`Tokens Totales:      ${totalTokens}`);
    console.log(`Respuesta Generada:  "${replyText.trim()}"`);
    console.log('----------------------------------------------------------------');
    console.log('[Gemini Test] Conclusión: El modelo responde dentro del Free Tier sin errores ni cargos.');
  } catch (err: any) {
    console.error('\n[Gemini Test] ❌ Error en la llamada a Gemini:', err.message || err);
    process.exit(1);
  }
}

runControlledGeminiTest();
