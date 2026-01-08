
import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole, SchoolClass } from '../types';

const mockClasses: (SchoolClass & { turn: string })[] = [
  { id: '1', name: '12º Ano A', year: '2024/2025', studentsCount: 32, teacherName: 'Prof. Alberto Matsinhe', turn: 'Manhã' },
  { id: '2', name: '12º Ano B', year: '2024/2025', studentsCount: 28, teacherName: 'Prof. Maria Chivambo', turn: 'Tarde' },
  { id: '3', name: '11º Ano A', year: '2024/2025', studentsCount: 35, teacherName: 'Prof. Carlos Sitoe', turn: 'Manhã' },
  { id: '4', name: '10º Ano C', year: '2024/2025', studentsCount: 40, teacherName: 'Prof. Ana Langa', turn: 'Noite' },
  { id: '5', name: '10º Ano A', year: '2023/2024', studentsCount: 38, teacherName: 'Prof. Ana Langa', turn: 'Manhã' },
];

const Classes: React.FC = () => {
  const { user } = useAuth();
  
  // Advanced Filters State
  const [filters, setFilters] = useState({
    classLevel: 'Todos',
    turn: 'Todos',
    year: '2024/2025',
    teacher: ''
  });

  const isManagement = user?.role === UserRole.SYSTEM_ADMIN || user?.role === UserRole.PEDAGOGICAL;

  const filteredClasses = useMemo(() => {
    return mockClasses.filter(c => {
      const matchLevel = filters.classLevel === 'Todos' || c.name.includes(filters.classLevel);
      const matchTurn = filters.turn === 'Todos' || c.turn === filters.turn;
      const matchYear = filters.year === 'Todos' || c.year === filters.year;
      const matchTeacher = c.teacherName?.toLowerCase().includes(filters.teacher.toLowerCase());
      return matchLevel && matchTurn && matchYear && matchTeacher;
    });
  }, [filters]);

  return (
    <div className="animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Gestão de Turmas</h1>
          <p className="text-slate-500 dark:text-slate-400">Organização e consulta de turmas, turnos e alocações.</p>
        </div>
        {user?.role === UserRole.SYSTEM_ADMIN && (
          <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/20">
            <i className="fa-solid fa-plus"></i>
            Nova Turma
          </button>
        )}
      </div>

      {/* Advanced Filter Bar */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 mb-8 shadow-sm">
        <div className="flex items-center gap-2 mb-4 text-slate-800 dark:text-slate-200 font-bold text-sm">
          <i className="fa-solid fa-sliders text-indigo-500"></i>
          Filtros de Turma
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Ano Letivo</label>
            <select 
              className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-3 py-2 text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              value={filters.year}
              onChange={e => setFilters({...filters, year: e.target.value})}
            >
              <option>2024/2025</option>
              <option>2023/2024</option>
              <option>Todos</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Classe</label>
            <select 
              className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-3 py-2 text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
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
            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Turno</label>
            <select 
              className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-3 py-2 text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              value={filters.turn}
              onChange={e => setFilters({...filters, turn: e.target.value})}
            >
              <option>Todos</option>
              <option>Manhã</option>
              <option>Tarde</option>
              <option>Noite</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Professor Responsável</label>
            <div className="relative">
              <i className="fa-solid fa-user-tie absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              <input 
                type="text"
                placeholder="Nome do DT..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                value={filters.teacher}
                onChange={e => setFilters({...filters, teacher: e.target.value})}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredClasses.length > 0 ? filteredClasses.map((item) => (
          <div key={item.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden flex flex-col">
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-600/5 rotate-45 translate-x-12 -translate-y-12 transition-transform group-hover:scale-150"></div>
            
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center font-black text-lg group-hover:rotate-6 transition-transform shadow-sm">
                {item.id}
              </div>
              <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm ${
                item.turn === 'Manhã' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : 
                item.turn === 'Tarde' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' :
                'bg-slate-800 text-white dark:bg-slate-700'
              }`}>
                {item.turn}
              </span>
            </div>
            
            <h3 className="text-lg font-black text-slate-800 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{item.name}</h3>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-6 flex items-center gap-1.5">
              <i className="fa-solid fa-chalkboard-user text-indigo-500"></i>
              DT: <span className="text-slate-600 dark:text-slate-400">{item.teacherName}</span>
            </p>

            <div className="mt-auto pt-6 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
              <div className="flex flex-col">
                <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-black tracking-widest">Capacidade</p>
                <div className="flex items-center gap-2 mt-1">
                   <p className="text-xl font-black text-slate-800 dark:text-white leading-none">{item.studentsCount}</p>
                   <span className="text-[10px] text-slate-400 font-bold">/ 45</span>
                </div>
              </div>
              <button 
                className="p-3 bg-slate-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                title="Ver lista de alunos e notas da turma"
              >
                <i className="fa-solid fa-users-viewfinder"></i>
              </button>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-20 text-center bg-white dark:bg-slate-900 rounded-[40px] border-2 border-dashed border-slate-100 dark:border-slate-800">
            <div className="flex flex-col items-center gap-4 text-slate-400 dark:text-slate-600">
               <i className="fa-solid fa-school-circle-exclamation text-5xl opacity-50"></i>
               <p className="text-lg font-bold">Nenhuma turma corresponde aos filtros.</p>
               <button 
                onClick={() => setFilters({ classLevel: 'Todos', turn: 'Todos', year: '2024/2025', teacher: '' })}
                className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
               >
                 Limpar todos os filtros
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Classes;
