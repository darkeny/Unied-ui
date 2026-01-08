
import React, { useState } from 'react';
import { Payment } from '../types';

const mockTransactions: Payment[] = [
  { id: '1', studentId: 'S01', studentName: 'João Silva', description: 'Mensalidade Março', amount: 12500, status: 'Pago', date: '2024-03-05', method: 'M-Pesa' },
  { id: '2', studentId: 'S02', studentName: 'Ana Pereira', description: 'Inscrição 12º Ano', amount: 8000, status: 'Pago', date: '2024-03-04', method: 'E-Mola' },
  { id: '3', studentId: 'S03', studentName: 'Miguel Santos', description: 'Mensalidade Março', amount: 12500, status: 'Atrasado', date: '2024-03-01', method: '-' },
  { id: '4', studentId: 'S04', studentName: 'Carla Dias', description: 'Fardamento Escolar', amount: 2500, status: 'Pendente', date: '2024-03-08', method: '-' },
];

const Finance: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPayModal, setShowPayModal] = useState(false);

  const filtered = mockTransactions.filter(tx => 
    (filterStatus === 'Todos' || tx.status === filterStatus) &&
    tx.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatMZN = (val: number) => val.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' }).replace('MZN', 'MT');

  return (
    <div className="animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Portal Financeiro</h1>
          <p className="text-slate-500 dark:text-slate-400">Controlo de faturação e fluxos de caixa.</p>
        </div>
        <button 
          onClick={() => setShowPayModal(true)}
          className="w-full md:w-auto bg-indigo-600 text-white px-6 py-3.5 rounded-2xl font-bold shadow-lg shadow-indigo-600/20 hover:scale-105 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-widest font-black"
        >
          <i className="fa-solid fa-plus text-xs"></i>
          Registar Pagamento
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard color="bg-indigo-600" label="Saldo em Caixa" value={formatMZN(1250000)} icon="fa-wallet" text="text-white" />
        <StatCard color="bg-white dark:bg-slate-900" label="Previsão Mensal" value={formatMZN(845000)} icon="fa-chart-pie" />
        <StatCard color="bg-white dark:bg-slate-900" label="Inadimplência" value="12.4%" icon="fa-triangle-exclamation" text="text-rose-500" />
        <StatCard color="bg-white dark:bg-slate-900" label="Pagos Hoje" value="18" icon="fa-circle-check" text="text-emerald-500" />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        <div className="p-4 md:p-6 border-b border-slate-50 dark:border-slate-800 flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
             <div className="relative flex-1 sm:w-64">
                <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input 
                  type="text" 
                  placeholder="Procurar aluno..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm dark:text-white border-none transition-all"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
             </div>
             <select 
               className="bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-2.5 text-sm font-bold border-none dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
               value={filterStatus}
               onChange={e => setFilterStatus(e.target.value)}
             >
                <option>Todos</option>
                <option>Pago</option>
                <option>Pendente</option>
                <option>Atrasado</option>
             </select>
          </div>
          <div className="flex gap-4 w-full sm:w-auto justify-center">
            <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">Extratos</button>
            <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">Faturação</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30 transition-colors">
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">ID Aluno</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Nome do Aluno</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Descrição</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right whitespace-nowrap">Valor</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Estado</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right whitespace-nowrap">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 transition-colors">
              {filtered.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors group">
                  <td className="px-6 py-4 text-xs text-slate-400 font-mono whitespace-nowrap">{tx.studentId}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">{tx.studentName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-xs text-slate-500 font-medium">{tx.description}</p>
                    <p className="text-[10px] text-slate-400">{tx.date}</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-black text-slate-800 dark:text-white text-right whitespace-nowrap">
                    {formatMZN(tx.amount)}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter shadow-sm ${
                      tx.status === 'Pago' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 
                      tx.status === 'Atrasado' ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400' : 
                      'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-all" title="Ver Histórico">
                        <i className="fa-solid fa-clock-rotate-left"></i>
                      </button>
                      <button className="p-2.5 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-xl transition-all" title="Emitir Recibo">
                        <i className="fa-solid fa-print"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showPayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[32px] p-6 md:p-8 shadow-2xl animate-scaleIn max-h-[95vh] overflow-y-auto">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Novo Pagamento</h3>
                <button onClick={() => setShowPayModal(false)} className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-rose-500 transition-all flex items-center justify-center">
                   <i className="fa-solid fa-xmark text-lg"></i>
                </button>
             </div>
             
             <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setShowPayModal(false); }}>
                <div>
                   <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1.5">Identificação do Aluno</label>
                   <input type="text" className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 outline-none border-none dark:text-white transition-all focus:ring-2 focus:ring-indigo-500" placeholder="Nome ou ID..." />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1.5">Valor (MT)</label>
                      <input type="number" className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 outline-none border-none dark:text-white transition-all focus:ring-2 focus:ring-indigo-500" placeholder="0,00" />
                   </div>
                   <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1.5">Tipo de Fatura</label>
                      <select className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 outline-none border-none dark:text-white font-bold transition-all focus:ring-2 focus:ring-indigo-500">
                         <option>Mensalidade</option>
                         <option>Inscrição</option>
                         <option>Fardamento</option>
                         <option>Seguro</option>
                      </select>
                   </div>
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1.5">Forma de Pagamento</label>
                   <div className="grid grid-cols-3 gap-2">
                      <PaymentMethodBtn icon="fa-mobile-screen" label="M-Pesa" />
                      <PaymentMethodBtn icon="fa-money-bill-transfer" label="TPA" />
                      <PaymentMethodBtn icon="fa-building-columns" label="Banco" />
                   </div>
                </div>
                <button type="submit" className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all mt-4 uppercase tracking-widest text-xs">
                   Confirmar Transação
                </button>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard: React.FC<{ icon: string; label: string; value: string; color: string; text?: string }> = ({ icon, label, value, color, text = "text-slate-800 dark:text-white" }) => (
  <div className={`${color} p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4 transition-all hover:scale-[1.02]`}>
     <div className={`w-12 h-12 rounded-2xl bg-slate-50/10 flex items-center justify-center text-xl ${color.includes('indigo') ? 'text-white' : 'text-indigo-600 dark:text-indigo-400 bg-slate-50 dark:bg-slate-800'}`}>
        <i className={`fa-solid ${icon}`}></i>
     </div>
     <div>
        <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{label}</p>
        <p className={`text-xl font-black ${text} leading-none`}>{value}</p>
     </div>
  </div>
);

const PaymentMethodBtn: React.FC<{ icon: string; label: string }> = ({ icon, label }) => (
  <button type="button" className="flex flex-col items-center gap-2 p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-indigo-500 transition-all group bg-white dark:bg-slate-900">
     <i className={`fa-solid ${icon} text-slate-400 group-hover:text-indigo-500 text-lg transition-colors`}></i>
     <span className="text-[9px] font-black uppercase tracking-tighter text-slate-500 group-hover:text-indigo-600 transition-colors">{label}</span>
  </button>
);

export default Finance;
