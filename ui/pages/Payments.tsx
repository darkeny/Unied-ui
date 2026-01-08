
import React from 'react';

const mockPayments = [
  { id: '1', desc: 'Mensalidade - Março 2024', date: '2024-03-05', amount: 12500.00, status: 'Pago', method: 'M-Pesa' },
  { id: '2', desc: 'Mensalidade - Fevereiro 2024', date: '2024-02-05', amount: 12500.00, status: 'Pago', method: 'E-Mola' },
  { id: '3', desc: 'Seguro Escolar Anual', date: '2024-01-15', amount: 2500.00, status: 'Pago', method: 'Transferência' },
  { id: '4', desc: 'Mensalidade - Abril 2024', date: '2024-04-05', amount: 12500.00, status: 'Pendente', method: '-' },
];

const Payments: React.FC = () => {
  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Pagamentos e Propinas</h1>
        <p className="text-slate-500 dark:text-slate-400">Histórico de transações e saldos pendentes (MT).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 p-8 rounded-[32px] text-white shadow-xl shadow-indigo-600/20">
          <p className="text-indigo-100 text-[10px] font-black uppercase tracking-widest mb-1">Próximo Vencimento</p>
          <p className="text-3xl font-black mb-6">12,500.00 MT</p>
          <div className="flex items-center gap-2 text-xs font-black uppercase bg-white/10 w-fit px-3 py-1.5 rounded-xl border border-white/5">
            <i className="fa-solid fa-calendar"></i>
            05 de Abril
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
          <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Total Pago (2024)</p>
          <p className="text-3xl font-black text-slate-800 dark:text-white">27,500.00 MT</p>
          <p className="text-xs text-emerald-500 mt-4 font-bold flex items-center gap-1.5">
            <i className="fa-solid fa-circle-check"></i> Sem dívidas pendentes
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
          <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Método Preferencial</p>
          <div className="flex items-center gap-4 mt-3">
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-600 dark:text-indigo-400 transition-colors">
              <i className="fa-solid fa-credit-card text-xl"></i>
            </div>
            <div>
              <p className="text-sm font-black text-slate-800 dark:text-white">M-Pesa / Mobile</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Ativo desde 10 Jan</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/30 dark:bg-slate-800/20 transition-colors">
          <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-widest text-sm">Histórico de Transações</h3>
          <button className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-2">
            <i className="fa-solid fa-file-pdf"></i>
            Baixar Extrato
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 transition-colors">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Descrição</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Data</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Método</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-right">Valor</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 transition-colors">
              {mockPayments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-8 py-5 text-sm font-black text-slate-800 dark:text-slate-200">{p.desc}</td>
                  <td className="px-8 py-5 text-sm text-slate-500 dark:text-slate-400">{p.date}</td>
                  <td className="px-8 py-5 text-sm text-slate-500 dark:text-slate-400 font-bold">{p.method}</td>
                  <td className="px-8 py-5 text-sm font-black text-slate-800 dark:text-white text-right">
                    {p.amount.toLocaleString('pt-MZ')} MT
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase shadow-sm ${
                      p.status === 'Pago' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'
                    }`}>
                      {p.status}
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
};

export default Payments;
