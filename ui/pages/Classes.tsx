
import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole, SchoolClass } from '../types';
import { useLanguage } from '../context/LanguageContext';

const initialMockClasses: (SchoolClass & { turn: string })[] = [
  { id: '1', name: '12º Ano A', year: '2024/2025', studentsCount: 32, teacherName: 'Prof. Alberto Matsinhe', turn: 'Manhã' },
  { id: '2', name: '12º Ano B', year: '2024/2025', studentsCount: 28, teacherName: 'Prof. Maria Chivambo', turn: 'Tarde' },
  { id: '3', name: '11º Ano A', year: '2024/2025', studentsCount: 35, teacherName: 'Prof. Carlos Sitoe', turn: 'Manhã' },
  { id: '4', name: '10º Ano C', year: '2024/2025', studentsCount: 40, teacherName: 'Prof. Ana Langa', turn: 'Noite' },
];

const Classes: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [classesList, setClassesList] = useState(initialMockClasses);
  const [showModal, setShowModal] = useState(false);
  
  // Create Form State
  const [formData, setFormData] = useState({
    name: '',
    classLevel: '12º',
    turn: 'Manhã',
    year: '2024/2025',
    teacher: ''
  });

  // Filters State
  const [filters, setFilters] = useState({
    classLevel: 'Todos',
    turn: 'Todos',
    year: '2024/2025',
    teacher: ''
  });

  const isManagement = user?.role === UserRole.SYSTEM_ADMIN || user?.role === UserRole.PEDAGOGICAL;

  const filteredClasses = useMemo(() => {
    return classesList.filter(c => {
      const matchLevel = filters.classLevel === 'Todos' || c.name.includes(filters.classLevel);
      const matchTurn = filters.turn === 'Todos' || c.turn === filters.turn;
      const matchYear = filters.year === 'Todos' || c.year === filters.year;
      const matchTeacher = c.teacherName?.toLowerCase().includes(filters.teacher.toLowerCase());
      return matchLevel && matchTurn && matchYear && matchTeacher;
    });
  }, [filters, classesList]);

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.teacher) return;

    const newClass = {
      id: Math.random().toString(36).substr(2, 9),
      name: `${formData.classLevel} ${formData.name}`,
      year: formData.year,
      studentsCount: 0,
      teacherName: formData.teacher,
      turn: formData.turn
    };

    setClassesList([newClass, ...classesList]);
    setShowModal(false);
    setFormData({ name: '', classLevel: '12º', turn: 'Manhã', year: '2024/2025', teacher: '' });
    alert(t('classes.form_success'));
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{t('nav.classes')}</h1>
          <p className="text-slate-500 dark:text-slate-400">Organização e consulta de turmas, turnos e alocações.</p>
        </div>
        {isManagement && (
          <button 
            onClick={() => setShowModal(true)}
            className="w-full md:w-auto bg-indigo-600 text-white px-5 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-700 shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-plus"></i>
            Nova Turma
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 mb-8 shadow-sm transition-colors">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{t('grades.filter_year')}</label>
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
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{t('grades.filter_class')}</label>
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
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Turno</label>
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
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{t('classes.form_teacher')}</label>
            <div className="relative">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              <input 
                type="text"
                placeholder={t('gen.search')}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                value={filters.teacher}
                onChange={e => setFilters({...filters, teacher: e.target.value})}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredClasses.map((item) => (
          <div key={item.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group flex flex-col min-h-[220px]">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center font-black text-lg group-hover:rotate-6 transition-transform">
                <i className="fa-solid fa-users-rectangle"></i>
              </div>
              <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                item.turn === 'Manhã' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
              }`}>
                {item.turn}
              </span>
            </div>
            
            <h3 className="text-lg font-black text-slate-800 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{item.name}</h3>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-6 flex items-center gap-1.5">
              <i className="fa-solid fa-chalkboard-user text-indigo-500"></i>
              DT: <span className="text-slate-600 dark:text-slate-400 truncate">{item.teacherName}</span>
            </p>

            <div className="mt-auto pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
              <div className="flex flex-col">
                <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest">Alunos</p>
                <p className="text-xl font-black text-slate-800 dark:text-white">{item.studentsCount}</p>
              </div>
              <div className="flex gap-2">
                {isManagement && (
                  <button className="p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-indigo-600 rounded-xl transition-all"><i className="fa-solid fa-pen"></i></button>
                )}
                <button className="p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-indigo-600 rounded-xl transition-all"><i className="fa-solid fa-eye"></i></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Class Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-[40px] p-8 md:p-10 shadow-2xl border border-slate-100 dark:border-slate-800 animate-scaleIn">
             <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">{t('classes.form_title')}</h3>
                <button onClick={() => setShowModal(false)} className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-rose-500 transition-all flex items-center justify-center">
                   <i className="fa-solid fa-xmark text-lg"></i>
                </button>
             </div>

             <form onSubmit={handleCreateClass} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1.5">{t('classes.form_name')}</label>
                      <input 
                        required
                        type="text"
                        placeholder="Ex: Ano A"
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none dark:text-white font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                   </div>
                   <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1.5">{t('grades.filter_class')}</label>
                      <select 
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none dark:text-white font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        value={formData.classLevel}
                        onChange={e => setFormData({...formData, classLevel: e.target.value})}
                      >
                         <option>12º</option>
                         <option>11º</option>
                         <option>10º</option>
                      </select>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1.5">Turno</label>
                      <select 
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none dark:text-white font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        value={formData.turn}
                        onChange={e => setFormData({...formData, turn: e.target.value})}
                      >
                         <option>Manhã</option>
                         <option>Tarde</option>
                         <option>Noite</option>
                      </select>
                   </div>
                   <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1.5">{t('grades.filter_year')}</label>
                      <select 
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none dark:text-white font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        value={formData.year}
                        onChange={e => setFormData({...formData, year: e.target.value})}
                      >
                         <option>2024/2025</option>
                         <option>2023/2024</option>
                      </select>
                   </div>
                </div>

                <div>
                   <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1.5">{t('classes.form_teacher')}</label>
                   <input 
                     required
                     type="text"
                     placeholder="Nome completo do professor"
                     className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none dark:text-white font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                     value={formData.teacher}
                     onChange={e => setFormData({...formData, teacher: e.target.value})}
                   />
                </div>

                <div className="pt-6 flex flex-col sm:flex-row gap-4">
                   <button 
                     type="button" 
                     onClick={() => setShowModal(false)}
                     className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-slate-200 transition-all"
                   >
                      {t('gen.cancel')}
                   </button>
                   <button 
                     type="submit" 
                     className="flex-2 sm:flex-[2] py-4 bg-indigo-600 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all"
                   >
                      {t('gen.confirm')}
                   </button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Classes;
