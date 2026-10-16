import { NavigationTab } from '../types';

// Rutas internas que se alcanzan desde otra pestaña principal y que, por lo tanto,
// deben mantener esa pestaña resaltada.
// La vista de una clase NO se marca como "Mi Espacio": el niño está dentro de una
// clase, no en su panel, así que ninguna pestaña principal se resalta (el PageHeader
// y el título de la clase dan el contexto real).
const NAV_TAB_ALIASES: Partial<Record<NavigationTab, NavigationTab>> = {
  'subject-detail': 'subjects',
};

export const resolveActiveNavTab = (activeTab: NavigationTab): NavigationTab =>
  NAV_TAB_ALIASES[activeTab] ?? activeTab;

export const isNavItemActive = (itemId: NavigationTab, activeTab: NavigationTab): boolean =>
  itemId === resolveActiveNavTab(activeTab);
