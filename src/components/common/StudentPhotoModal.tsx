import React, { useState, useRef } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { STUDENTS_DATA } from '../../data/mockData';
import { StudentId } from '../../types';
import {
  X,
  Upload,
  Camera,
  CheckCircle2,
  Sparkles,
  Image as ImageIcon,
  RotateCcw,
  UserCheck,
} from 'lucide-react';

interface StudentPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStudentId?: StudentId;
}

const PRESET_PHOTOS: Record<StudentId, { label: string; url: string }[]> = {
  avril: [
    {
      label: 'Fotografía Escolar Oficial (Encuadre Completo)',
      url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&crop=top&q=80',
    },
    {
      label: 'Fotografía Académica 2 (Retrato Estudio)',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&crop=top&q=80',
    },
    {
      label: 'Fotografía Estudiante 3 (Luz Natural)',
      url: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800&auto=format&fit=crop&crop=top&q=80',
    },
  ],
  gael: [
    {
      label: 'Fotografía Escolar 1 (Recomendada)',
      url: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=800&auto=format&fit=crop&crop=top&q=80',
    },
    {
      label: 'Fotografía Académica 2',
      url: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&auto=format&fit=crop&crop=top&q=80',
    },
    {
      label: 'Ilustración Vectorial Oficial',
      url: '/students/gael.svg',
    },
  ],
};

