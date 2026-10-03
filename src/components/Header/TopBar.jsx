import React from 'react';
import { MapPin, HelpCircle, Package, Globe, ChevronDown, Sparkles, Sun, Moon } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { availableCities } from '../../data/pickupPoints';

export const TopBar = () => {
  const {
    selectedCity,
    setSelectedCity,
    language,
    setLanguage,
    setIsPickupPointsOpen,
    setIsOrdersOpen,
    isCitySelectOpen,
    setIsCitySelectOpen,
    theme,
    toggleTheme,
    t
  } = useShop();

  return (
    <div className="bg-[#f2f2f5] dark:bg-[#121216] border-b border-[#e8e8ed] dark:border-[#26262e] text-xs text-[#62656a] dark:text-[#9e9ea8] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 h-8 flex items-center justify-between">
        
        {/* Left Side: City & Delivery Points */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setIsCitySelectOpen(!isCitySelectOpen)}
              className="flex items-center gap-1.5 hover:text-[#059669] dark:hover:text-[#34d399] transition-colors py-1 font-medium"
            >
              <MapPin className="w-3.5 h-3.5 text-[#059669] dark:text-[#34d399]" />
              <span>{t('city')}: <strong className="text-[#141415] dark:text-white underline decoration-dashed decoration-[#c7c7d2] underline-offset-2">{selectedCity}</strong></span>
              <ChevronDown className="w-3 h-3 text-[#80808a]" />
            </button>

            {/* City Dropdown */}
            {isCitySelectOpen && (
              <div 
                className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-[#1e1e24] rounded-lg shadow-xl border border-[#e8e8ed] dark:border-[#2e2e38] py-2 z-50 animate-scale-in"
                onMouseLeave={() => setIsCitySelectOpen(false)}
              >
                <div className="px-3 py-1.5 text-[11px] font-semibold text-[#80808a] dark:text-gray-400 uppercase tracking-wider border-b border-[#f0f0f4] dark:border-[#2e2e38]">
                  {t('selectCity')}
                </div>
                <div className="max-h-56 overflow-y-auto py-1">
                  {availableCities.map(city => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setIsCitySelectOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs hover:bg-[#ebfdf2] dark:hover:bg-[#28203d] hover:text-[#059669] dark:hover:text-[#6ee7ab] transition-colors flex items-center justify-between ${
                        selectedCity === city ? 'font-bold text-[#059669] dark:text-[#6ee7ab] bg-[#ebfdf2] dark:bg-[#28203d]' : 'text-[#212121] dark:text-gray-200'
                      }`}
                    >
                      <span>{city}</span>
                      {selectedCity === city && <span className="w-1.5 h-1.5 rounded-full bg-[#059669] dark:bg-[#34d399]"></span>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Topshirish punktlari button */}
          <button
            onClick={() => setIsPickupPointsOpen(true)}
            className="hidden sm:flex items-center gap-1 hover:text-[#059669] dark:hover:text-[#34d399] transition-colors font-medium"
          >
            <span>{t('pickupPoints')}</span>
            <span className="bg-[#059669]/10 dark:bg-[#059669]/30 text-[#059669] dark:text-[#6ee7ab] text-[10px] px-1.5 py-0.5 rounded font-bold">{t('oneDay')}</span>
          </button>
        </div>

        {/* Center Banner text (Desktop) */}
        <div className="hidden md:flex items-center gap-1.5 text-[#059669] dark:text-[#6ee7ab] font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>{t('nasiyaBanner')}</span>
        </div>

        {/* Right Side: FAQ, Orders & 3 Languages & Theme */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white dark:bg-[#22222a] border border-[#e8e8ed] dark:border-[#2e2e38] text-xs font-semibold text-gray-700 dark:text-yellow-400 hover:border-[#059669] transition-all"
            title="Theme"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                <span className="text-[11px] text-gray-200 hidden sm:inline">{language === 'en' ? 'Light' : language === 'ru' ? 'Светлая' : "Yorug'"}</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-purple-600" />
                <span className="text-[11px] text-gray-700 hidden sm:inline">{language === 'en' ? 'Dark' : language === 'ru' ? 'Темная' : "Qorong'i"}</span>
              </>
            )}
          </button>

          <button 
            onClick={() => setIsOrdersOpen(true)}
            className="flex items-center gap-1 hover:text-[#059669] dark:hover:text-[#34d399] transition-colors"
          >
            <Package className="w-3.5 h-3.5 text-[#80808a]" />
            <span className="hidden sm:inline">{t('myOrders')}</span>
          </button>

          <a 
            href="#faq" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }}
            className="hidden lg:flex items-center gap-1 hover:text-[#059669] dark:hover:text-[#34d399] transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#80808a]" />
            <span>{t('faq')}</span>
          </a>

          {/* 3-Language Switcher: O'zb / Рус / Eng */}
          <div className="flex items-center gap-1 bg-white dark:bg-[#22222a] border border-[#e8e8ed] dark:border-[#2e2e38] rounded-md px-1.5 py-0.5">
            <Globe className="w-3 h-3 text-[#80808a]" />
            <button
              onClick={() => setLanguage('uz')}
              className={`px-1 py-0.5 rounded text-[11px] font-bold transition-colors ${
                language === 'uz' ? 'bg-[#059669] text-white' : 'text-[#62656a] dark:text-gray-400 hover:text-[#141415] dark:hover:text-white'
              }`}
            >
              O'zb
            </button>
            <span className="text-[#d0d0d8] dark:text-gray-600">|</span>
            <button
              onClick={() => setLanguage('ru')}
              className={`px-1 py-0.5 rounded text-[11px] font-bold transition-colors ${
                language === 'ru' ? 'bg-[#059669] text-white' : 'text-[#62656a] dark:text-gray-400 hover:text-[#141415] dark:hover:text-white'
              }`}
            >
              Рус
            </button>
            <span className="text-[#d0d0d8] dark:text-gray-600">|</span>
            <button
              onClick={() => setLanguage('en')}
              className={`px-1 py-0.5 rounded text-[11px] font-bold transition-colors ${
                language === 'en' ? 'bg-[#059669] text-white' : 'text-[#62656a] dark:text-gray-400 hover:text-[#141415] dark:hover:text-white'
              }`}
            >
              Eng
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
