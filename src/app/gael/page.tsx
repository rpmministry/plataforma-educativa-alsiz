'use client';
import React, { useEffect } from 'react';
import { StudentDashboard } from '../../components/dashboard/StudentDashboard';

export default function GaelPage() {
  useEffect(() => {
    try {
      const savedCurrent = localStorage.getItem('wisdom_current_v2026');
      if (savedCurrent !== 'gael') {
        localStorage.setItem('wisdom_current_v2026', 'gael');
      }
    } catch { }
  }, []);

  return <StudentDashboard />;
}