
import React from 'react';
// Fixing named export errors from react-router-dom by using namespace import and destructuring.
import * as ReactRouterDOM from 'react-router-dom';
const { Link, useLocation } = ReactRouterDOM;
import { UserRole } from '../types';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SidebarLink {
  labelKey: string;
  path: string;
  icon: string;
  roles: UserRole[];
}

const sidebarLinks: SidebarLink[] = [
  { labelKey: 'nav.dashboard', path: '/', icon: 'fa-gauge', roles: [UserRole.STUDENT, UserRole.TEACHER, UserRole.PARENT, UserRole.SECRETARY, UserRole.PEDAGOGICAL, UserRole.FINANCIAL, UserRole.SYSTEM_ADMIN] },
  { labelKey: 'nav.finance', path: '/finance', icon: 'fa-money-bill-transfer', roles: [UserRole.FINANCIAL, UserRole.SYSTEM_ADMIN] },
  { labelKey: 'nav.classes', path: '/classes', icon: 'fa-users-rectangle', roles: [UserRole.TEACHER, UserRole.PEDAGOGICAL, UserRole.SYSTEM_ADMIN] },
  { labelKey: 'nav.students', path: '/manage-students', icon: 'fa-user-graduate', roles: [UserRole.SECRETARY, UserRole.PEDAGOGICAL, UserRole.SYSTEM_ADMIN] },
  { labelKey: 'nav.teachers', path: '/manage-teachers', icon: 'fa-chalkboard-user', roles: [UserRole.PEDAGOGICAL, UserRole.SYSTEM_ADMIN] },
  { labelKey: 'nav.pedagogical', path: '/pedagogical-balance', icon: 'fa-chart-line', roles: [UserRole.TEACHER, UserRole.PEDAGOGICAL] },
  { labelKey: 'nav.academic_history', path: '/academic-history', icon: 'fa-book-open-reader', roles: [UserRole.STUDENT] },
  { labelKey: 'nav.grades', path: '/grades', icon: 'fa-graduation-cap', roles: [UserRole.STUDENT, UserRole.TEACHER, UserRole.PARENT, UserRole.PEDAGOGICAL] },
  { labelKey: 'nav.attendance', path: '/attendance', icon: 'fa-calendar-check', roles: [UserRole.STUDENT, UserRole.TEACHER, UserRole.PEDAGOGICAL] },
  { labelKey: 'nav.my_payments', path: '/payments', icon: 'fa-credit-card', roles: [UserRole.STUDENT, UserRole.PARENT] },
  { labelKey: 'nav.documents', path: '/documents', icon: 'fa-file-lines', roles: [UserRole.STUDENT, UserRole.SECRETARY, UserRole.PEDAGOGICAL, UserRole.SYSTEM_ADMIN] },
  { labelKey: 'nav.enrollment', path: '/enrollment', icon: 'fa-user-plus', roles: [UserRole.SECRETARY, UserRole.SYSTEM_ADMIN] },
  { labelKey: 'nav.user_mgmt', path: '/user-management', icon: 'fa-users-gear', roles: [UserRole.SYSTEM_ADMIN] },
  { labelKey: 'nav.settings', path: '/settings', icon: 'fa-gears', roles: [UserRole.STUDENT, UserRole.TEACHER, UserRole.PARENT, UserRole.SECRETARY, UserRole.PEDAGOGICAL, UserRole.FINANCIAL, UserRole.SYSTEM_ADMIN] },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();

  if (!user) return null;

  const filteredLinks = sidebarLinks.filter(link => link.roles.includes(user.role));

  const sidebarClasses = `
    fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 dark:bg-slate-950 text-white flex flex-col transition-transform duration-300 ease-in-out border-r border-slate-800 dark:border-slate-900 shadow-2xl
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    lg:relative lg:translate-x-0 lg:flex
  `;

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        ></div>
      )}

      <aside className={sidebarClasses}>
        <div className="p-8 flex items-center justify-between">
          <h1 className="text-2xl font-black text-indigo-400 flex items-center gap-3 tracking-tighter">
            <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-school text-sm"></i>
            </div>
            EduConnect
          </h1>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          {filteredLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => { if (window.innerWidth < 1024) onClose(); }}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <i className={`fa-solid ${link.icon} w-5 text-center transition-transform group-hover:scale-110`}></i>
                <span className="font-bold text-sm tracking-tight">{t(link.labelKey)}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-slate-800 space-y-2">
          <div className="flex items-center gap-3 p-3 bg-slate-800/40 dark:bg-slate-900/40 rounded-3xl border border-slate-800">
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-2xl border-2 border-indigo-500 shadow-xl object-cover" />
            <div className="overflow-hidden">
              <p className="text-xs font-black truncate text-slate-100">{user.name}</p>
              <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest">{user.role}</p>
            </div>
          </div>
          
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-rose-500/10 text-rose-400 rounded-2xl hover:bg-rose-500 hover:text-white transition-all text-sm font-black uppercase tracking-widest border border-rose-500/20 shadow-lg shadow-rose-500/5"
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            {t('nav.logout')}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
