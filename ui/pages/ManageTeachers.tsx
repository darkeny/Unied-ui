
import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole, Teacher } from '../types';

const mockTeachers: (Teacher & { year: string; classLevel: string })[] = [
  { id: '1', name: 'Alberto Matsinhe', email: 'alberto@edu.mz', subjects: ['Matemática', 'Física'], classes: ['12A', '12B'], year: '2024', classLevel: '12º' },
  { id: '2', name: 'Maria Chivambo', email: 'maria@edu.mz', subjects: ['Português', 'Inglês'], classes: ['12A', '11B'], year: '2024', classLevel: '12º' },
  { id: '3', name: 'Carlos Sitoe', email: 'carlos@edu.mz', subjects: ['História', 'Geografia'], classes: ['11A', '10C'], year: '2024', classLevel: '11º' },
  { id: '4', name: 'Ana Langa', email: 'ana@edu.mz', subjects: ['Artes', 'Desenho'], classes: ['10A', '10B'], year: '2023', classLevel: '10º' },
];

const ManageTeachers: React.FC = () => {
  const { user } = useAuth();
  
  // Advanced Filters State
  const [filters, setFilters] = useState({
    name: '',
    classLevel: 'Todos',
    year: '2024',
    team: 'Todas'
  });

  const isSystemAdmin = user?.role === UserRole.SYSTEM_ADMIN;

  const filteredTeachers = useMemo(() => {
    return mockTeachers.filter(t => {
      const matchName = t.name.toLowerCase().includes(filters.name.toLowerCase());
      const matchClass = filters.classLevel === 'Todos' || t.classLevel === filters.classLevel;
      const matchYear = filters.year === 'Todos' || t.year === filters.year;
      const matchTeam = filters.team === 'Todas' || t.classes.some(c => c.includes(filters.team));
      return matchName && matchClass && matchYear && matchTeam;
    });
  }, [filters]);

  return (
    <div className="animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Gestão Administrativa de Professores</h1>
          <p className="text-slate-500 dark:text-slate-400">Controlo de corpo docente, alocação de turmas e disciplinas.</p>
        </div>
        {isSystemAdmin && (
          <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/20">
            <i className="fa-solid fa-user-plus"></i>
            Adicionar Professor
          </button>
        )}
      </div>

      {/* Advanced Filter Bar */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 shadow-sm">
        <div className="lg:col-span-1">
          <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Nome do Professor</label>
          <div className="relative">
             <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
             <input 
               type="text" 
               placeholder="Pesquisar docente..." 
               className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
               value={filters.name}
               onChange={e => setFilters({...filters, name: e.target.value})}
             />
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Nível / Classe</label>
          <select 
            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-3 py-2 text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
            value={filters.classLevel}
            onChange={e => setFilters({...filters, classLevel: e.target.value})}
          >
            <option>Todos</option>
            <option>12º</option>
            <option>11º</option>
            <option>10º</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Ano Letivo</label>
          <select 
            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-3 py-2 text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
            value={filters.year}
            onChange={e => setFilters({...filters, year: e.target.value})}
          >
            <option>2024</option>
            <option>2023</option>
            <option>Todos</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Turma Específica</label>
          <select 
            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-3 py-2 text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
            value={filters.team}
            onChange={e => setFilters({...filters, team: e.target.value})}
          >
            <option>Todas</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Professor / Docente</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Disciplinas Ministradas</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Turmas Alocadas</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredTeachers.length > 0 ? filteredTeachers.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group">
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center font-black shadow-sm group-hover:scale-110 transition-transform">
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{t.name}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-500">{t.email}</p>
                        </div>
                     </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {t.subjects.map(s => (
                        <span key={s} className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[9px] rounded-lg font-black uppercase tracking-tighter border border-indigo-100 dark:border-indigo-800">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {t.classes.map(c => (
                        <span key={c} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[9px] rounded-lg font-black uppercase tracking-tighter border border-slate-200 dark:border-slate-700">
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                     <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" title="Editar Dados"><i className="fa-solid fa-user-pen"></i></button>
                        <button className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" title="Ver Horário"><i className="fa-solid fa-calendar-day"></i></button>
                        <button className="p-2 text-slate-400 hover:text-rose-500 transition-colors" title="Remover"><i className="fa-solid fa-user-minus"></i></button>
                     </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center text-slate-400 italic">
                    <div className="flex flex-col items-center gap-2">
                      <i className="fa-solid fa-users-slash text-4xl opacity-20 mb-2"></i>
                      <p className="font-bold">Nenhum docente encontrado com estes critérios.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageTeachers;
