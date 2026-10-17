import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Shield, KeyRound, CheckCircle, AlertCircle, X, ShieldCheck } from 'lucide-react';

interface AccountSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountSettingsModal: React.FC<AccountSettingsModalProps> = ({ isOpen, onClose }) => {
  const { currentStudent, changePassword } = useSchool();
  
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!currentPass.trim() || !newPass.trim() || !confirmPass.trim()) {
      setErrorMsg('Por favor completa todos los campos.');
      return;
    }

    if (newPass !== confirmPass) {
      setErrorMsg('Las contraseñas nuevas no coinciden.');
      return;
    }

    const result = await changePassword(currentStudent.id, currentPass, newPass);
    
    if (result.success) {
      setSuccessMsg('Tu contraseña ha sido actualizada exitosamente.');
      setTimeout(() => {
        setCurrentPass('');
        setNewPass('');
        setConfirmPass('');
        onClose();
      }, 1500);
    } else {
      setErrorMsg(result.error || 'Error al actualizar contraseña.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden text-slate-100">
        <div className="relative bg-gradient-to-r from-slate-900 via-indigo-950/50 to-slate-900 p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Seguridad de Cuenta</h2>
              <p className="text-[11px] text-slate-400">Cambiar contraseña temporal o personal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5">
              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-indigo-400" />
                <span>Contraseña Actual (o PIN)</span>
              </label>
              <input
                type="password"
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                placeholder="Ingresa tu contraseña actual"
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Nueva Contraseña</span>
              </label>
              <input
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="Mínimo 4 caracteres"
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Confirmar Nueva Contraseña</span>
              </label>
              <input
                type="password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="Repite la nueva contraseña"
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-950/50 transition-all flex items-center justify-center gap-2 transform active:scale-95"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Actualizar Contraseña</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
