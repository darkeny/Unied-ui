
import React, { useState } from 'react';
// Fixing named export errors from react-router-dom by using namespace import and destructuring with aliasing.
import * as ReactRouterDOM from 'react-router-dom';
const { HashRouter: Router, Routes, Route, Navigate, useLocation } = ReactRouterDOM;
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Grades from './pages/Grades';
import Attendance from './pages/Attendance';
import Enrollment from './pages/Enrollment';
import Payments from './pages/Payments';
import Documents from './pages/Documents';
import ManageStudents from './pages/ManageStudents';
import StudentDetails from './pages/StudentDetails';
import Classes from './pages/Classes';
import Finance from './pages/Finance';
import PublicLanding from './pages/PublicLanding';
import ManageTeachers from './pages/ManageTeachers';
import PedagogicalBalancePage from './pages/PedagogicalBalance';
import UserManagement from './pages/UserManagement';
import Settings from './pages/Settings';
import AcademicHistory from './pages/AcademicHistory';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname.split('/')[1];
    if (!path) return t('nav.dashboard');
    const key = `nav.${path.replace('-', '_')}`;
    return t(key);
  };

  return (
    <div className="flex bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300 relative">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="flex-1 min-w-0 h-screen flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-slate-500 dark:text-slate-400"
          >
            <i className="fa-solid fa-bars-staggered text-xl"></i>
          </button>
          <div className="flex items-center gap-2 text-indigo-600 font-black tracking-tighter">
            <i className="fa-solid fa-school"></i>
            EduConnect
          </div>
          <div className="w-10 h-10"></div>
        </header>

        {/* Desktop/Common Header */}
        <header className="hidden lg:flex justify-between items-center p-8 pb-4 border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
           <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
             <i className="fa-solid fa-house"></i>
             <span>/</span>
             <span className="text-slate-600 dark:text-slate-300">{getPageTitle()}</span>
           </div>
           <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                 <i className="fa-solid fa-bell"></i>
                 <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white dark:border-slate-950"></span>
              </button>
              <div className="w-px h-6 bg-slate-200 dark:bg-slate-800"></div>
              <div className="flex items-center gap-3 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-100 dark:border-slate-800">
                 <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] text-white font-bold">MZ</div>
                 <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">Moçambique</span>
              </div>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return <Layout>{children}</Layout>;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/pre-inscricao" element={<PublicLanding />} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/grades" element={<ProtectedRoute><Grades /></ProtectedRoute>} />
      <Route path="/attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
      <Route path="/enrollment" element={<ProtectedRoute><Enrollment /></ProtectedRoute>} />
      <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
      <Route path="/documents" element={<ProtectedRoute><Documents /></ProtectedRoute>} />
      <Route path="/manage-students" element={<ProtectedRoute><ManageStudents /></ProtectedRoute>} />
      <Route path="/students/:id" element={<ProtectedRoute><StudentDetails /></ProtectedRoute>} />
      <Route path="/classes" element={<ProtectedRoute><Classes /></ProtectedRoute>} />
      <Route path="/finance" element={<ProtectedRoute><Finance /></ProtectedRoute>} />
      <Route path="/manage-teachers" element={<ProtectedRoute><ManageTeachers /></ProtectedRoute>} />
      <Route path="/pedagogical-balance" element={<ProtectedRoute><PedagogicalBalancePage /></ProtectedRoute>} />
      <Route path="/user-management" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/academic-history" element={<ProtectedRoute><AcademicHistory /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <AppRoutes />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
