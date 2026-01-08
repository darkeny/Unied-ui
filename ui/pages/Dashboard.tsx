
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockGradeHistory = [
  { name: 'Mat', score: 14 },
  { name: 'Port', score: 17 },
  { name: 'Ing', score: 15 },
  { name: 'Fis', score: 12 },
  { name: 'Qui', score: 13 },
  { name: 'Geo', score: 16 },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const renderStats = () => {
    switch (user?.role) {
      case UserRole.STUDENT:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <StatCard icon="fa-graduation-cap" label={t('dash.avg_grade')} value="14.5" color="text-indigo-600" />
            <StatCard icon="fa-calendar-check" label={t('dash.attendance')} value="92%" color="text-emerald-600" />
            <StatCard icon="fa-file-invoice-dollar" label={t('dash.next_payment')} value="12,500 MT" color="text-rose-600" />
            <StatCard icon="fa-clock" label={t('dash.today_classes')} value="4" color="text-amber-600" />
          </div>
        );
      case UserRole.TEACHER:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <StatCard icon="fa-users" label={t('dash.total_students')} value="124" color="text-indigo-600" />
            <StatCard icon="fa-chalkboard" label={t('dash.active_classes')} value="5" color="text-emerald-600" />
            <StatCard icon="fa-check-double" label={t('dash.grades_posted')} value="85%" color="text-amber-600" />
            <StatCard icon="fa-clock" label="Horas/Semana" value="22h" color="text-slate-600" />
          </div>
        );
      case UserRole.FINANCIAL:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <StatCard icon="fa-wallet" label={t('dash.revenue')} value="845,000 MT" color="text-indigo-600" />
            <StatCard icon="fa-circle-exclamation" label="Pai Pendentes" value="18" color="text-rose-600" />
            <StatCard icon="fa-money-bill-transfer" label="Pagamentos Hoje" value="142,000 MT" color="text-emerald-600" />
            <StatCard icon="fa-calendar-day" label="Vencimentos" value="Dia 05" color="text-amber-600" />
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <StatCard icon="fa-users" label="Total Utilizadores" value="1,240" color="text-indigo-600" />
            <StatCard icon="fa-school" label="Capacidade" value="94%" color="text-emerald-600" />
            <StatCard icon="fa-chart-pie" label="Taxa Sucesso" value="88%" color="text-amber-600" />
            <StatCard icon="fa-server" label="Status Sistema" value="Online" color="text-green-600" />
          </div>
        );
    }
  };

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{t('dash.welcome')}, {user?.name}!</h1>
        <p className="text-slate-500 dark:text-slate-400">{t('dash.subtitle')}</p>
      </div>

      {renderStats()}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-6">{t('dash.academic_perf')}</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockGradeHistory}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis domain={[0, 20]} stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    backgroundColor: '#1e293b',
                    color: '#fff'
                  }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="score" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">{t('dash.recent_activity')}</h3>
          <div className="space-y-4">
            <ActivityItem icon="fa-file-invoice" title="Pagamento confirmado" time="Há 2h" desc="Mensalidade processada: 12,500 MT." />
            <ActivityItem icon="fa-graduation-cap" title="Nota lançada" time="Há 5h" desc="Matemática (Teste 2) disponível." />
            <ActivityItem icon="fa-calendar-check" title="Presença" time="Há 1d" desc="Falta em Português justificada." />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: string, label: string, value: string, color: string }> = ({ icon, label, value, color }) => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center ${color}`}>
        <i className={`fa-solid ${icon} text-xl`}></i>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
        <p className="text-xl font-bold text-slate-800 dark:text-white leading-tight">{value}</p>
      </div>
    </div>
  </div>
);

const ActivityItem: React.FC<{ icon: string, title: string, time: string, desc: string }> = ({ icon, title, time, desc }) => (
  <div className="flex gap-4 p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors group">
    <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-center mb-0.5">
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">{title}</h4>
        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{time}</span>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{desc}</p>
    </div>
  </div>
);

export default Dashboard;
