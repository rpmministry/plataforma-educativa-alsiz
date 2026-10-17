import React, { useState, useEffect, useRef } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Student } from '../../types';
import { SchoolLogo } from '../common/SchoolLogo';
import { StudentAvatar } from '../common/StudentAvatar';
import { AccessRestrictedModal } from './AccessRestrictedModal';
import { authApi } from '../../services/apiClient';
import {
  Lock,
  KeyRound,
  Mail,
  AlertCircle,
  X,
  UserCheck,
  Shield,
  UserPlus,
} from 'lucide-react';

interface StudentLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetStudentId?: string;
  onOpenRegister?: () => void;
}

export const StudentLoginModal: React.FC<StudentLoginModalProps> = ({
  isOpen,
  onClose,
  targetStudentId,
  onOpenRegister,
}) => {
const {
  studentsList,
  loginStudent,
  currentStudentId,
  authenticateStudent,
  refreshSession,
} = useSchool();

  const initialTarget = targetStudentId || currentStudentId || 'avril';
  const targetStudent = studentsList.find((s) => s.id === initialTarget) || studentsList[0];

  const [identifier, setIdentifier] = useState<string>(targetStudent?.email || '');
  const [password, setPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [googleReady, setGoogleReady] = useState(false);
  const [restrictedEmail, setRestrictedEmail] = useState<string | null>(null);
  const googleButtonRef = useRef<HTMLDivElement>(null);

  // Clear form fields when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIdentifier('');
      setPassword('');
      setErrorMsg(null);
      setRestrictedEmail(null);
    }
  }, [isOpen]);

  // Google Sign-In handling - Validación autoritativa en servidor backend
  const handleGoogleResponse = async (response: any) => {
    const idToken = response?.credential;
    if (!idToken) {
      setErrorMsg('Error: No se recibió token de verificación de Google.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMsg(null);
      const res = await authApi.googleLogin(idToken);
      if (res.success && res.data?.user) {
        await refreshSession();
        onClose();
        return;
      }

      if (res.error?.code === 'AUTH_ACCOUNT_INACTIVE' || res.error?.code === 'ACCOUNT_SUSPENDED') {
        setErrorMsg('Tu cuenta institucional se encuentra inactiva o suspendida. Contacta a secretaría.');
      } else if (res.error?.code === 'USER_NOT_FOUND' || res.error?.code === 'UNAUTHORIZED' || res.error?.code === 'AUTH_UNAUTHORIZED') {
        try { window.google?.accounts?.id?.disableAutoSelect?.(); } catch { /* no-op */ }
        setRestrictedEmail(res.error?.details?.email || 'cuenta no registrada');
      } else {
        setErrorMsg(res.error?.message || 'Error al validar credencial de Google con el servidor.');
      }
    } catch {
      setErrorMsg('No se pudo establecer comunicación con el servidor institucional.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    if (!clientId) {
      console.warn('[GoogleSignIn] VITE_GOOGLE_CLIENT_ID no está definido');
      setGoogleReady(false);
      return;
    }

    const loadAndRender = () => {
      if (!window.google?.accounts) return;
      if (!googleButtonRef.current) return;
      
try {
         window.google.accounts.id.initialize({
           client_id: clientId,
           callback: handleGoogleResponse,
           auto_select: false,
           prompt: 'select_account'
         });
        window.google.accounts.id.renderButton(
          googleButtonRef.current,
          { 
            theme: 'outline', 
            size: 'large', 
            width: '100%', 
            text: 'continue_with'
          }
        );
        console.log('[GoogleSignIn] Botón de Google renderizado correctamente');
        setGoogleReady(true);
      } catch (err) {
        console.error('[GoogleSignIn] Error al renderizar botón:', err);
        setGoogleReady(false);
      }
    };

    if (window.google?.accounts) {
      loadAndRender();
    } else {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = loadAndRender;
      script.onerror = () => {
        console.error('[GoogleSignIn] Error cargando gsi/client');
        setGoogleReady(false);
      };
      document.head.appendChild(script);
    }
  }, [isOpen]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!identifier.trim() || !password.trim()) {
      setErrorMsg('Por favor ingresa tu correo electrónico y contraseña.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await loginStudent(identifier, password);
      if (result.success && result.student) {
        setIdentifier('');
        setPassword('');
        onClose();
      } else {
        if (result.errorCode === 'ACCOUNT_SUSPENDED' || result.errorCode === 'AUTH_ACCOUNT_INACTIVE') {
          setErrorMsg('Tu cuenta institucional está inactiva o suspendida. Contacta a secretaría.');
        } else if (result.errorCode === 'NETWORK_OFFLINE') {
          setErrorMsg('Sin conexión a Internet. Verifica tu conectividad e intenta nuevamente.');
        } else if (result.errorCode === 'SERVICE_UNAVAILABLE' || result.errorCode === 'SERVER_UNREACHABLE') {
          setErrorMsg('El servidor institucional no está disponible en este momento. Inténtalo más tarde.');
        } else {
          setErrorMsg(result.error || 'Credenciales incorrectas. Revisa tu correo, usuario o PIN.');
        }
      }
    } catch {
      setErrorMsg('Error de comunicación con el servidor al iniciar sesión.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-100">
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 p-6 sm:p-8 border-b border-slate-800 shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-bold uppercase tracking-wider">
                <Shield className="w-3 h-3" />
                <span>Acceso Privado Protegido</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                Ingreso al Colegio Virtual
              </h2>
            </div>
          </div>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Ingresa con tu correo y contraseña o usa tu cuenta de Google.
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto overscroll-contain">

          {/* 1. Email/Password Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <span>Correo Electrónico</span>
              </label>
              <input
                type="email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="ej. estudiante@wisdomschool.edu"
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                autoComplete="email"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-indigo-400" />
                <span>Contraseña</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                autoComplete="current-password"
              />
            </div>

            {/* 2. Google Sign-In Button */}
            <div className="pt-2">
              <div className="flex flex-col items-center gap-3">
                <div className="relative w-full">
                  <div ref={googleButtonRef} id="google-signin-button" className="w-full"></div>
                  {!googleReady && (
                    <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/60 text-center text-xs text-slate-400">
                      <span>Inicio con Google institucional requiere servidor configurado. Accede con credenciales o PIN institucional.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-bold text-sm shadow-xl shadow-indigo-950/50 transition-all flex items-center justify-center gap-2 transform active:scale-95"
            >
              <UserCheck className="w-4 h-4" />
              <span>{isSubmitting ? 'Ingresando...' : 'Ingresar al Colegio Virtual'}</span>
            </button>
          </form>

          {/* Footer - minimal */}
          <div className="pt-4 border-t border-slate-800/80 text-center text-xs text-slate-400">
            <p>¿No tienes cuenta? Contacta a la administración para tu inscripción.</p>
          </div>

        </div>
      </div>
    </div>

      {/* Cápsula de Información: se activa cuando el Auth Guard rechaza una cuenta no inscrita. */}
      <AccessRestrictedModal
        isOpen={!!restrictedEmail}
        onClose={() => setRestrictedEmail(null)}
        email={restrictedEmail || undefined}
      />
    </>
  );
};