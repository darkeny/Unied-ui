
import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole, Teacher } from '../types';
import { useLanguage } from '../context/LanguageContext';

const initialMockTeachers: (Teacher & { year: string; classLevel: string; contact: string })[] = [
  { id: '1', name: 'Alberto Matsinhe', email: 'alberto@edu.mz', contact: '+258 84 111 2222', subjects: ['Matemática', 'Física'], classes: ['12A', '12B'], year: '2024', classLevel: '12º' },
  { id: '2', name: 'Maria Chivambo', email: 'maria@edu.mz', contact: '+258 84 333 4444', subjects: ['Português', 'Inglês'], classes: ['12A', '11B'], year: '2024', classLevel: '12º' },
  { id: '3', name: 'Carlos Sitoe', email: 'carlos@edu.mz', contact: '+258 84 555 6666', subjects: ['História', 'Geografia'], classes: ['11A', '10C'], year: '2024', classLevel: '11º' },
];

const ManageTeachers: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [teachersList, setTeachersList] = useState(initialMockTeachers);
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    subjects: '',
    classes: '',
    year: '2024',
    classLevel: '12º'
  });
  
  // Advanced Filters State
  const [filters, setFilters] = useState({
    name: '',
    classLevel: 'Todos',
    year: '2024',
    team: 'Todas'
  });

  const isManagement = user?.role === UserRole.SYSTEM_ADMIN || user?.role === UserRole.PEDAGOGICAL;

  const filteredTeachers = useMemo(() => {
    return teachersList.filter(t => {
      const matchName = t.name.toLowerCase().includes(filters.name.toLowerCase());
      const matchClass = filters.classLevel === 'Todos' || t.classLevel === filters.classLevel;
      const matchYear = filters.year === 'Todos' || t.year === filters.year;
      const matchTeam = filters.team === 'Todas' || t.classes.some(c => c.includes(filters.team));
      return matchName && matchClass && matchYear && matchTeam;
    });
  }, [filters, teachersList]);

  const handleCreateTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const newTeacher = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      email: formData.email,
      contact: formData.contact,
      subjects: formData.subjects.split(',').map(s => s.trim()),
      classes: formData.classes.split(',').map(c => c.trim()),
      year: formData.year,
      classLevel: formData.classLevel
    };

    setTeachersList([newTeacher, ...teachersList]);
    setShowModal(false);
    setFormData({ name: '', email: '', contact: '', subjects: '', classes: '', year: '2024', classLevel: '12º' });
    alert(t('teachers.form_success'));
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Corpo Docente</h1>
          <p className="text-slate-500 dark:text-slate-400">Controlo de professores, alocação de turmas e disciplinas.</p>
        </div>
        {isManagement && (
          <button 
            onClick={() => setShowModal(true)}
            className="w-full md:w-auto bg-indigo-600 text-white px-5 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-700 shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-user-plus"></i>
            {t('teachers.form_title')}
          </button>
        )}
      </div>

      {/* Advanced Filter Bar */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 shadow-sm transition-colors">
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{t('settings.name')}</label>
          <div className="relative">
             <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
             <input 
               type="text" 
               placeholder={t('gen.search')} 
               className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
               value={filters.name}
               onChange={e => setFilters({...filters, name: e.target.value})}
             />
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{t('grades.filter_class')}</label>
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
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{t('grades.filter_year')}</label>
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
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{t('grades.filter_team')}</label>
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
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Professor / Docente</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Disciplinas</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Turmas</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">{t('grades.th_actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredTeachers.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group">
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center font-black shadow-sm group-hover:scale-110 transition-transform">
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{t.name}</p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500">{t.email}</p>
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
                     <div className="flex justify-end gap-2">
                        {isManagement && (
                          <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><i className="fa-solid fa-pen"></i></button>
                        )}
                        <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><i className="fa-solid fa-calendar-day"></i></button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Teacher Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[40px] p-8 md:p-10 shadow-2xl border border-slate-100 dark:border-slate-800 animate-scaleIn overflow-y-auto max-h-[90vh] custom-scrollbar">
             <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">{t('teachers.form_title')}</h3>
                <button onClick={() => setShowModal(false)} className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-rose-500 transition-all flex items-center justify-center">
                   <i className="fa-solid fa-xmark text-lg"></i>
                </button>
             </div>

             <form onSubmit={handleCreateTeacher} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1.5">{t('settings.name')}</label>
                      <input 
                        required
                        type="text"
                        placeholder="Nome completo"
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none dark:text-white font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                   </div>
                   <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1.5">{t('settings.email')}</label>
                      <input 
                        required
                        type="email"
                        placeholder="exemplo@edu.mz"
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none dark:text-white font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1.5">{t('teachers.form_contact')}</label>
                      <input 
                        required
                        type="text"
                        placeholder="+258 8..."
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none dark:text-white font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        value={formData.contact}
                        onChange={e => setFormData({...formData, contact: e.target.value})}
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
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1.5">{t('teachers.form_subjects')}</label>
                      <input 
                        required
                        type="text"
                        placeholder="Matemática, Física..."
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none dark:text-white font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        value={formData.subjects}
                        onChange={e => setFormData({...formData, subjects: e.target.value})}
                      />
                   </div>
                   <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1.5">{t('nav.classes')} (IDs)</label>
                      <input 
                        required
                        type="text"
                        placeholder="12A, 11B..."
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none dark:text-white font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        value={formData.classes}
                        onChange={e => setFormData({...formData, classes: e.target.value})}
                      />
                   </div>
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
                     className="flex-2 sm:flex-[2] py-4 bg-indigo-600 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                   >
                      <i className="fa-solid fa-paper-plane"></i>
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

export default ManageTeachers;
