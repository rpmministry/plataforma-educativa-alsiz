import React, { useState } from 'react';
import { SchoolProvider, useSchool } from './context/SchoolContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { PageHeader } from './components/layout/PageHeader';
import { useHardwareBackButton } from './hooks/useHardwareBackButton';
import { useSwipeBack } from './hooks/useSwipeBack';
import { useScrollToTopOnChange } from './hooks/useScrollToTopOnChange';
import { APP_SCROLL_CONTAINER_ID } from './utils/scrollToTop';
import { LandingView } from './components/landing/LandingView';
import { AccessView } from './components/auth/AccessView';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { SubjectsView } from './components/subjects/SubjectsView';
import { CourseDetailView } from './components/subjects/CourseDetailView';
import { DailyClassView } from './components/classes/DailyClassView';
import { ProgressView } from './components/progress/ProgressView';
import { ScheduleView } from './components/schedule/ScheduleView';
import { ParentDashboard } from './components/parent/ParentDashboard';
import { AdminShell } from './components/admin/AdminShell';
import { AITeacherDrawer } from './components/teacher/AITeacherDrawer';
import { StudentLoginModal } from './components/auth/StudentLoginModal';
import { NewStudentModal } from './components/landing/NewStudentModal';
import { DemoLockModal } from './components/demo/DemoLockModal';
import { DemoContactWidget } from './components/demo/DemoContactWidget';
import { SaveStatusIndicator } from './components/common/SaveStatusIndicator';

const MainContent: React.FC = () => {
  useHardwareBackButton();
  useSwipeBack();
  
  const {
    activeTab,
    setActiveTab,
    currentStudent,
    selectedDayOfWeek,
    isAuthModalOpen,
    targetLoginStudentId,
    closeAuthModal,
    isDemoLockOpen,
    closeDemoLock,
    isDemoMode,
  } = useSchool();

  // Reset global de scroll al cambiar de "ruta" SPA: pestaña, estudiante o día seleccionado.
  useScrollToTopOnChange([activeTab, currentStudent?.id, selectedDayOfWeek]);

  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <LandingView />;
      case 'access':
        return <AccessView />;
      case 'space':
        return <StudentDashboard />;
      case 'subjects':
        return <SubjectsView />;
      case 'subject-detail':
        return <CourseDetailView />;
      case 'classes':
        return <DailyClassView />;
      case 'progress':
        return <ProgressView />;
      case 'schedule':
        return <ScheduleView />;
      case 'parent':
        return <ParentDashboard />;
      case 'admin':
        return <AdminShell />;
      default:
        return <LandingView />;
    }
  };

  return (
    <div className="min-h-dvh flex flex-col bg-[#0A0D11] text-slate-100 selection:bg-amber-500 selection:text-slate-950 font-sans">
      <Navbar />

      <div className="flex-1 flex w-full max-w-[100vw] overflow-x-hidden">
        {activeTab !== 'home' && activeTab !== 'access' && <Sidebar />}

        <main id={APP_SCROLL_CONTAINER_ID} className="flex-1 px-4 sm:px-6 lg:px-8 pt-0 pb-28 md:pb-8 overflow-y-auto overflow-x-hidden">
          <div className="max-w-7xl mx-auto w-full">
            {renderActiveView()}
          </div>
        </main>
      </div>

      {/* Drawer global del Profesor IA: consumido por "Tutor IA" en el dashboard,
          la vista de clase y el modal de actividades. */}
      <AITeacherDrawer />

      <StudentLoginModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        targetStudentId={targetLoginStudentId}
        onOpenRegister={() => setRegisterModalOpen(true)}
      />

      <NewStudentModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
      />

      <DemoLockModal
        isOpen={isDemoLockOpen}
        onClose={closeDemoLock}
        onRegister={() => {
          closeDemoLock();
          setRegisterModalOpen(true);
        }}
      />

      {/* Contacto global: SOLO visible para los perfiles de prueba (Karen / Mauricio)
          y únicamente dentro del espacio educativo, nunca en la pantalla principal o acceso. */}
      {isDemoMode && activeTab !== 'home' && activeTab !== 'access' && <DemoContactWidget />}

      <SaveStatusIndicator />
      {activeTab !== 'home' && activeTab !== 'access' && <MobileBottomNav />}
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <SchoolProvider>
        <MainContent />
      </SchoolProvider>
    </ErrorBoundary>
  );
}
