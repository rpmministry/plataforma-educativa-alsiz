import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in component tree:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('wisdom_student_avatars_v3');
      localStorage.removeItem('wisdom_classes_v11');
      localStorage.removeItem('wisdom_submissions_v10');
      localStorage.removeItem('wisdom_students_list_v4');
      localStorage.removeItem('wisdom_auth_student_id_v3');
      localStorage.removeItem('wisdom_subjects_list_v3');
      localStorage.removeItem('wisdom_schedules_list_v3');
    } catch (e) {
      console.warn('Could not clear storage:', e);
    }
    window.location.reload();
  };

  private handleReload = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6 text-[#F4F4F5]">
          <div className="max-w-md w-full bg-[#18181B] border border-[#27272A] rounded-2xl p-8 shadow-2xl text-center space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-[#E0A82E]/10 border border-[#E0A82E]/30 text-[#E0A82E] flex items-center justify-center mx-auto shadow-lg shadow-[#E0A82E]/10">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">Wisdom Academy</h2>
              <p className="text-sm text-[#A1A1AA]">
                Se detectó una discrepancia temporal al cargar los datos de la plataforma.
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full py-3 px-4 rounded-xl bg-[#E0A82E] hover:bg-[#B77D06] text-[#0A0A0A] font-semibold text-sm transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reanudar Aplicación</span>
              </button>

              <button
                type="button"
                onClick={this.handleReset}
                className="w-full py-2.5 px-4 rounded-xl bg-[#27272A] hover:bg-[#3F3F46] text-[#E4E4E7] font-medium text-xs border border-[#3F3F46] transition-colors"
              >
                Restablecer datos locales
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
