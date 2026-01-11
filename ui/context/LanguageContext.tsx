
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'pt' | 'en';

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

const translations: Translations = {
  // Sidebar & Navigation
  'nav.dashboard': { pt: 'Dashboard', en: 'Dashboard' },
  'nav.finance': { pt: 'Gestão Financeira', en: 'Financial Management' },
  'nav.classes': { pt: 'Turmas', en: 'Classes' },
  'nav.students': { pt: 'Alunos', en: 'Students' },
  'nav.teachers': { pt: 'Professores', en: 'Teachers' },
  'nav.pedagogical': { pt: 'Balanço Pedagógico', en: 'Pedagogical Balance' },
  'nav.grades': { pt: 'Notas', en: 'Grades' },
  'nav.attendance': { pt: 'Presenças', en: 'Attendance' },
  'nav.my_payments': { pt: 'Meus Pagamentos', en: 'My Payments' },
  'nav.documents': { pt: 'Documentos', en: 'Documents' },
  'nav.enrollment': { pt: 'Matrícula Online', en: 'Online Enrollment' },
  'nav.user_mgmt': { pt: 'Gestão de Usuários', en: 'User Management' },
  'nav.settings': { pt: 'Definições', en: 'Settings' },
  'nav.logout': { pt: 'Sair', en: 'Logout' },
  'nav.theme_light': { pt: 'Modo Claro', en: 'Light Mode' },
  'nav.theme_dark': { pt: 'Modo Escuro', en: 'Dark Mode' },
  'nav.academic_history': { pt: 'Histórico Académico', en: 'Academic History' },

  // Dashboard
  'dash.welcome': { pt: 'Olá', en: 'Hello' },
  'dash.subtitle': { pt: 'Bem-vindo ao seu painel de controlo pessoal.', en: 'Welcome to your personal control panel.' },
  'dash.avg_grade': { pt: 'Média Global', en: 'Global Average' },
  'dash.attendance': { pt: 'Presenças', en: 'Attendance' },
  'dash.next_payment': { pt: 'Próxima Mensalidade', en: 'Next Payment' },
  'dash.today_classes': { pt: 'Aulas Hoje', en: 'Classes Today' },
  'dash.total_students': { pt: 'Total Alunos', en: 'Total Students' },
  'dash.active_classes': { pt: 'Turmas Ativas', en: 'Active Classes' },
  'dash.grades_posted': { pt: 'Notas Lançadas', en: 'Grades Posted' },
  'dash.revenue': { pt: 'Receita Mensal', en: 'Monthly Revenue' },
  'dash.recent_activity': { pt: 'Atividade Recente', en: 'Recent Activity' },
  'dash.academic_perf': { pt: 'Desempenho Académico', en: 'Academic Performance' },

  // Grades Page
  'grades.title': { pt: 'Notas e Avaliações', en: 'Grades & Evaluations' },
  'grades.subtitle_student': { pt: 'Consulte o seu histórico académico por trimestre e ano.', en: 'Check your academic history by quarter and year.' },
  'grades.subtitle_staff': { pt: 'Gestão e consulta de registos académicos.', en: 'Management and consultation of academic records.' },
  'grades.filter_year': { pt: 'Ano Letivo', en: 'Academic Year' },
  'grades.filter_class': { pt: 'Classe', en: 'Grade' },
  'grades.filter_team': { pt: 'Turma', en: 'Section' },
  'grades.filter_quarter': { pt: 'Trimestre', en: 'Quarter' },
  'grades.search_subject': { pt: 'Pesquisar Disciplina', en: 'Search Subject' },
  'grades.btn_add': { pt: 'Lançar Nota', en: 'Post Grade' },
  'grades.th_quarter': { pt: 'Trimestre', en: 'Quarter' },
  'grades.th_subject': { pt: 'Disciplina', en: 'Subject' },
  'grades.th_student': { pt: 'Aluno', en: 'Student' },
  'grades.th_score': { pt: 'Nota', en: 'Grade' },
  'grades.th_actions': { pt: 'Ações', en: 'Actions' },
  'grades.form_title': { pt: 'Lançar Nova Nota', en: 'Post New Grade' },
  'grades.form_subject': { pt: 'Disciplina', en: 'Subject' },
  'grades.form_score': { pt: 'Nota (0-20)', en: 'Grade (0-20)' },
  'grades.form_obs': { pt: 'Observações (Opcional)', en: 'Observations (Optional)' },
  'grades.form_submit': { pt: 'Confirmar Lançamento', en: 'Confirm Grade' },
  'grades.form_success': { pt: 'Nota lançada com sucesso!', en: 'Grade posted successfully!' },

  // Classes Page
  'classes.form_title': { pt: 'Criar Nova Turma', en: 'Create New Class' },
  'classes.form_name': { pt: 'Nome da Turma', en: 'Class Name' },
  'classes.form_teacher': { pt: 'Professor Responsável', en: 'Lead Teacher' },
  'classes.form_success': { pt: 'Turma criada com sucesso!', en: 'Class created successfully!' },

  // Teachers Page
  'teachers.form_title': { pt: 'Adicionar Professor', en: 'Add Teacher' },
  'teachers.form_contact': { pt: 'Contacto', en: 'Contact' },
  'teachers.form_subjects': { pt: 'Disciplina(s)', en: 'Subject(s)' },
  'teachers.form_success': { pt: 'Professor adicionado com sucesso!', en: 'Teacher added successfully!' },

  // Attendance Page
  'attendance.parent_subtitle': { pt: 'Consulte o registo de assiduidade do seu educando.', en: 'Check your child\'s attendance records.' },
  'attendance.th_date': { pt: 'Data', en: 'Date' },
  'attendance.th_status': { pt: 'Estado', en: 'Status' },
  'attendance.present': { pt: 'Presente', en: 'Present' },
  'attendance.absent': { pt: 'Ausente', en: 'Absent' },
  'attendance.justified': { pt: 'Justificado', en: 'Justified' },

  // Academic History
  'history.title': { pt: 'Meu Percurso Académico', en: 'My Academic Journey' },
  'history.result': { pt: 'Resultado', en: 'Result' },
  'history.pass': { pt: 'Aprovado', en: 'Passed' },
  'history.fail': { pt: 'Reprovado', en: 'Failed' },
  'history.final_avg': { pt: 'Média Final', en: 'Final Average' },

  // Settings
  'settings.title': { pt: 'Definições da Conta', en: 'Account Settings' },
  'settings.subtitle': { pt: 'Gira as tuas preferências e informações pessoais.', en: 'Manage your personal info and preferences.' },
  'settings.profile': { pt: 'Perfil', en: 'Profile' },
  'settings.preferences': { pt: 'Preferências', en: 'Preferences' },
  'settings.security': { pt: 'Segurança', en: 'Security' },
  'settings.name': { pt: 'Nome', en: 'Name' },
  'settings.id': { pt: 'Código do Usuário', en: 'User ID' },
  'settings.email': { pt: 'Email', en: 'Email' },
  'settings.contact': { pt: 'Contacto', en: 'Contact' },
  'settings.theme': { pt: 'Tema da Aplicação', en: 'App Theme' },
  'settings.lang': { pt: 'Idioma do Sistema', en: 'System Language' },
  'settings.change_pass': { pt: 'Alterar Senha', en: 'Change Password' },
  'settings.current_pass': { pt: 'Senha Atual', en: 'Current Password' },
  'settings.new_pass': { pt: 'Nova Senha', en: 'New Password' },
  'settings.confirm_pass': { pt: 'Confirmar Nova Senha', en: 'Confirm New Password' },
  'settings.save': { pt: 'Guardar Alterações', en: 'Save Changes' },
  'settings.readonly': { pt: 'Apenas leitura', en: 'Read-only' },

  // General
  'gen.all': { pt: 'Todos', en: 'All' },
  'gen.all_f': { pt: 'Todas', en: 'All' },
  'gen.cancel': { pt: 'Cancelar', en: 'Cancel' },
  'gen.confirm': { pt: 'Confirmar', en: 'Confirm' },
  'gen.search': { pt: 'Procurar', en: 'Search' },
  'gen.loading': { pt: 'Carregando...', en: 'Loading...' },
  'gen.error': { pt: 'Erro', en: 'Error' },
  'gen.success': { pt: 'Sucesso', en: 'Success' },
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    return (localStorage.getItem('lang') as Language) || 'pt';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
  };

  const t = (key: string) => {
    if (!translations[key]) return key;
    return translations[key][lang];
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
