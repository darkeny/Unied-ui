
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole, PedagogicalBalance } from '../types';

const mockBalances: PedagogicalBalance[] = [
  { id: '1', classId: '12A', className: '12º Ano A', quarter: 1, teacherId: 'T01', teacherName: 'Alberto Matsinhe', content: 'A turma apresenta um desempenho acima da média, com 85% de aprovação no 1º trimestre...', status: 'Pendente', date: '2024-03-20' },
  { id: '2', classId: '11B', className: '11º Ano B', quarter: 1, teacherId: 'T02', teacherName: 'Maria Chivambo', content: 'Necessidade de reforço em Gramática Portuguesa para 40% dos alunos...', status: 'Aprovado', date: '2024-03-18' },
];

const PedagogicalBalancePage: React.FC = () => {
  const { user } = useAuth();
  const [balances, setBalances] = useState(mockBalances);
  const [showForm, setShowForm] = useState(false);
  
  const isPedagogical = user?.role === UserRole.PEDAGOGICAL || user?.role === UserRole.SYSTEM_ADMIN;
  const isTeacher = user?.role === UserRole.TEACHER;

  const approveBalance = (id: string) => {
    setBalances(prev => prev.map(b => b.id === id ? { ...b, status: 'Aprovado' } : b));
    alert('Balanço aprovado com sucesso!');
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Balanço Pedagógico</h1>
          <p className="text-slate-500 dark:text-slate-400">Controlo de desempenho por turma e trimestre.</p>
        </div>
        {isTeacher && (
          <button onClick={() => setShowForm(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2">
            <i className="fa-solid fa-plus"></i>
            Novo Balanço
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {balances.map((balance) => (
          <div key={balance.id} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center font-black">
                     Q{balance.quarter}
                  </div>
                  <div>
                     <h3 className="font-bold text-slate-800 dark:text-white">{balance.className}</h3>
                     <p className="text-xs text-slate-500">DT: {balance.teacherName} &bull; {balance.date}</p>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    balance.status === 'Aprovado' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {balance.status}
                  </span>
                  {isPedagogical && balance.status === 'Pendente' && (
                    <div className="flex gap-2">
                       <button onClick={() => approveBalance(balance.id)} className="bg-emerald-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-700">Aprovar</button>
                       <button className="bg-rose-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-rose-600">Rejeitar</button>
                    </div>
                  )}
                  {isPedagogical && balance.status === 'Aprovado' && (
                    <div className="flex gap-2">
                       <button className="text-indigo-600 dark:text-indigo-400 p-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg" title="Baixar Mini Pauta">
                          <i className="fa-solid fa-file-invoice"></i>
                       </button>
                       <button className="text-indigo-600 dark:text-indigo-400 p-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg" title="Baixar Pauta de Frequência">
                          <i className="fa-solid fa-list-check"></i>
                       </button>
                    </div>
                  )}
               </div>
            </div>
            
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
               <p className="text-sm text-slate-600 dark:text-slate-400 italic">"{balance.content}"</p>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
           <div className="bg-white dark:bg-slate-900 max-w-2xl w-full rounded-[32px] p-8 shadow-2xl animate-scaleIn">
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6">Submeter Balanço Pedagógico</h3>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowForm(false); alert('Balanço submetido!'); }}>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Turma</label>
                       <select className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 outline-none border-none dark:text-white font-bold">
                          <option>12º Ano A</option>
                          <option>11º Ano B</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Trimestre</label>
                       <select className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 outline-none border-none dark:text-white font-bold">
                          <option>1º Trimestre</option>
                          <option>2º Trimestre</option>
                          <option>3º Trimestre</option>
                       </select>
                    </div>
                 </div>
                 <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Relatório Geral</label>
                    <textarea rows={5} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 outline-none border-none dark:text-white" placeholder="Descreva o desempenho da turma, dificuldades encontradas e planos de ação..."></textarea>
                 </div>
                 <div className="flex gap-4 mt-6">
                    <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-4 text-slate-500 font-bold hover:bg-slate-100 rounded-2xl transition-all">Cancelar</button>
                    <button type="submit" className="flex-1 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all">Submeter Balanço</button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default PedagogicalBalancePage;
