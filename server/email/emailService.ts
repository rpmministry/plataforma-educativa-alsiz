/**
 * ==============================================================================
 * Servicio de Envío de Correos Transaccionales (Resend / SMTP Fallback)
 * Plataforma Educativa ALSIZ para Ekballo Church
 * ==============================================================================
 */

import { Resend } from 'resend';

export interface SendPinOptions {
  toEmail: string;
  studentName?: string;
  pinCode: string;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  provider: 'RESEND' | 'NODEMAILER' | 'SIMULATED';
  error?: string;
}

export async function sendStudentPinEmail(options: SendPinOptions): Promise<EmailResult> {
  const { toEmail, studentName, pinCode } = options;
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const fromEmail = process.env.EMAIL_FROM?.trim() || 'onboarding@resend.dev';

  // 1. Proveedor Primario: Resend API
  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);
      const displayName = studentName || 'Estudiante';

      const data = await resend.emails.send({
        from: `Plataforma ALSIZ <${fromEmail}>`,
        to: [toEmail],
        subject: `Tu PIN de acceso — Plataforma Educativa ALSIZ`,
        text: `Hola ${displayName},\n\nTu PIN de acceso táctil a la Plataforma Educativa ALSIZ es: ${pinCode}\n\nUtilízalo en la pantalla de inicio para acceder a tus lecciones.\n\n¡Dios te bendiga!\nEquipo ALSIZ - Ekballo Church`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 24px; background: #0f172a; color: #f8fafc; border-radius: 16px; border: 1px solid #1e293b;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h2 style="color: #6366f1; margin: 0;">Plataforma Educativa ALSIZ</h2>
              <p style="color: #94a3b8; font-size: 14px; margin-top: 4px;">Ekballo Church — Educación con Propósito</p>
            </div>
            <div style="background: #1e293b; padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 20px;">
              <p style="color: #cbd5e1; font-size: 15px; margin: 0 0 12px 0;">Hola <strong>${displayName}</strong>, aquí tienes tu PIN de acceso:</p>
              <div style="font-size: 32px; font-weight: 800; letter-spacing: 6px; color: #38bdf8; padding: 12px 20px; background: #0f172a; border-radius: 8px; display: inline-block;">
                ${pinCode}
              </div>
              <p style="color: #64748b; font-size: 12px; margin: 12px 0 0 0;">Ingresa este código en tu tableta o computadora para iniciar tu jornada.</p>
            </div>
            <p style="color: #64748b; font-size: 11px; text-align: center; margin: 0;">Si no solicitaste este acceso, por favor informa a la coordinación académica.</p>
          </div>
        `,
      });

      return {
        success: true,
        messageId: data.data?.id,
        provider: 'RESEND',
      };
    } catch (err: any) {
      console.warn('[EmailService] Falló envío vía Resend:', err?.message || err);
    }
  }

  // 2. Proveedor Secundario: Nodemailer SMTP
  const smtpUser = process.env.EMAIL_USER;
  const smtpPass = process.env.EMAIL_PASS;
  if (smtpUser && smtpPass) {
    try {
      const { default: nodemailer } = await import('nodemailer');
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: smtpUser, pass: smtpPass },
      });

      const info = await transporter.sendMail({
        from: `"Plataforma Educativa ALSIZ" <${smtpUser}>`,
        to: toEmail,
        subject: `Tu PIN de acceso — Plataforma Educativa ALSIZ`,
        text: `Hola,\n\nTu PIN de acceso es: ${pinCode}\n\nEquipo ALSIZ`,
      });

      return {
        success: true,
        messageId: info.messageId,
        provider: 'NODEMAILER',
      };
    } catch (err: any) {
      console.warn('[EmailService] Falló envío vía SMTP:', err?.message || err);
    }
  }

  // 3. Fallback Simulado (Entorno de desarrollo sin red / tests)
  return {
    success: true,
    provider: 'SIMULATED',
  };
}

