
import React, { useState } from 'react';
import { User, UserRole } from '../types';

const mockUsers: User[] = [
  { id: '1', name: 'Admin Geral', role: UserRole.SYSTEM_ADMIN, email: 'admin@edu.mz' },
  { id: '2', name: 'Alberto Matsinhe', role: UserRole.TEACHER, email: 'alberto@edu.mz' },
  { id: '3', name: 'Dra. Luísa Langa', role: UserRole.PEDAGOGICAL, email: 'luisa@edu.mz' },
  { id: '4', name: 'Fátima Beira', role: UserRole.FINANCIAL, email: 'fatima@edu.mz' },
];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState(mockUsers);

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Gestão de Usuários</h1>
          <p className="text-slate-500 dark:text-slate-400">Controlo de acessos, permissões e perfis do sistema.</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2">
          <i className="fa-solid fa-user-plus"></i>
          Novo Usuário
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
            <tr>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nome / E-mail</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Função (Role)</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Estado</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors group">
                <td className="px-6 py-4">
                   <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{u.name}</p>
                   <p className="text-[10px] text-slate-400">{u.email}</p>
                </td>
                <td className="px-6 py-4">
                   <span className="px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-black rounded uppercase">
                      {u.role}
                   </span>
                </td>
                <td className="px-6 py-4">
                   <span className="inline-flex items-center gap-1.5 text-xs text-emerald-500 font-bold">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                      Ativo
                   </span>
                </td>
                <td className="px-6 py-4 text-right">
                   <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><i className="fa-solid fa-key"></i></button>
                      <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><i className="fa-solid fa-pen"></i></button>
                      <button className="p-2 text-slate-400 hover:text-rose-500 transition-colors"><i className="fa-solid fa-ban"></i></button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
