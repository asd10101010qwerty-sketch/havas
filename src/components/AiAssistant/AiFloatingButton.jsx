import React, { useState } from 'react';
import { Sparkles, Bot, X } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const AiFloatingButton = ({ isOpen: propIsOpen, onToggle: propOnToggle }) => {
  const { language, isAiOpen, setIsAiOpen } = useShop();
  const [showTooltip, setShowTooltip] = useState(true);

  const isOpen = propIsOpen !== undefined ? propIsOpen : isAiOpen;
  const onToggle = propOnToggle || (() => setIsAiOpen(prev => !prev));

  const isRu = language === 'ru';
  const isUz = language === 'uz';

  const label = isRu ? 'AI Помощник' : isUz ? 'AI Yordamchi' : 'AI Assistant';
  const tooltipText = isRu 
    ? 'Задайте вопрос AI!' 
    : isUz 
    ? 'Savolingiz bormi? Yozing!' 
    : 'Ask AI anything!';

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 flex items-center gap-2 pointer-events-auto">
      {/* Tooltip bubble (shows when closed) */}
      {!isOpen && showTooltip && (
        <div className="hidden sm:flex items-center gap-1.5 bg-white dark:bg-[#1f1f2a] text-gray-800 dark:text-gray-100 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg border border-purple-200 dark:border-purple-900/60 animate-bounce duration-1000">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>{tooltipText}</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="ml-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => {
          setShowTooltip(false);
          onToggle();
        }}
        aria-label={label}
        className={`group relative flex items-center gap-2.5 px-4 py-3.5 sm:py-3 rounded-full text-white font-bold shadow-xl transition-all duration-300 active:scale-95 cursor-pointer ${
          isOpen
            ? 'bg-gray-800 hover:bg-gray-900 shadow-gray-900/40'
            : 'bg-gradient-to-r from-[#059669] via-[#8534f5] to-[#2AABEE] hover:shadow-purple-600/40 hover:scale-105'
        }`}
      >
        {/* Animated Glow Ring when closed */}
        {!isOpen && (
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#059669] to-[#2AABEE] opacity-60 blur-sm group-hover:opacity-100 transition-opacity -z-10 animate-pulse" />
        )}

        {/* Button Icon */}
        <div className="relative">
          {isOpen ? (
            <X className="w-5 h-5 transition-transform duration-200" />
          ) : (
            <div className="flex items-center justify-center">
              <Bot className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
              {/* Online indicator dot */}
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-white dark:border-[#16161d]" />
            </div>
          )}
        </div>

        {/* Text Label */}
        <span className="text-xs sm:text-sm font-extrabold tracking-wide select-none">
          {isOpen ? (isRu ? 'Закрыть' : isUz ? 'Yopish' : 'Close') : label}
        </span>

        {/* Sparkle badge when closed */}
        {!isOpen && (
          <span className="hidden sm:inline-flex items-center bg-white/20 text-[10px] font-black uppercase px-2 py-0.5 rounded-full backdrop-blur-xs">
            3.5 Flash
          </span>
        )}
      </button>
    </div>
  );
};
