import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  RotateCcw, 
  ShoppingBag, 
  Eye
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { 
  buildStoreKnowledgePrompt, 
  sendGeminiChatMessage, 
  extractRecommendedProductIds, 
  cleanProductTags 
} from '../../services/geminiService';

export const AiAssistantModal = ({ isOpen: propIsOpen, onClose: propOnClose }) => {
  const { 
    products, 
    user, 
    cart, 
    wishlist, 
    language, 
    isAiOpen,
    setIsAiOpen,
    setSelectedProductDetail, 
    addToCart, 
    showToast,
    formatPrice,
    formatInstallment,
    getProductTitle
  } = useShop();

  const isOpen = propIsOpen !== undefined ? propIsOpen : isAiOpen;
  const onClose = propOnClose || (() => setIsAiOpen(false));

  const isRu = language === 'ru';
  const isUz = language === 'uz';

  const defaultGreeting = useMemo(() => {
    if (isRu) {
      return "Здравствуйте! Я официальный AI помощник Havas Market. Спрашивайте о любых товарах, рассрочке Havas Nasiya (0-0-12), доставке, пунктах выдачи или задайте любой вопрос на любую тему!";
    }
    if (isUz) {
      return "Assalomu alaykum! Men Havas Market do'konining rasmiy aqlli AI yordamchisiman. Mahsulotlar, narxlar, Havas Nasiya (0-0-12 muddatli to'lov), yetkazib berish punktlari yoki istalgan boshqa savolingiz bormi? Bemalol so'rang!";
    }
    return "Hello! I am Havas Market's official AI assistant. Ask me anything about our products, 0-0-12 installment plans, delivery pickup points, or any general question!";
  }, [isRu, isUz]);

  const [messages, setMessages] = useState(() => [
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: defaultGreeting,
      timestamp: new Date()
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Suggested prompts
  const suggestions = useMemo(() => {
    if (isRu) {
      return [
        "🔥 Горячие скидки сегодня",
        "📱 Сколько стоит iPhone 16 Pro Max?",
        "💳 Как оформить рассрочку 0-0-12?",
        "📍 Пункты выдачи в Ташкенте",
        "💻 Посоветуй хороший ноутбук"
      ];
    }
    if (isUz) {
      return [
        "🔥 Bugungi katta chegirmalar",
        "📱 iPhone 16 Pro Max narxi qancha?",
        "💳 Nasiya 0-0-12 qanday ishlaydi?",
        "📍 Toshkentdagi topshirish punktlari",
        "💻 Menga yaxshi noutbuk tavsiya et"
      ];
    }
    return [
      "🔥 Today's top discounts",
      "📱 How much is iPhone 16 Pro Max?",
      "💳 How does 0-0-12 installment work?",
      "📍 Pickup points in Tashkent",
      "💻 Recommend a good laptop"
    ];
  }, [isRu, isUz]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Build user context
      const userContext = {
        isLoggedIn: user?.isLoggedIn || false,
        name: user?.name,
        phone: user?.phone,
        cartCount: cart?.length || 0,
        wishlistCount: wishlist?.length || 0
      };

      const systemPrompt = buildStoreKnowledgePrompt(products, userContext);

      // Only pass text history to API
      const apiMessages = newMessages.map(m => ({
        sender: m.sender,
        text: m.text
      }));

      const replyText = await sendGeminiChatMessage({
        messages: apiMessages,
        systemPrompt,
        model: 'gemini-3.5-flash-lite'
      });

      const assistantMessage = {
        id: 'assistant-' + Date.now(),
        sender: 'assistant',
        text: replyText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Gemini error:', err);
      const errorMessage = {
        id: 'err-' + Date.now(),
        sender: 'assistant',
        text: isRu 
          ? "Извините, произошла ошибка связи с сервером. Пожалуйста, попробуйте еще раз."
          : isUz
          ? "Kechirasiz, aloqada xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring."
          : "Sorry, an error occurred while connecting. Please try again.",
        isError: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-' + Date.now(),
        sender: 'assistant',
        text: defaultGreeting,
        timestamp: new Date()
      }
    ]);
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    showToast(
      isRu ? `"${product.titleRu || product.title}" добавлен в корзину!` : `"${product.title}" savatga qo'shildi!`,
      "success"
    );
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 md:hidden animate-fade-in"
      />

      {/* Main Chat Container */}
      <div 
        className="fixed bottom-0 md:bottom-22 right-0 md:right-6 z-50 w-full md:w-[440px] max-w-[100vw] h-[88vh] md:h-[620px] max-h-[92vh] bg-white dark:bg-[#16161d] rounded-t-3xl md:rounded-3xl shadow-2xl border border-gray-200 dark:border-[#282834] flex flex-col overflow-hidden animate-slide-up transition-all duration-200"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#059669] via-[#7d1fff] to-[#2AABEE] text-white px-4 py-3.5 flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
              <Bot className="w-6 h-6 text-white" />
              {/* Online pulse dot */}
              <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 border-2 border-[#059669]" />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black tracking-tight">
                  {isRu ? "Havas AI Помощник" : isUz ? "Havas AI Yordamchi" : "Havas AI Assistant"}
                </h3>
                <span className="bg-white/25 text-[9px] font-black uppercase px-1.5 py-0.5 rounded tracking-wide">
                  Gemini 3.5
                </span>
              </div>
              <p className="text-[11px] text-purple-100 font-medium">
                {isRu ? "Онлайн • Знает всё о магазине" : isUz ? "Onlayn • Do'kon bo'yicha maslahatchi" : "Online • Knows everything in store"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Clear chat button */}
            <button
              onClick={handleClearChat}
              title={isRu ? "Очистить чат" : isUz ? "Tarixni tozalash" : "Clear chat"}
              className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/15 active:scale-95 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/15 active:scale-95 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/70 dark:bg-[#121217] scroll-smooth">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            const recommendedIds = !isUser ? extractRecommendedProductIds(msg.text) : [];
            const cleanText = !isUser ? cleanProductTags(msg.text) : msg.text;
            const recommendedProducts = recommendedIds
              .map(id => products.find(p => p.id === id))
              .filter(Boolean);

            return (
              <div 
                key={msg.id} 
                className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#059669] to-[#2AABEE] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] space-y-2.5 ${isUser ? 'items-end' : 'items-start'}`}>
                  {/* Bubble text */}
                  <div 
                    className={`rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                      isUser 
                        ? 'bg-[#059669] text-white rounded-tr-xs font-medium' 
                        : msg.isError
                        ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-900 rounded-tl-xs'
                        : 'bg-white dark:bg-[#1d1d26] text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-[#2b2b38] rounded-tl-xs'
                    }`}
                  >
                    <div className="whitespace-pre-wrap break-words">
                      {cleanText}
                    </div>
                  </div>

                  {/* Interactive Recommended Product Cards */}
                  {recommendedProducts.length > 0 && (
                    <div className="space-y-2 pt-1 w-full">
                      <div className="text-[11px] font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#059669]" />
                        <span>{isRu ? "Рекомендуемые товары:" : isUz ? "Tavsiya etilgan tovarlar:" : "Recommended items:"}</span>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {recommendedProducts.map(prod => (
                          <div 
                            key={prod.id}
                            className="flex items-center gap-3 p-2.5 bg-white dark:bg-[#1d1d26] rounded-2xl border border-purple-100 dark:border-purple-950 shadow-sm hover:border-purple-300 dark:hover:border-purple-800 transition-all"
                          >
                            <img 
                              src={prod.images?.[0] || ''} 
                              alt={prod.title}
                              className="w-14 h-14 object-cover rounded-xl shrink-0 bg-gray-100 dark:bg-gray-800" 
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100 line-clamp-1">
                                {getProductTitle(prod)}
                              </h4>
                              <div className="flex items-baseline gap-1.5 mt-0.5">
                                <span className="text-xs font-extrabold text-[#059669] dark:text-[#34d399]">
                                  {formatPrice(prod.price)}
                                </span>
                                {prod.oldPrice && (
                                  <span className="text-[10px] text-gray-400 line-through">
                                    {formatPrice(prod.oldPrice)}
                                  </span>
                                )}
                              </div>
                              {prod.monthlyPrice && (
                                <div className="text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                                  {formatInstallment(prod.monthlyPrice)} /oy
                                </div>
                              )}
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-1 shrink-0">
                              <button
                                onClick={() => setSelectedProductDetail(prod)}
                                title={isRu ? "Подробнее" : isUz ? "Batafsil" : "View Details"}
                                className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-900/40 text-gray-700 dark:text-gray-200 transition-colors cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleAddToCart(prod)}
                                title={isRu ? "В корзину" : isUz ? "Savatga" : "Add to Cart"}
                                className="p-1.5 rounded-lg bg-[#059669] hover:bg-[#5e00d6] text-white transition-colors cursor-pointer shadow-xs active:scale-95"
                              >
                                <ShoppingBag className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className={`text-[9px] text-gray-400 px-1 ${isUser ? 'text-right' : 'text-left'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                {isUser && (
                  <div className="w-7 h-7 rounded-xl bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#059669] to-[#2AABEE] text-white flex items-center justify-center shrink-0 shadow-sm animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white dark:bg-[#1d1d26] border border-gray-200 dark:border-[#2b2b38] rounded-2xl rounded-tl-xs px-4 py-3 shadow-xs flex items-center gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {isRu ? "Havas AI думает" : isUz ? "Havas AI o'ylamoqda" : "Havas AI is typing"}
                </span>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8534f5] animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2AABEE] animate-bounce" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompt Chips */}
        {messages.length <= 3 && !isLoading && (
          <div className="px-3 py-2 bg-gray-100/80 dark:bg-[#181820] border-t border-gray-200/60 dark:border-[#282834] overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
            {suggestions.map((sug, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(sug)}
                className="whitespace-nowrap px-3 py-1.5 rounded-full text-[11px] font-semibold bg-white dark:bg-[#22222d] text-gray-700 dark:text-gray-300 hover:text-[#059669] dark:hover:text-[#34d399] hover:border-[#059669] border border-gray-200 dark:border-gray-700 shadow-2xs transition-all active:scale-95 cursor-pointer"
              >
                {sug}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className="p-3 bg-white dark:bg-[#16161d] border-t border-gray-200 dark:border-[#282834] shrink-0">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isRu ? "Задайте любой вопрос AI..." : isUz ? "AI ga istalgan savol bering..." : "Ask AI anything..."}
              disabled={isLoading}
              className="flex-1 bg-gray-100 dark:bg-[#20202b] text-gray-900 dark:text-gray-100 text-xs sm:text-sm px-4 py-3 rounded-2xl outline-none border border-transparent focus:border-[#059669] dark:focus:border-[#8534f5] transition-colors placeholder:text-gray-400 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`p-3 rounded-2xl flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md ${
                input.trim() && !isLoading
                  ? 'bg-gradient-to-r from-[#059669] to-[#2AABEE] text-white hover:opacity-95 active:scale-95 shadow-purple-500/25'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="text-center mt-1.5">
            <span className="text-[10px] text-gray-400 dark:text-gray-500">
              {isRu 
                ? "Havas AI может отвечать на любые вопросы о товарах и обо всём на свете" 
                : isUz 
                ? "Havas AI barcha tovarlar va har qanday umumiy savollarga javob bera oladi"
                : "Havas AI can answer anything about products and general questions"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
