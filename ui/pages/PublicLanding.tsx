
import React from 'react';

const PublicLanding: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans transition-colors duration-300">
      {/* Header */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto border-b border-slate-50 dark:border-slate-900">
        <div className="flex items-center gap-2 text-indigo-600 font-black text-2xl tracking-tighter">
           <i className="fa-solid fa-school"></i>
           EDUCONNECT
        </div>
        <div className="hidden md:flex gap-8 text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">
           <a href="#" className="hover:text-indigo-600 transition-colors">Início</a>
           <a href="#" className="hover:text-indigo-600 transition-colors">Cursos</a>
           <a href="#" className="hover:text-indigo-600 transition-colors">Sobre</a>
           <a href="#" className="hover:text-indigo-600 transition-colors">Contatos</a>
        </div>
        <a href="#/login" className="bg-indigo-600 text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-indigo-600/20 hover:scale-105 transition-transform">Portal Login</a>
      </nav>

      {/* Hero */}
      <main className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6 inline-block">Matrículas 2024/2025</span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] mb-8 tracking-tighter">
              Construa o seu <span className="text-indigo-600">futuro</span> hoje mesmo.
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 leading-relaxed max-w-lg">
              Educação de excelência para os desafios do novo milénio. Prepare-se para o sucesso académico e profissional com o EduConnect Pro.
            </p>
            <div className="flex gap-4">
               <button className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all">Começar Pré-Inscrição</button>
               <button className="border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-all">Ver Oferta Formativa</button>
            </div>
          </div>
          <div className="relative">
             <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>
             <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl"></div>
             <img 
               src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800" 
               alt="Alunos" 
               className="rounded-[40px] shadow-2xl relative z-10 border-8 border-white dark:border-slate-900"
             />
          </div>
        </div>
      </main>

      {/* Quick Pre-enrollment Section */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-24">
        <div className="max-w-4xl mx-auto px-8 text-center">
           <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Interessado em fazer parte?</h2>
           <p className="text-slate-500 dark:text-slate-400 mb-12">Deixe os seus dados e a nossa equipa de secretaria entrará em contacto.</p>
           
           <form className="bg-white dark:bg-slate-900 p-8 rounded-[32px] shadow-2xl border border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                 <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-widest">Nome do Candidato</label>
                 <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-100 dark:border-slate-800 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white" placeholder="Nome Completo" />
              </div>
              <div>
                 <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-widest">E-mail</label>
                 <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-100 dark:border-slate-800 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white" placeholder="email@exemplo.com" />
              </div>
              <div>
                 <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-widest">Telemóvel</label>
                 <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-100 dark:border-slate-800 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white" placeholder="+258 84..." />
              </div>
              <div>
                 <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-widest">Curso Pretendido</label>
                 <select className="w-full px-4 py-3 rounded-xl border border-slate-100 dark:border-slate-800 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white appearance-none">
                    <option>Ciências e Tecnologias</option>
                    <option>Línguas e Humanidades</option>
                    <option>Artes Visuais</option>
                 </select>
              </div>
              <button className="md:col-span-2 bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all mt-4">Submeter Candidatura</button>
           </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 dark:border-slate-900 text-center text-slate-400 text-sm">
         <div className="mb-6 text-indigo-600 font-black text-xl">EDUCONNECT PRO</div>
         <p>&copy; 2024 EduConnect Moçambique. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default PublicLanding;
