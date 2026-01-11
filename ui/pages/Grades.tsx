
import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { useLanguage } from '../context/LanguageContext';

const initialMockGrades = [
  { id: '1', studentId: 'S01', studentName: 'João Silva', subject: 'Matemática A', score: 14.5, date: '2024-03-10', year: '2024', classLevel: '12º', team: 'A', quarter: '1º' },
  { id: '2', studentId: 'S01', studentName: 'João Silva', subject: 'Português', score: 17.2, date: '2024-03-12', year: '2024', classLevel: '12º', team: 'A', quarter: '1º' },
  { id: '3', studentId: 'S02', studentName: 'Ana Pereira', subject: 'Matemática A', score: 18.0, date: '2024-03-10', year: '2024', classLevel: '12º', team: 'A', quarter: '1º' },
];

const mockStudentsList = [
  { id: 'S01', name: 'João Silva' },
  { id: 'S02', name: 'Ana Pereira' },
  { id: 'S03', name: 'Miguel Santos' },
  { id: 'S04', name: 'Carla Dias' },
];

const Grades: React.FC = () => {
  const { user } = useAuth();
  const { t, lang } = useLanguage();
  const [grades, setGrades] = useState(initialMockGrades);
  const [showModal, setShowModal] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    year: '2024',
    classLevel: '12º',
    team: 'A',
    quarter: '1º',
    subject: '',
    studentId: '',
    score: '',
    obs: ''
  });

  const [filters, setFilters] = useState({
    year: '2024',
    classLevel: 'Todas',
    team: 'Todas',
    quarter: 'Todos',
    studentId: '',
    search: ''
  });

  const isTeacher = user?.role === UserRole.TEACHER;
  const isStudent = user?.role === UserRole.STUDENT;
  const isParent = user?.role === UserRole.PARENT;
  const isRestricted = isStudent || isParent;

  const filteredGrades = useMemo(() => {
    return grades.filter(grade => {
      // If student or parent, only see specific grades (mock logic uses studentName 'João')
      if (isRestricted && !grade.studentName.toLowerCase().includes('joão')) return false;
      
      const matchYear = filters.year === 'Todos' || grade.year === filters.year;
      const matchSearch = grade.subject.toLowerCase().includes(filters.search.toLowerCase());
      const matchQuarter = filters.quarter === 'Todos' || grade.quarter === filters.quarter;
      
      return matchYear && matchSearch && matchQuarter;
    });
  }, [filters, isRestricted, grades]);

  const handlePostGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isTeacher) return;

    // Validation
    if (!formData.subject || !formData.studentId || formData.score === '') {
      alert(t('gen.error'));
      return;
    }

    const scoreNum = parseFloat(formData.score);
    if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 20) {
      alert("A nota deve estar entre 0 e 20");
      return;
    }

    const student = mockStudentsList.find(s => s.id === formData.studentId);

    const newGrade = {
      id: Math.random().toString(36).substr(2, 9),
      studentId: formData.studentId,
      studentName: student?.name || 'Desconhecido',
      subject: formData.subject,
      score: scoreNum,
      date: new Date().toISOString().split('T')[0],
      year: formData.year,
      classLevel: formData.classLevel,
      team: formData.team,
      quarter: formData.quarter
    };

    setGrades([newGrade, ...grades]);
    setShowModal(false);
    setFormData({ ...formData, score: '', obs: '', studentId: '' });
    alert(t('grades.form_success'));
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{t('grades.title')}</h1>
          <p className="text-slate-500 dark:text-slate-400">
            {isRestricted ? t('grades.subtitle_student') : t('grades.subtitle_staff')}
          </p>
        </div>
        {isTeacher && (
          <button 
            onClick={() => setShowModal(true)}
            className="w-full md:w-auto bg-indigo-600 text-white px-5 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-700 shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-plus"></i>
            {t('grades.btn_add')}
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 mb-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-1.5 tracking-widest">{t('grades.filter_year')}</label>
            <select 
              className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-3 py-2.5 text-xs font-bold dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              value={filters.year}
              onChange={e => setFilters({...filters, year: e.target.value})}
            >
              <option>2024</option>
              <option>2023</option>
              <option value="Todos">{t('gen.all')}</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-1.5 tracking-widest">{t('grades.filter_class')}</label>
            <select 
              className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-3 py-2.5 text-xs font-bold dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              value={filters.classLevel}
              onChange={e => setFilters({...filters, classLevel: e.target.value})}
            >
              <option value="Todas">{t('gen.all_f')}</option>
              <option>12º</option>
              <option>11º</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-1.5 tracking-widest">{t('grades.filter_quarter')}</label>
            <select 
              className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-3 py-2.5 text-xs font-bold dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              value={filters.quarter}
              onChange={e => setFilters({...filters, quarter: e.target.value})}
            >
              <option value="Todos">{t('gen.all')}</option>
              <option>1º</option>
              <option>2º</option>
              <option>3º</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-1.5 tracking-widest">{t('grades.search_subject')}</label>
            <div className="relative">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              <input 
                type="text" 
                placeholder={t('gen.search')}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-xs font-bold dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                value={filters.search}
                onChange={e => setFilters({...filters, search: e.target.value})}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('grades.th_quarter')}</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('grades.th_subject')}</th>
                {!isRestricted && <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('grades.th_student')}</th>}
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">{t('grades.th_score')}</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">{t('grades.th_actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredGrades.map((grade) => (
                <tr key={grade.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg text-[9px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest">
                      {grade.quarter} {lang === 'pt' ? 'Trim.' : 'Quart.'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-sm text-slate-800 dark:text-slate-200">{grade.subject}</td>
                  {!isRestricted && <td className="px-6 py-4 text-xs font-bold text-slate-700 dark:text-slate-300">{grade.studentName}</td>}
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-block w-12 py-1.5 rounded-xl font-black text-xs shadow-sm ${grade.score >= 10 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                      {grade.score.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><i className="fa-solid fa-comment-dots"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Post Grade Modal */}
      {showModal && isTeacher && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[40px] p-8 md:p-10 shadow-2xl border border-slate-100 dark:border-slate-800 animate-scaleIn overflow-y-auto max-h-[90vh] custom-scrollbar">
             <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">{t('grades.form_title')}</h3>
                  <p className="text-xs text-slate-500 mt-1 uppercase font-bold tracking-widest">{user?.name} &bull; {formData.year}</p>
                </div>
                <button onClick={() => setShowModal(false)} className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-rose-500 transition-all flex items-center justify-center">
                   <i className="fa-solid fa-xmark text-lg"></i>
                </button>
             </div>

             <form onSubmit={handlePostGrade} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1.5">{t('grades.form_subject')}</label>
                      <select 
                        required
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none dark:text-white font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        value={formData.subject}
                        onChange={e => setFormData({...formData, subject: e.target.value})}
                      >
                         <option value="">{t('gen.search')}...</option>
                         <option>Matemática A</option>
                         <option>Português</option>
                         <option>Física</option>
                         <option>Química</option>
                      </select>
                   </div>
                   <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1.5">{t('grades.th_student')}</label>
                      <select 
                        required
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none dark:text-white font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        value={formData.studentId}
                        onChange={e => setFormData({...formData, studentId: e.target.value})}
                      >
                         <option value="">Selecionar aluno...</option>
                         {mockStudentsList.map(s => (
                           <option key={s.id} value={s.id}>{s.name}</option>
                         ))}
                      </select>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1.5">{t('grades.filter_quarter')}</label>
                      <select 
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none dark:text-white font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        value={formData.quarter}
                        onChange={e => setFormData({...formData, quarter: e.target.value})}
                      >
                         <option>1º</option>
                         <option>2º</option>
                         <option>3º</option>
                      </select>
                   </div>
                   <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1.5">{t('grades.filter_team')}</label>
                      <select 
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none dark:text-white font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        value={formData.team}
                        onChange={e => setFormData({...formData, team: e.target.value})}
                      >
                         <option>A</option>
                         <option>B</option>
                         <option>C</option>
                      </select>
                   </div>
                   <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1.5">{t('grades.form_score')}</label>
                      <input 
                        required
                        type="number" 
                        step="0.1"
                        min="0"
                        max="20"
                        placeholder="0.0"
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none dark:text-white font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        value={formData.score}
                        onChange={e => setFormData({...formData, score: e.target.value})}
                      />
                   </div>
                </div>

                <div>
                   <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1.5">{t('grades.form_obs')}</label>
                   <textarea 
                     rows={3}
                     className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none dark:text-white text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                     placeholder="..."
                     value={formData.obs}
                     onChange={e => setFormData({...formData, obs: e.target.value})}
                   ></textarea>
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
                      {t('grades.form_submit')}
                   </button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Grades;
