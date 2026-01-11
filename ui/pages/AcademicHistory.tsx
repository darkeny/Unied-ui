
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const mockHistory = [
  { year: '2023', classLevel: '11º', team: 'B', subject: 'Matemática A', avg: 15.2, result: 'Aprovado' },
  { year: '2023', classLevel: '11º', team: 'B', subject: 'Português', avg: 16.8, result: 'Aprovado' },
  { year: '2023', classLevel: '11º', team: 'B', subject: 'Física', avg: 12.0, result: 'Aprovado' },
  { year: '2022', classLevel: '10º', team: 'C', subject: 'Matemática A', avg: 14.5, result: 'Aprovado' },
  { year: '2022', classLevel: '10º', team: 'C', subject: 'História', avg: 18.2, result: 'Aprovado' },
  { year: '2022', classLevel: '10º', team: 'C', subject: 'Geografia', avg: 17.0, result: 'Aprovado' },
];

const AcademicHistory: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{t('history.title')}</h1>
        <p className="text-slate-500 dark:text-slate-400">{user?.name} &bull; MZ-ID: 2024-STUDENT</p>
      </div>

      <div className="space-y-8">
        {[...new Set(mockHistory.map(item => item.year))].sort().reverse().map(year => (
          <section key={year} className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="px-8 py-6 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
               <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-widest flex items-center gap-3">
                  <i className="fa-solid fa-calendar-check text-indigo-500"></i>
                  Ano Letivo {year}
               </h3>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {mockHistory.find(h => h.year === year)?.classLevel} Classe &bull; Turma {mockHistory.find(h => h.year === year)?.team}
               </span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-50 dark:border-slate-800">
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('grades.th_subject')}</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">{t('history.final_avg')}</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">{t('history.result')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {mockHistory.filter(h => h.year === year).map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group">
                      <td className="px-8 py-5 text-sm font-bold text-slate-800 dark:text-slate-200">{item.subject}</td>
                      <td className="px-8 py-5 text-center">
                         <span className="inline-block px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-black text-xs">
                           {item.avg.toFixed(1)}
                         </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                         <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                            item.result === 'Aprovado' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400'
                         }`}>
                           {item.result === 'Aprovado' ? t('history.pass') : t('history.fail')}
                         </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default AcademicHistory;
