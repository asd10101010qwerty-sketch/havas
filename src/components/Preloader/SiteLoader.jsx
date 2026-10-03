import React, { useState, useEffect } from 'react';
import { Sparkles, Zap } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const SiteLoader = () => {
  const { language } = useShop();
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  const isRu = language === 'ru';
  const isUz = language === 'uz';

  const statusText = isRu
    ? (progress < 40 ? 'Загрузка витрины товаров...' : progress < 80 ? 'Подготовка лучших предложений...' : 'Почти готово!')
    : isUz
    ? (progress < 40 ? 'Mahsulotlar yuklanmoqda...' : progress < 80 ? 'Eng yaxshi narxlar tayyorlanmoqda...' : 'Deyarli tayyor!')
    : (progress < 40 ? 'Loading marketplace...' : progress < 80 ? 'Preparing best offers...' : 'Almost ready!');

  useEffect(() => {
    // Smooth progress counter from 0 to 100
    const startTime = performance.now();
    const duration = 1800; // 1.8 seconds total duration

    let frameId;
    const updateProgress = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);

      // Ease-out cubic curve: 1 - Math.pow(1 - t, 3)
      const easeOut = 1 - Math.pow(1 - t, 3);
      const current = Math.round(easeOut * 100);

      setProgress(current);

      if (t < 1) {
        frameId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        // Start fading out after reaching 100%
        setTimeout(() => {
          setIsFading(true);
          // Unmount from DOM after fade transition completes
          setTimeout(() => {
            setIsMounted(false);
          }, 600);
        }, 250);
      }
    };

    frameId = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(frameId);
  }, []);

  if (!isMounted) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-[#0f0f13] select-none transition-all duration-600 ease-out ${
        isFading ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 bg-gradient-to-tr from-[#059669]/25 via-purple-500/15 to-[#2AABEE]/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="relative z-10 flex flex-col items-center max-w-xs sm:max-w-sm w-full px-6 text-center space-y-6">
        
        {/* Logo with pulsing glow */}
        <div className="relative group">
          <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[#059669] via-[#8534f5] to-[#2AABEE] opacity-75 blur-md animate-pulse" />
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden p-1 bg-white dark:bg-[#181820] shadow-2xl border-2 border-purple-200 dark:border-purple-900/60 flex items-center justify-center">
            <img
              src="/havas_logo.png"
              alt="Havas Logo"
              className="w-full h-full object-cover rounded-full animate-scale-in"
            />
          </div>
          {/* Active indicator */}
          <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-400 border-3 border-white dark:border-[#0f0f13] shadow-md flex items-center justify-center">
            <Zap className="w-2.5 h-2.5 text-white fill-white" />
          </span>
        </div>

        {/* Brand Name */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#141415] dark:text-white flex items-center justify-center gap-1.5">
            <span className="bg-gradient-to-r from-[#059669] via-[#8534f5] to-[#2AABEE] bg-clip-text text-transparent">
              Havas
            </span>
            <span className="text-gray-900 dark:text-white">
              Market
            </span>
          </h1>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase">
            Tez • Qulay • 1 kunda yetkazish
          </p>
        </div>

        {/* Percentage Counter & Status */}
        <div className="w-full space-y-2.5 pt-2">
          <div className="flex items-baseline justify-between px-1">
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 transition-all duration-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-spin" />
              <span>{statusText}</span>
            </span>
            <span className="text-lg sm:text-xl font-black tabular-nums bg-gradient-to-r from-[#059669] to-[#2AABEE] bg-clip-text text-transparent">
              {progress}%
            </span>
          </div>

          {/* Progress Bar Container */}
          <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-800/80 rounded-full overflow-hidden p-0.5 shadow-inner border border-gray-200/60 dark:border-gray-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#059669] via-[#9146ff] to-[#2AABEE] transition-all duration-100 ease-out shadow-sm shadow-purple-500/50 relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer light effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
            </div>
          </div>
        </div>

        {/* Footnote */}
        <div className="text-[11px] font-medium text-gray-400 dark:text-gray-500 pt-1">
          Havas Online Marketplace © 2026
        </div>

      </div>
    </div>
  );
};

