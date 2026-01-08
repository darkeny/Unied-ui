
import React, { useState } from 'react';
// Fixing named export errors from react-router-dom by using namespace import and destructuring.
import * as ReactRouterDOM from 'react-router-dom';
const { useNavigate } = ReactRouterDOM;
import { Student } from '../types';

const mockStudents: Student[] = [
  { id: '1', name: 'Ana Pereira', classId: '12A', className: '12º Ano A', enrollmentStatus: 'Ativo', paymentStatus: 'Regular', docStatus: 'Completo', parentContact: '+258 84 123 4567' },
  { id: '2', name: 'João Silva', classId: '12A', className: '12º Ano A', enrollmentStatus: 'Ativo', paymentStatus: 'Pendente', docStatus: 'Completo', parentContact: '+258 82 987 6543' },
  { id: '3', name: 'Miguel Santos', classId: '11B', className: '11º Ano B', enrollmentStatus: 'Inscrito', paymentStatus: 'Atrasado', docStatus: 'Incompleto', parentContact: '+258 85 555 1111' },
  { id: '4', name: 'Carla Dias', classId: '10C', className: '10º Ano C', enrollmentStatus: 'Ativo', paymentStatus: 'Regular', docStatus: 'Completo', parentContact: '+258 87 222 3333' },
  { id: '5', name: 'Zélia Mutola', classId: '12A', className: '12º Ano A', enrollmentStatus: 'Ativo', paymentStatus: 'Regular', docStatus: 'Completo', parentContact: '+258 84 000 9999' },
];

const ManageStudents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filtered = mockStudents.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Gestão de Alunos</h1>
          <p className="text-slate-500 dark:text-slate-400">Controlo de matrículas, pagamentos e documentação.</p>
        </div>
        <div className="relative w-full md:w-72">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input 
            type="text" 
            placeholder="Procurar aluno..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm dark:text-white transition-all"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-5 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest whitespace-nowrap">Aluno</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Inscrição</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Pagamentos</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Documentos</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest whitespace-nowrap">Encarregado</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest text-right whitespace-nowrap">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-600 transition-colors">
                        <i className="fa-solid fa-user"></i>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{student.name}</p>
                        <p className="text-[10px] text-slate-500">{student.className}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                      student.enrollmentStatus === 'Ativo' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                    }`}>
                      {student.enrollmentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 font-black text-[10px] uppercase tracking-tighter ${
                      student.paymentStatus === 'Regular' ? 'text-emerald-500' : 'text-rose-500'
                    }`}>
                      <i className={`fa-solid ${student.paymentStatus === 'Regular' ? 'fa-circle-check' : 'fa-circle-exclamation'}`}></i>
                      {student.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black tracking-tighter ${
                      student.docStatus === 'Completo' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
                    }`}>
                      {student.docStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">
                    {student.parentContact}
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => navigate(`/students/${student.id}`)}
                        className="p-2.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-all" 
                        title="Ver Perfil"
                      >
                        <i className="fa-solid fa-eye text-sm"></i>
                      </button>
                      <button className="p-2.5 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-xl transition-all" title="Pagamentos">
                        <i className="fa-solid fa-file-invoice-dollar text-sm"></i>
                      </button>
                    </div>
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

export default ManageStudents;
