
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();

  const [profileData, setProfileData] = useState({
    email: user?.email || '',
    contact: '+258 84 000 0000',
  });

  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t('gen.confirm'));
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.new !== passwordData.confirm) {
      alert(t('gen.error'));
      return;
    }
    alert(t('gen.confirm'));
  };

  return (
    <div className="animate-fadeIn pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{t('settings.title')}</h1>
        <p className="text-slate-500 dark:text-slate-400">{t('settings.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profile and Preferences Section */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Profile Form */}
          <section className="bg-white dark:bg-slate-900 rounded-[32px] p-8 border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center">
                <i className="fa-solid fa-user-gear"></i>
              </div>
              <h2 className="text-lg font-black text-slate-800 dark:text-white tracking-tight">{t('settings.profile')}</h2>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                <div className="relative group">
                  <img 
                    src={user?.avatar} 
                    alt="Avatar" 
                    className="w-24 h-24 rounded-3xl object-cover border-4 border-slate-50 dark:border-slate-800 shadow-xl" 
                  />
                  <button type="button" className="absolute -bottom-2 -right-2 w-8 h-8 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <i className="fa-solid fa-camera text-xs"></i>
                  </button>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-sm font-black text-slate-800 dark:text-white">{user?.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest mt-1">{user?.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{t('settings.name')}</label>
                  <div className="relative">
                    <input 
                      disabled
                      type="text" 
                      value={user?.name}
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-400 dark:text-slate-500 cursor-not-allowed outline-none"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[8px] font-black text-slate-400 uppercase tracking-tighter">
                      {t('settings.readonly')}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{t('settings.id')}</label>
                  <div className="relative">
                    <input 
                      disabled
                      type="text" 
                      value={user?.id}
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-400 dark:text-slate-500 cursor-not-allowed outline-none"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[8px] font-black text-slate-400 uppercase tracking-tighter">
                      {t('settings.readonly')}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{t('settings.email')}</label>
                  <input 
                    type="email" 
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{t('settings.contact')}</label>
                  <input 
                    type="text" 
                    value={profileData.contact}
                    onChange={(e) => setProfileData({...profileData, contact: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-700 shadow-xl shadow-indigo-600/20 transition-all">
                  {t('settings.save')}
                </button>
              </div>
            </form>
          </section>

          {/* Preferences Grid */}
          <section className="bg-white dark:bg-slate-900 rounded-[32px] p-8 border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center">
                <i className="fa-solid fa-sliders"></i>
              </div>
              <h2 className="text-lg font-black text-slate-800 dark:text-white tracking-tight">{t('settings.preferences')}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Theme Toggle Card */}
              <div className="p-6 bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-100 dark:border-slate-800 transition-colors">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{t('settings.theme')}</p>
                <div className="flex gap-2 p-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <button 
                    onClick={() => theme !== 'light' && toggleTheme()}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black transition-all ${theme === 'light' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
                  >
                    <i className="fa-solid fa-sun text-sm"></i>
                    {t('nav.theme_light')}
                  </button>
                  <button 
                    onClick={() => theme !== 'dark' && toggleTheme()}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black transition-all ${theme === 'dark' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
                  >
                    <i className="fa-solid fa-moon text-sm"></i>
                    {t('nav.theme_dark')}
                  </button>
                </div>
              </div>

              {/* Language Toggle Card */}
              <div className="p-6 bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-100 dark:border-slate-800 transition-colors">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{t('settings.lang')}</p>
                <div className="flex gap-2 p-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <button 
                    onClick={() => setLang('pt')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black transition-all ${lang === 'pt' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
                  >
                    Português (PT)
                  </button>
                  <button 
                    onClick={() => setLang('en')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black transition-all ${lang === 'en' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
                  >
                    English (EN)
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Security Section */}
        <div className="lg:col-span-1">
          <section className="bg-white dark:bg-slate-900 rounded-[32px] p-8 border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-xl flex items-center justify-center">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <h2 className="text-lg font-black text-slate-800 dark:text-white tracking-tight">{t('settings.security')}</h2>
            </div>

            <form onSubmit={handleSavePassword} className="space-y-5">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{t('settings.current_pass')}</label>
                <input 
                  type="password" 
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3.5 text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-rose-500 transition-all"
                  placeholder="••••••••"
                  value={passwordData.current}
                  onChange={(e) => setPasswordData({...passwordData, current: e.target.value})}
                />
              </div>
              
              <hr className="border-slate-50 dark:border-slate-800" />

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{t('settings.new_pass')}</label>
                <input 
                  type="password" 
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3.5 text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="••••••••"
                  value={passwordData.new}
                  onChange={(e) => setPasswordData({...passwordData, new: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{t('settings.confirm_pass')}</label>
                <input 
                  type="password" 
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3.5 text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="••••••••"
                  value={passwordData.confirm}
                  onChange={(e) => setPasswordData({...passwordData, confirm: e.target.value})}
                />
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full bg-slate-800 dark:bg-slate-700 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 transition-all flex items-center justify-center gap-2">
                  <i className="fa-solid fa-lock text-xs"></i>
                  {t('settings.change_pass')}
                </button>
              </div>
            </form>
          </section>
        </div>

      </div>
    </div>
  );
};

export default Settings;
