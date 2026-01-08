
import React, { useState } from 'react';
// Fixing named export errors from react-router-dom by using namespace import and destructuring.
import * as ReactRouterDOM from 'react-router-dom';
const { useParams, useNavigate } = ReactRouterDOM;
import { Student } from '../types';

const mockStudent: Student = {
  id: '1',
  name: 'Ana Pereira',
  birthDate: '2006-05-14',
  gender: 'F',
  address: 'Av. Eduardo Mondlane, Maputo',
  contacts: '+258 84 123 4567',
  classId: '12A',
  className: '12º Ano A',
  turn: 'Manhã',
  enrollmentStatus: 'Ativo',
  paymentStatus: 'Regular',
  docStatus: 'Completo',
  parentName: 'Fernando Pereira',
  parentContact: '+258 84 999 8888',
  parentAddress: 'Av. Eduardo Mondlane, Maputo',
  kinship: 'Pai',
  documents: [
    { name: 'Bilhete de Identidade', status: 'Validado' },
    { name: 'Certificado 10ª Classe', status: 'Validado' },
    { name: 'Fotos Tipo Passe', status: 'Validado' }
  ]
};

const StudentDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'personal' | 'guardian' | 'academic' | 'documents' | 'others'>('personal');

  const tabs = [
    { id: 'personal', label: 'Dados Pessoais', icon: 'fa-user' },
    { id: 'guardian', label: 'Encarregado', icon: 'fa-users' },
    { id: 'academic', label: 'Académico', icon: 'fa-graduation-cap' },
    { id: 'documents', label: 'Documentos', icon: 'fa-file-shield' },
    { id: 'others', label: 'Outras Informações', icon: 'fa-circle-info' },
  ];

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
          <i className="fa-solid fa-arrow-left text-xl"></i>
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Detalhes do Aluno</h1>
          <p className="text-slate-500 dark:text-slate-400">Perfil completo: {mockStudent.name}</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Profile Card */}
        <div className="lg:w-1/4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm text-center">
            <div className="w-24 h-24 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-black">
              {mockStudent.name.charAt(0)}
            </div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-1">{mockStudent.name}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{mockStudent.className}</p>
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
              mockStudent.enrollmentStatus === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
            }`}>
              {mockStudent.enrollmentStatus}
            </span>
            <div className="mt-6 pt-6 border-t border-slate-50 dark:border-slate-800 grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Pagamento</p>
                <p className={`text-xs font-bold ${mockStudent.paymentStatus === 'Regular' ? 'text-emerald-500' : 'text-rose-500'}`}>{mockStudent.paymentStatus}</p>
              </div>
              <div className="text-center border-l dark:border-slate-800">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Docs</p>
                <p className={`text-xs font-bold ${mockStudent.docStatus === 'Completo' ? 'text-indigo-500' : 'text-rose-500'}`}>{mockStudent.docStatus}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs and Content */}
        <div className="lg:flex-1">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="flex overflow-x-auto border-b dark:border-slate-800">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all border-b-2 whitespace-nowrap ${
                    activeTab === tab.id 
                      ? 'border-indigo-600 text-indigo-600' 
                      : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                  }`}
                >
                  <i className={`fa-solid ${tab.icon}`}></i>
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-8">
              {activeTab === 'personal' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
                  <InfoItem label="Nome Completo" value={mockStudent.name} />
                  <InfoItem label="Data de Nascimento" value={mockStudent.birthDate || 'N/D'} />
                  <InfoItem label="Sexo" value={mockStudent.gender === 'M' ? 'Masculino' : 'Feminino'} />
                  <InfoItem label="Contacto" value={mockStudent.contacts || 'N/D'} />
                  <div className="md:col-span-2">
                    <InfoItem label="Endereço" value={mockStudent.address || 'N/D'} />
                  </div>
                </div>
              )}

              {activeTab === 'guardian' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
                  <InfoItem label="Nome do Encarregado" value={mockStudent.parentName || 'N/D'} />
                  <InfoItem label="Grau de Parentesco" value={mockStudent.kinship || 'N/D'} />
                  <InfoItem label="Contacto Telemóvel" value={mockStudent.parentContact} />
                  <div className="md:col-span-2">
                    <InfoItem label="Endereço Residencial" value={mockStudent.parentAddress || 'N/D'} />
                  </div>
                </div>
              )}

              {activeTab === 'academic' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
                  <InfoItem label="Turma Atual" value={mockStudent.className || 'N/D'} />
                  <InfoItem label="Classe" value={mockStudent.className?.split(' ')[0] || 'N/D'} />
                  <InfoItem label="Turno" value={mockStudent.turn || 'N/D'} />
                  <InfoItem label="Número Interno" value={`MZ-2024-${mockStudent.id}`} />
                </div>
              )}

              {activeTab === 'documents' && (
                <div className="space-y-4 animate-fadeIn">
                   {mockStudent.documents?.map((doc, idx) => (
                     <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                        <div className="flex items-center gap-4">
                           <i className="fa-solid fa-file-pdf text-indigo-500 text-xl"></i>
                           <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{doc.name}</span>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-black rounded uppercase">
                           {doc.status}
                        </span>
                     </div>
                   ))}
                </div>
              )}

              {activeTab === 'others' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
                  <InfoItem label="Data de Matrícula" value="12/01/2024" />
                  <InfoItem label="Estado de Renovação" value="Não Aplicável" />
                  <InfoItem label="Situação Geral" value="Excelente comportamento e aproveitamento" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">{label}</p>
    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{value}</p>
  </div>
);

export default StudentDetails;
