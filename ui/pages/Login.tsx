
import React, { useState } from 'react';
import { UserRole } from '../types';
import { useAuth } from '../context/AuthContext';

const profiles = [
  { role: UserRole.STUDENT, icon: 'fa-user-graduate', color: 'bg-blue-500', desc: 'Notas e presenças' },
  { role: UserRole.TEACHER, icon: 'fa-chalkboard-user', color: 'bg-emerald-500', desc: 'Gestão de turmas' },
  { role: UserRole.PARENT, icon: 'fa-users', color: 'bg-purple-500', desc: 'Acompanhamento' },
  { role: UserRole.SECRETARY, icon: 'fa-building-columns', color: 'bg-amber-500', desc: 'Matrículas' },
  { role: UserRole.FINANCIAL, icon: 'fa-money-bill-trend-up', color: 'bg-rose-500', desc: 'Gestão de propinas' },
  { role: UserRole.PEDAGOGICAL, icon: 'fa-user-tie', color: 'bg-indigo-500', desc: 'Gestão Pedagógica' },
  { role: UserRole.SYSTEM_ADMIN, icon: 'fa-user-shield', color: 'bg-slate-800', desc: 'Administração TI' },
];

const Login: React.FC = () => {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [credentials, setCredentials] = useState({ user: '', pass: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) login(selectedRole);
  };

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 md:p-6 transition-colors duration-300">
        <div className="max-w-6xl w-full py-8 md:py-12">
          <div className="text-center mb-8 md:mb-12">
             <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-indigo-600 text-white rounded-2xl md:rounded-3xl shadow-xl mb-4 md:mb-6">
                <i className="fa-solid fa-school text-2xl md:text-3xl"></i>
             </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2 md:mb-4 tracking-tighter">EduConnect Pro</h1>
            <p className="text-sm md:text-lg text-slate-600 dark:text-slate-400">Selecione o seu perfil para entrar no sistema</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {profiles.map((profile) => (
              <button
                key={profile.role}
                onClick={() => setSelectedRole(profile.role)}
                className="group bg-white dark:bg-slate-900 p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center"
              >
                <div className={`w-10 h-10 md:w-12 md:h-12 ${profile.color} text-white rounded-xl flex items-center justify-center mb-3 md:mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <i className={`fa-solid ${profile.icon} text-base md:text-lg`}></i>
                </div>
                <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1 leading-tight">{profile.role}</h2>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">{profile.desc}</p>
              </button>
            ))}
          </div>
          
          <div className="mt-10 md:mt-12 text-center">
            <a href="#/pre-inscricao" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline text-sm">Novo Aluno? Pré-inscrição online</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 md:p-6 transition-colors duration-300">
      <div className="bg-white dark:bg-slate-900 max-w-md w-full p-8 md:p-10 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 relative animate-fadeIn">
        <button onClick={() => setSelectedRole(null)} className="absolute top-6 left-6 text-slate-400 hover:text-indigo-600 transition-colors">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        
        <div className="text-center mb-8">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
            <i className={`fa-solid ${profiles.find(p => p.role === selectedRole)?.icon} text-xl md:text-2xl`}></i>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Entrar como {selectedRole}</h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm">Insira as suas credenciais de acesso</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-1.5">E-mail ou Utilizador</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
              placeholder="ex: joao.silva"
              value={credentials.user}
              onChange={e => setCredentials({...credentials, user: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-1.5">Palavra-passe</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
              placeholder="••••••••"
              value={credentials.pass}
              onChange={e => setCredentials({...credentials, pass: e.target.value})}
            />
          </div>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest text-xs py-4 rounded-xl shadow-lg shadow-indigo-600/30 transition-all">
            Entrar no Portal
          </button>
        </form>

        <div className="mt-8 text-center">
          <a href="#" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-indigo-500">Esqueceu-se da palavra-passe?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
