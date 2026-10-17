import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { STUDENTS_DATA } from '../../data/mockData';
import { Camera, Check } from 'lucide-react';
import { StudentId } from '../../types';
import { StudentPhotoModal } from './StudentPhotoModal';

interface StudentAvatarProps {
  studentId: StudentId;
  name: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  editable?: boolean;
  isActive?: boolean;
  customRingColor?: string;
}

const sizeConfig = {
  xs: { box: 'w-6 h-6 rounded-full', icon: 'w-2 h-2', btn: 'w-4 h-4 p-0.5' },
  sm: { box: 'w-8 h-8 rounded-full', icon: 'w-2.5 h-2.5', btn: 'w-5 h-5 p-0.5' },
  md: { box: 'w-12 h-12 rounded-xl', icon: 'w-3 h-3', btn: 'w-5 h-5 p-1' },
  lg: { box: 'w-16 h-16 rounded-2xl', icon: 'w-3 h-3', btn: 'w-5 h-5 p-1' },
  xl: { box: 'w-24 h-24 rounded-2xl', icon: 'w-3.5 h-3.5', btn: 'w-6 h-6 p-1' },
};

export const StudentAvatar: React.FC<StudentAvatarProps> = ({
  studentId,
  name,
  className = '',
  size = 'md',
  editable = false,
  isActive = false,
  customRingColor,
}) => {
  const { customAvatars } = useSchool();
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorStage, setErrorStage] = useState(0);
  const [allImagesFailed, setAllImagesFailed] = useState(false);

  // Fallback chain
  const custom = customAvatars?.[studentId];
  const defaultObj = STUDENTS_DATA.find((s) => s.id === studentId);
  const unsplashBackup =
    studentId === 'avril'
      ? 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&crop=top&q=80'
      : 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=600&auto=format&fit=crop&q=80';

  const sources: string[] = [
    ...(custom ? [custom] : []),
    `/students/${studentId}.png`,
    `/students/${studentId === 'avril' ? 'Avril' : studentId === 'karen' ? 'Avril' : 'Gael'}.png`,
    defaultObj?.avatar || unsplashBackup,
    unsplashBackup,
    `/students/${studentId}.svg`,
  ];

  const currentSrc = sources[errorStage] || sources[sources.length - 1];

  const handleImgError = () => {
    if (errorStage < sources.length - 1) {
      setErrorStage((prev) => prev + 1);
    } else {
      setAllImagesFailed(true);
    }
  };

  const { box, icon, btn } = sizeConfig[size];

  const ringClass = isActive
    ? 'ring-[#E0A82E]'
    : customRingColor
    ? `${customRingColor} group-hover:${customRingColor.replace(/\/\d+\//, '/50')}`
    : 'ring-[#27272A] group-hover:ring-[#52525B]';

  return (
    <>
      <div
        className={`relative group inline-block shrink-0 ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {!allImagesFailed ? (
          <img
            src={currentSrc}
            alt={`Foto de ${name}`}
            onError={handleImgError}
            referrerPolicy="no-referrer"
            style={{ objectPosition: studentId === 'avril' ? '50% 10%' : '50% 20%' }}
            className={`${box} object-cover bg-[#18181B] ring-2 ${ringClass} transition-all duration-300 shadow-lg`}
          />
        ) : (
          <div
            className={`${box} flex flex-col items-center justify-center font-bold text-white uppercase bg-[#27272A] border border-[#3F3F46] ring-2 ${ringClass} shadow-md p-1 text-center`}
          >
            <span className="text-xs font-semibold tracking-wider text-[#E0A82E]">{name ? name.slice(0, 2).toUpperCase() : studentId.slice(0, 2).toUpperCase()}</span>
          </div>
        )}

        {editable && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            title={`Cambiar o subir foto real de ${name}`}
            className={`absolute -bottom-1 -right-1 ${btn} rounded-full bg-[#E0A82E] hover:bg-[#B77D06] text-[#0A0A0A] shadow-md border-2 border-[#18181B] transition-transform duration-200 z-10 ${
              isHovered ? 'scale-110 opacity-100' : 'scale-95 opacity-90'
            }`}
          >
            <Camera className={icon} />
          </button>
        )}
      </div>

      {isModalOpen && (
        <StudentPhotoModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setErrorStage(0);
          }}
          initialStudentId={studentId}
        />
      )}
    </>
  );
};