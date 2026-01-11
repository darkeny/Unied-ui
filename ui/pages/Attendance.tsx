
import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { useLanguage } from '../context/LanguageContext';

const mockStudents = [
  { id: '1', name: 'João Silva', status: 'present' },
  { id: '2', name: 'Ana Pereira', status: 'present' },
  { id: '3', name: 'Miguel Santos', status: 'absent' },
  { id: '4', name: 'Carla Dias', status: 'present' },
];

const mockParentRecords = [
  { id: '1', date: '2024-03-10', subject: 'Matemática A', status: 'present', quarter: '1º' },
  { id: '2', date: '2024-03-11', subject: 'Português', status: 'present', quarter: '1º' },
  { id: '3', date: '2024-03-12', subject: 'Física', status: 'absent', quarter: '1º' },
  { id: '4', date: '2024-03-13', subject: 'Química', status: 'justified', quarter: '1º' },
];

const Attendance: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [students, setStudents] = useState(mockStudents);
  const [selectedClass, setSelectedClass] = useState('12º A');

  const [filters, setFilters] = useState({
    year: '2024',
    quarter: '1º',
    team: 'A'
  });

  const toggleAttendance = (id: string) => {
    setStudents(prev => prev.map(s => 
      s.id === id ? { ...s, status: s.status === 'present' ? 'absent' : 'present' } : s
    ));
  };

  const isTeacher = user?.role === UserRole.TEACHER || user?.role === UserRole.SYSTEM_ADMIN || user?.role === UserRole.PEDAGOGICAL;
  const isParent = user?.role === UserRole.PARENT;

  const renderParentView = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
           <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{t('grades.filter_year')}</label>
              <select 
                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-3 py-2 text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                value={filters.year}
                onChange={e => setFilters({...filters, year: e.target.value})}
              >
                 <option>2024</option>
                 <option>2023</option>
              </select>
           </div>
           <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{t('grades.filter_team')}</label>
              <select className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-3 py-2 text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
                 <option>12º Ano A</option>
              </select>
           </div>
           <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{t('grades.filter_quarter')}</label>
              <select 
                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-3 py-2 text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                value={filters.quarter}
                onChange={e => setFilters({...filters, quarter: e.target.value})}
              >
                 <option>1º</option>
                 <option>2º</option>
                 <option>3º</option>
              </select>
           </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('attendance.th_date')}</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('grades.th_subject')}</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">{t('attendance.th_status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {mockParentRecords.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="px-8 py-5 text-sm font-bold text-slate-800 dark:text-slate-200">{record.date}</td>
                  <td className="px-8 py-5 text-sm text-slate-600 dark:text-slate-400">{record.subject}</td>
                  <td className="px-8 py-5 text-right">
                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                      record.status === 'present' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      record.status === 'absent' ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400' :
                      'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                    }`}>
                      {t(`attendance.${record.status}`)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{t('nav.attendance')}</h1>
        <p className="text-slate-500 dark:text-slate-400">
          {isParent ? t('attendance.parent_subtitle') : 'Controlo de assiduidade diário por turma.'}
        </p>
      </div>

      {isParent ? renderParentView() : (
        <>
          <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 mb-8 transition-colors">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <div className="flex-1 min-w-[150px]">
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Turma</label>
                  <select 
                    value={selectedClass} 
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full border-none p-2.5 rounded-xl text-sm font-bold bg-slate-50 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                  >
                    <option>12º A</option>
                    <option>11º B</option>
                    <option>10º C</option>
                  </select>
                </div>
                <div className="flex-1 min-w-[150px]">
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Data</label>
                  <input 
                    type="date" 
                    className="w-full border-none p-2.5 rounded-xl text-sm font-bold bg-slate-50 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                    defaultValue={new Date().toISOString().split('T')[0]} 
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-6 w-full md:w-auto justify-center md:justify-end">
                <div className="text-center">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Presentes</p>
                  <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{students.filter(s => s.status === 'present').length}</p>
                </div>
                <div className="text-center border-l border-slate-100 dark:border-slate-800 pl-6">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Faltas</p>
                  <p className="text-2xl font-black text-red-500 dark:text-red-400">{students.filter(s => s.status === 'absent').length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[500px]">
                <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                  <tr>
                    <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Aluno</th>
                    <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Presença</th>
                    <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Falta</th>
                    <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Observações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 transition-colors">
                          <i className="fa-solid fa-user text-xs"></i>
                        </div>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{student.name}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          disabled={!isTeacher}
                          onClick={() => toggleAttendance(student.id)}
                          className={`w-7 h-7 rounded-xl border-2 transition-all flex items-center justify-center mx-auto ${
                            student.status === 'present' ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {student.status === 'present' && <i className="fa-solid fa-check text-xs"></i>}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          disabled={!isTeacher}
                          onClick={() => toggleAttendance(student.id)}
                          className={`w-7 h-7 rounded-xl border-2 transition-all flex items-center justify-center mx-auto ${
                            student.status === 'absent' ? 'bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/30' : 'border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {student.status === 'absent' && <i className="fa-solid fa-xmark text-xs"></i>}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                          <i className="fa-solid fa-comment-dots"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {isTeacher && (
            <div className="mt-8 flex justify-end">
              <button 
                onClick={() => alert('Assiduidade submetida com sucesso!')}
                className="w-full md:w-auto bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-indigo-700 shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
              >
                Submeter Presenças
                <i className="fa-solid fa-paper-plane text-sm"></i>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Attendance;
