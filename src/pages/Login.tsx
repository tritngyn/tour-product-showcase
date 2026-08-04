import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { api } from '../lib/axios';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await api.post('/login', { email, password });
      if (response.data.token) {
        login(response.data.token);
        navigate('/');
      }
    } catch (err) {
      setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center font-sans relative overflow-hidden">
      {/* Background Image */}
      <img 
        src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop" 
        alt="Travel Landscape" 
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-teal-900/30 backdrop-blur-[2px] z-0" />

      {/* Login Card (Liquid Glass) */}
      <div className="relative z-10 w-full max-w-[420px] p-6 sm:p-10 mx-4 sm:mx-auto bg-white/[0.15] border-[2px] sm:border-[3px] border-white/80 rounded-[32px] sm:rounded-[44px] shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] overflow-hidden backdrop-blur-[24px] flex flex-col">
        <div className="text-center mb-6 sm:mb-8">
          <span className="font-bold text-3xl sm:text-[40px] text-teal-950 tracking-tight font-display mb-1 sm:mb-2 block">
            vivu<span className="text-teal-700">.</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-teal-950 tracking-tight">Đăng nhập</h2>
          <p className="text-[13px] sm:text-[15px] text-teal-900 mt-1.5 sm:mt-2 font-medium">Bắt đầu hành trình của bạn ngay hôm nay.</p>
        </div>

        <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 sm:p-4 text-xs sm:text-sm text-red-700 bg-red-100/80 backdrop-blur-md rounded-xl sm:rounded-2xl border border-red-200 flex items-start shadow-sm">
              <span className="font-medium">{error}</span>
            </div>
          )}
          
          <div className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-xs sm:text-sm font-bold text-teal-950 mb-1.5 sm:mb-2">Email / Tên đăng nhập</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none">
                  <Mail size={16} className="sm:w-[18px] sm:h-[18px] text-teal-700 group-focus-within:text-teal-900 transition-colors" />
                </div>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 sm:pl-11 pr-4 py-3 sm:py-3.5 border-2 border-white/60 rounded-2xl sm:rounded-[20px] focus:ring-0 focus:border-white transition-all text-sm bg-white/40 hover:bg-white/50 focus:bg-white/70 outline-none text-teal-950 font-medium placeholder-teal-800/60 shadow-inner"
                  placeholder="admin@vivu.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                <label className="block text-xs sm:text-sm font-bold text-teal-950">Mật khẩu</label>
                <a href="#" className="text-[11px] sm:text-xs font-bold text-teal-800 hover:text-teal-950 transition-colors">Quên mật khẩu?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none">
                  <Lock size={16} className="sm:w-[18px] sm:h-[18px] text-teal-700 group-focus-within:text-teal-900 transition-colors" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 sm:pl-11 pr-4 py-3 sm:py-3.5 border-2 border-white/60 rounded-2xl sm:rounded-[20px] focus:ring-0 focus:border-white transition-all text-sm bg-white/40 hover:bg-white/50 focus:bg-white/70 outline-none text-teal-950 font-medium placeholder-teal-800/60 shadow-inner"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-1.5 sm:gap-2 py-3 sm:py-4 px-6 rounded-full shadow-lg shadow-teal-900/20 text-[13px] sm:text-[15px] font-bold text-white bg-[var(--color-wandor-dark)] hover:bg-teal-900 hover:shadow-xl hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none mt-2"
          >
            {isLoading ? (
              <Loader2 size={18} className="sm:w-5 sm:h-5 animate-spin" />
            ) : (
              <>
                <span className="uppercase tracking-wide">Bắt đầu khám phá</span>
                <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

