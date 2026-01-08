
import React, { useState } from 'react';

const steps = [
  'Dados Pessoais',
  'Encarregado',
  'Académico',
  'Documentos',
  'Revisão',
  'Concluído'
];

const EnrollmentWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    studentName: '',
    birthDate: '',
    idNumber: '',
    parentName: '',
    parentPhone: '',
    grade: '',
    course: ''
  });

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight">Dados Pessoais do Candidato</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Nome Completo</label>
                <input type="text" name="studentName" value={formData.studentName} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3.5 text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-colors" placeholder="Ex: João Baptista Silva" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Data de Nascimento</label>
                <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3.5 text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">BI ou Passaporte</label>
                <input type="text" name="idNumber" value={formData.idNumber} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3.5 text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-colors" placeholder="Número do documento" />
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight">Dados do Encarregado de Educação</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Nome Completo do Encarregado</label>
                <input type="text" name="parentName" value={formData.parentName} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3.5 text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Telemóvel (Moçambique)</label>
                <input type="text" name="parentPhone" value={formData.parentPhone} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3.5 text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-colors" placeholder="+258" />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight">Informações Académicas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Ano de Escolaridade</label>
                <select name="grade" value={formData.grade} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3.5 text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-colors">
                  <option value="">Selecionar nível...</option>
                  <option value="10">10º Ano</option>
                  <option value="11">11º Ano</option>
                  <option value="12">12º Ano</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Oferta Formativa / Curso</label>
                <select name="course" value={formData.course} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3.5 text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-colors">
                  <option value="">Selecionar curso...</option>
                  <option value="CT">Ciências e Tecnologias</option>
                  <option value="LH">Línguas e Humanidades</option>
                  <option value="AV">Artes Visuais</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight">Submissão de Documentos (PDF/JPG)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-[28px] p-8 text-center bg-slate-50/50 dark:bg-slate-800/20 hover:border-indigo-500 transition-all group">
                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-400 group-hover:text-indigo-600 transition-colors shadow-sm">
                   <i className="fa-solid fa-cloud-arrow-up text-xl"></i>
                </div>
                <p className="text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-tight">Identificação (BI)</p>
                <p className="text-[10px] text-slate-400 mt-1">Clique para selecionar</p>
                <input type="file" className="hidden" />
              </div>
              <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-[28px] p-8 text-center bg-slate-50/50 dark:bg-slate-800/20 hover:border-indigo-500 transition-all group">
                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-400 group-hover:text-indigo-600 transition-colors shadow-sm">
                   <i className="fa-solid fa-cloud-arrow-up text-xl"></i>
                </div>
                <p className="text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-tight">Certificado Habilitações</p>
                <p className="text-[10px] text-slate-400 mt-1">Clique para selecionar</p>
                <input type="file" className="hidden" />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight">Revisão e Confirmação</h3>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 space-y-4 text-sm transition-colors">
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Candidato</p>
                    <p className="font-black text-slate-800 dark:text-white">{formData.studentName || 'Não preenchido'}</p>
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Identificação</p>
                    <p className="font-black text-slate-800 dark:text-white">{formData.idNumber || 'Não preenchido'}</p>
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Encarregado</p>
                    <p className="font-black text-slate-800 dark:text-white">{formData.parentName || 'Não preenchido'}</p>
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Ano / Curso</p>
                    <p className="font-black text-slate-800 dark:text-white">{formData.grade ? `${formData.grade}º - ${formData.course}` : 'Não preenchido'}</p>
                 </div>
              </div>
            </div>
            <p className="text-xs text-slate-500 text-center px-8 italic">Ao finalizar, os dados serão enviados para processamento oficial da secretaria escolar.</p>
          </div>
        );
      case 5:
        return (
          <div className="text-center py-10 animate-scaleIn">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-[32px] mb-8 shadow-xl shadow-emerald-500/10">
              <i className="fa-solid fa-check-double text-4xl"></i>
            </div>
            <h3 className="text-3xl font-black text-slate-800 dark:text-white tracking-tighter mb-4">Matrícula Concluída!</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto font-medium">O registo foi processado com sucesso. O encarregado receberá um SMS de confirmação em instantes.</p>
            <button 
              onClick={() => setCurrentStep(0)} 
              className="mt-10 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-700 shadow-xl shadow-indigo-600/20 transition-all"
            >
              Nova Matrícula
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-[40px] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 transition-colors">
      {/* Progress Bar Container */}
      <div className="bg-slate-50 dark:bg-slate-800/50 px-8 py-8 border-b border-slate-100 dark:border-slate-800 transition-colors">
        <div className="flex justify-between mb-6">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-2xl flex items-center justify-center text-xs font-black transition-all shadow-sm ${
                currentStep >= idx ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
              }`}>
                {idx + 1}
              </div>
              <span className={`text-[9px] mt-2 font-black uppercase tracking-widest ${
                currentStep >= idx ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-600'
              } hidden sm:block`}>{step}</span>
            </div>
          ))}
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-700 ease-out shadow-lg"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="p-10">
        {renderStepContent()}

        {currentStep < 5 && (
          <div className="mt-12 flex justify-between border-t border-slate-50 dark:border-slate-800 pt-8 transition-colors">
            <button
              disabled={currentStep === 0}
              onClick={prevStep}
              className={`px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${
                currentStep === 0 ? 'bg-transparent text-slate-300 dark:text-slate-700 cursor-not-allowed' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              Anterior
            </button>
            <button
              onClick={nextStep}
              className="bg-indigo-600 text-white px-10 py-3 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-700 shadow-xl shadow-indigo-600/20 transition-all flex items-center gap-3"
            >
              {currentStep === 4 ? 'Finalizar' : 'Próximo'}
              <i className="fa-solid fa-arrow-right text-[10px]"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrollmentWizard;
