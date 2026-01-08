
import React, { useState } from 'react';

const mockDocs = [
  { id: '1', name: 'Regulamento Interno 2024.pdf', type: 'PDF', size: '1.2 MB', date: '2024-01-01' },
  { id: '2', name: 'Calendário Académico MZ.pdf', type: 'PDF', size: '850 KB', date: '2024-01-15' },
  { id: '3', name: 'Lista de Material 12º Ano.pdf', type: 'PDF', size: '420 KB', date: '2024-02-05' },
];

const Documents: React.FC = () => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Gestão Documental</h1>
        <p className="text-slate-500 dark:text-slate-400">Repositório da escola e emissão de declarações digitais.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
            <h3 className="font-black text-slate-800 dark:text-white mb-6 flex items-center gap-3 text-lg">
              <i className="fa-solid fa-folder-tree text-amber-500"></i>
              Biblioteca de Documentos
            </h3>
            <div className="space-y-3">
              {mockDocs.map(doc => (
                <div key={doc.id} className="flex items-center justify-between p-5 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-white dark:hover:bg-slate-800 rounded-3xl transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-700 group">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-2xl flex items-center justify-center transition-colors">
                      <i className="fa-solid fa-file-pdf text-2xl"></i>
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{doc.name}</p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase mt-0.5">{doc.size} &bull; Adicionado em {doc.date}</p>
                    </div>
                  </div>
                  <button className="p-3 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white dark:bg-slate-700 rounded-xl shadow-sm transition-all border border-slate-100 dark:border-slate-600">
                    <i className="fa-solid fa-cloud-arrow-down"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
            <h3 className="font-black text-slate-800 dark:text-white mb-6 flex items-center gap-3 text-lg">
              <i className="fa-solid fa-stamp text-indigo-500"></i>
              Portal de Auto-Serviço
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DeclarationCard title="Declaração de Matrícula" desc="Confirma o vínculo do aluno com a instituição no ano letivo corrente." onClick={() => setShowPreview(true)} />
              <DeclarationCard title="Certificado de Notas" desc="Pauta oficial com o histórico de desempenho por trimestre." onClick={() => setShowPreview(true)} />
              <DeclarationCard title="Segunda Via de Diploma" desc="Solicitação de nova emissão do certificado de conclusão." onClick={() => setShowPreview(true)} />
              <DeclarationCard title="Cartão Escolar (MZ-ID)" desc="Pedido de emissão de novo cartão de acesso físico." onClick={() => setShowPreview(true)} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[40px] p-8 text-white shadow-2xl shadow-indigo-600/20">
            <h4 className="font-black text-xl mb-3 tracking-tighter">Dúvidas?</h4>
            <p className="text-sm text-indigo-100 mb-8 leading-relaxed opacity-90">Caso não encontre o documento ou declaração desejada, a nossa equipa de apoio está pronta para ajudar.</p>
            <button className="w-full py-4 bg-white text-indigo-700 font-black rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 text-sm shadow-xl">
              <i className="fa-solid fa-headset"></i>
              Secretaria Digital
            </button>
          </div>

          {showPreview && (
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] shadow-2xl border-2 border-indigo-200 dark:border-indigo-900/50 animate-fadeIn transition-colors">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-black text-slate-800 dark:text-white text-sm uppercase tracking-widest">Pré-visualização</h4>
                <button onClick={() => setShowPreview(false)} className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-rose-500 transition-all">
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div className="aspect-[1/1.4] bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-[24px] p-6 text-[8px] text-slate-300 dark:text-slate-600 font-serif space-y-3 transition-colors">
                <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 mb-6"></div>
                <div className="space-y-2">
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800"></div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800"></div>
                    <div className="h-1.5 w-3/4 bg-slate-100 dark:bg-slate-800"></div>
                </div>
                <div className="mt-12 space-y-1 text-center">
                  <div className="h-1 w-1/2 bg-slate-200 dark:bg-slate-800 mx-auto"></div>
                  <div className="h-1 w-1/3 bg-slate-100 dark:bg-slate-800 mx-auto"></div>
                </div>
              </div>
              <button className="w-full mt-6 py-4 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-600/20 transition-all">
                Imprimir Documento
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DeclarationCard: React.FC<{ title: string, desc: string, onClick: () => void }> = ({ title, desc, onClick }) => (
  <button onClick={onClick} className="text-left p-6 rounded-[28px] border border-slate-100 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-all group bg-white dark:bg-slate-900/50">
    <h4 className="text-sm font-black text-slate-800 dark:text-slate-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{title}</h4>
    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{desc}</p>
  </button>
);

export default Documents;
