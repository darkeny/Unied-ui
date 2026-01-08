
import React from 'react';
import EnrollmentWizard from '../components/EnrollmentWizard';

const Enrollment: React.FC = () => {
  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Nova Matrícula Online</h1>
        <p className="text-slate-500 dark:text-slate-400">Preencha o formulário passo a passo para registar um novo candidato.</p>
      </div>

      <EnrollmentWizard />
      
      <div className="mt-12 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/30 p-8 rounded-[40px] flex items-start gap-6 transition-colors shadow-sm">
        <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-800/50 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-indigo-200/50 dark:border-indigo-800">
          <i className="fa-solid fa-circle-info text-2xl"></i>
        </div>
        <div>
          <h4 className="text-indigo-800 dark:text-indigo-300 font-black mb-1.5 uppercase tracking-widest text-xs">Atenção à Documentação</h4>
          <p className="text-indigo-700 dark:text-indigo-400 text-sm leading-relaxed font-medium">
            Para que o processo de matrícula seja validado pela secretaria, certifique-se de que os uploads dos documentos (BI/Passaporte e Certificado) estão legíveis. 
            Em caso de divergência nos dados, o candidato será notificado via SMS para regularização presencial.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Enrollment;
