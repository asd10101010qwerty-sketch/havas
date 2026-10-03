import React from 'react';
import { RefreshCw, Home } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#f7f7f9] dark:bg-[#121215] text-[#141415] dark:text-white p-4">
          <div className="max-w-md w-full bg-white dark:bg-[#1c1c24] rounded-3xl p-8 text-center shadow-xl border border-gray-200 dark:border-gray-800 space-y-5">
            <div className="w-20 h-20 mx-auto rounded-full bg-purple-50 dark:bg-purple-950/40 p-1 flex items-center justify-center">
              <img src="/havas_logo.png" alt="Havas" className="w-full h-full object-cover rounded-full" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-black">Nimadir noto'g'ri ketdi / Что-то пошло не так</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Xatolik yuz berdi. Sahifani qayta yuklash orqali davom ettirishingiz mumkin.
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={this.handleReset}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#059669] to-[#2AABEE] text-white font-bold text-sm rounded-2xl shadow-lg hover:shadow-purple-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Qayta yuklash / Перезагрузить</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

