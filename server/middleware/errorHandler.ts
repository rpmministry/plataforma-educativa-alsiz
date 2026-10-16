import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // 1. Manejo de errores de validación de Zod
  if (err instanceof ZodError) {
    const details = err.issues.map((issue) => ({
      field: issue.path.join('.'),
      issue: issue.message,
    }));

    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Los datos suministrados no cumplen con el formato requerido.',
        details,
      },
      timestamp: new Date().toISOString(),
    });
    return;
  }

  // 2. Errores con código de estado HTTP explícito
  const statusCode = typeof err.statusCode === 'number' ? err.statusCode : 500;
  const errorCode = err.code || (statusCode === 500 ? 'INTERNAL_SERVER_ERROR' : 'REQUEST_ERROR');
  const userMessage =
    statusCode === 500
      ? 'Ocurrió un error inesperado al procesar su solicitud. Intente nuevamente.'
      : err.message || 'Error en la solicitud.';

  // Registro en consola del servidor (sin exponer secretos ni passwords)
  console.error(`[API Error ${statusCode} - ${errorCode}]:`, err?.message || err);

  res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message: userMessage,
    },
    timestamp: new Date().toISOString(),
  });
}

export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    error: {
      code: 'ROUTE_NOT_FOUND',
      message: `El recurso solicitado en ${req.method} ${req.path} no existe en el servidor.`,
    },
    timestamp: new Date().toISOString(),
  });
}