export const StudentPhotoModal: React.FC<StudentPhotoModalProps> = ({
  isOpen,
  onClose,
  initialStudentId = 'avril',
}) => {
  const { customAvatars, updateStudentAvatar } = useSchool();
  const [selectedStudent, setSelectedStudent] = useState<StudentId>(initialStudentId);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const currentStudentData = STUDENTS_DATA.find((s) => s.id === selectedStudent);
  const activeAvatar =
    previewUrl ||
    customAvatars[selectedStudent] ||
    currentStudentData?.avatar ||
    PRESET_PHOTOS[selectedStudent][0].url;

  const handleFileProcess = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido (PNG, JPG, JPEG o WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPreviewUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleSave = async () => {
    if (!previewUrl) {
      onClose();
      return;
    }

    setIsSaving(true);
    // 1. Save in local state and LocalStorage immediately
    updateStudentAvatar(selectedStudent, previewUrl);

    // 2. If it's a base64 image, upload to server filesystem
    if (previewUrl.startsWith('data:image/')) {
      try {
        await fetch('/api/students/upload-avatar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            studentId: selectedStudent,
            imageBase64: previewUrl,
          }),
        });
      } catch (err) {
        console.warn('Server upload notice:', err);
      }
    }

    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1200);
  };

  const handleSelectPreset = (url: string) => {
    setPreviewUrl(url);
  };

  const handleResetToDefault = () => {
    const defaultUrl = PRESET_PHOTOS[selectedStudent][0].url;
    setPreviewUrl(defaultUrl);
    updateStudentAvatar(selectedStudent, defaultUrl);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-[#18181B] border border-[#27272A] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#27272A] bg-[#121214]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#E0A82E]/10 text-[#E0A82E] border border-[#E0A82E]/30">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Configurar Foto de Estudiante</h3>
              <p className="text-xs text-[#A1A1AA]">Sube o personaliza la foto institucional del alumno</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#A1A1AA] hover:text-white rounded-xl hover:bg-[#27272A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Student Selector Tabs */}
        <div className="flex border-b border-[#27272A] bg-[#121214] p-2 gap-2">
          {STUDENTS_DATA.map((student) => {
            const isSelected = selectedStudent === student.id;
            return (
              <button
                key={student.id}
                onClick={() => {
                  setSelectedStudent(student.id);
                  setPreviewUrl('');
                }}
                className={`flex-1 flex items-center justify-center gap-2.5 py-2 px-3 rounded-xl font-medium text-sm transition-colors ${
                  isSelected
                    ? 'bg-[#E0A82E] text-[#0A0A0A] font-semibold shadow-md'
                    : 'text-[#A1A1AA] hover:text-white hover:bg-[#27272A]'
                }`}
              >
                <span className="font-semibold">{student.name}</span>
                <span className="text-xs opacity-75">({student.age} años)</span>
                {customAvatars[student.id] && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400" title="Foto personalizada activa" />
                )}
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto overscroll-contain space-y-6">
          {/* Main Preview & Dropzone */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Live Portrait Frame */}
            <div className="relative shrink-0 flex flex-col items-center">
              <div className="relative group">
                <img
                  src={activeAvatar}
                  alt={`Retrato de ${selectedStudent}`}
                  referrerPolicy="no-referrer"
                  style={{ objectPosition: selectedStudent === 'avril' ? '50% 10%' : '50% 20%' }}
                  className="w-32 h-32 rounded-2xl object-cover ring-2 ring-[#E0A82E]/40 bg-[#18181B] shadow-xl"
                />
                <div className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="text-[11px] text-white font-medium bg-black/70 px-2 py-1 rounded-md backdrop-blur-sm">
                    Vista previa
                  </span>
                </div>
              </div>
              <span className="mt-2 text-xs font-semibold text-white">
                {currentStudentData?.name}
              </span>
              <span className="text-[11px] text-[#A1A1AA]">{currentStudentData?.grade}</span>
            </div>

            {/* Drag and Drop Box */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`flex-1 w-full border-2 border-dashed rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                isDragging
                  ? 'border-[#E0A82E] bg-[#E0A82E]/10'
                  : 'border-[#27272A] hover:border-[#E0A82E]/60 bg-[#0A0A0A]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileProcess(e.target.files[0]);
                  }
                }}
              />
              <div className="p-3 rounded-full bg-[#E0A82E]/10 text-[#E0A82E] mb-2">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-sm font-semibold text-white">
                Arrastra tu foto aquí o <span className="text-[#E0A82E] underline">haz clic</span>
              </p>
              <p className="text-xs text-[#A1A1AA] mt-1">
                Admite archivos PNG, JPG, JPEG o WEBP
              </p>
            </div>
          </div>

          {/* Quick Presets Section */}
          <div className="space-y-2.5 pt-2">
            <label className="text-xs font-semibold text-[#D4D4D8] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E0A82E]" />
              Opciones de fotos de alta resolución disponibles:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {PRESET_PHOTOS[selectedStudent].map((preset, idx) => {
                const isSelected = activeAvatar === preset.url;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPreset(preset.url)}
                    className={`flex items-center gap-2.5 p-2 rounded-xl border text-left transition-colors ${
                      isSelected
                        ? 'border-[#E0A82E] bg-[#E0A82E]/10 text-white ring-1 ring-[#E0A82E]'
                        : 'border-[#27272A] bg-[#0A0A0A] text-[#A1A1AA] hover:bg-[#18181B] hover:border-[#3F3F46]'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      referrerPolicy="no-referrer"
                      style={{ objectPosition: selectedStudent === 'avril' ? '50% 10%' : '50% 20%' }}
                      className="w-10 h-10 rounded-lg object-cover bg-[#18181B] shrink-0"
                    />
                    <span className="text-xs font-medium leading-snug line-clamp-2">
                      {preset.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Or Paste Direct URL */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#A1A1AA] flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5" />
              O ingresa el enlace URL de la imagen:
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://ejemplo.com/foto.jpg"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="flex-1 bg-[#0A0A0A] border border-[#27272A] rounded-xl px-3.5 py-2 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#E0A82E]"
              />
              <button
                type="button"
                onClick={() => {
                  if (urlInput.trim()) {
                    setPreviewUrl(urlInput.trim());
                    setUrlInput('');
                  }
                }}
                disabled={!urlInput.trim()}
                className="px-3 py-2 bg-[#27272A] hover:bg-[#3F3F46] disabled:opacity-50 text-[#E4E4E7] text-xs font-semibold rounded-xl border border-[#3F3F46]"
              >
                Cargar
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#27272A] bg-[#121214]">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="flex items-center gap-1.5 text-xs text-[#A1A1AA] hover:text-rose-400 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restablecer a inicial
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#A1A1AA] hover:text-white hover:bg-[#27272A] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold bg-[#E0A82E] hover:bg-[#B77D06] text-[#0A0A0A] shadow-md transition-colors disabled:opacity-60"
            >
              {saveSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-900" />
                  ¡Foto Guardada!
                </>
              ) : isSaving ? (
                'Guardando...'
              ) : (
                <>
                  <UserCheck className="w-4 h-4" />
                  Guardar y Aplicar
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
