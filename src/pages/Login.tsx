import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { api } from '../lib/axios';
import { Compass, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

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
    <div className="min-h-screen w-full flex bg-gray-50 font-sans">
      {/* Left side: Image (hidden on mobile, visible on desktop >= 1280px) */}
      <div className="hidden xl:flex xl:w-1/2 relative bg-teal-900 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop" 
          alt="Travel Landscape" 
          className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-950 via-teal-900/60 to-transparent" />
        <div className="relative z-10 p-16 flex flex-col justify-end h-full text-white">
          <div className="mb-8">
            <Compass size={48} className="text-teal-400 mb-6" />
            <h2 className="text-5xl font-bold mb-6 leading-tight">Khám phá thế giới<br />cùng Wanderlust.</h2>
            <p className="text-lg text-teal-50 max-w-md font-light leading-relaxed">
              Bắt đầu hành trình của bạn ngay hôm nay. Hàng ngàn điểm đến tuyệt đẹp và trải nghiệm độc đáo đang chờ đón bạn khám phá.
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Form (full width on mobile, 50% on desktop) */}
      <div className="w-full xl:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-20">
        <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-2xl shadow-teal-900/5 border border-gray-100">
          <div className="text-center">
            <div className="w-14 h-14 bg-gradient-to-tr from-teal-600 to-teal-400 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-teal-600/30 transform -rotate-6">
              <Compass size={32} className="rotate-6" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Đăng nhập</h2>
            <p className="text-sm text-gray-500 mt-3">Chào mừng bạn quay trở lại với Wanderlust</p>
          </div>

          <form className="space-y-6 mt-8" onSubmit={handleSubmit}>
            {error && (
              <div className="p-4 text-sm text-red-600 bg-red-50 rounded-xl border border-red-100 flex items-start">
                <span>{error}</span>
              </div>
            )}
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email / Tên đăng nhập</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400 group-focus-within:text-teal-600 transition-colors" />
                  </div>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-teal-600/10 focus:border-teal-600 transition-all sm:text-sm bg-gray-50/50 hover:bg-gray-50 focus:bg-white outline-none"
                    placeholder="admin@wanderlust.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-700">Mật khẩu</label>
                  <a href="#" className="text-xs font-medium text-teal-600 hover:text-teal-500">Quên mật khẩu?</a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400 group-focus-within:text-teal-600 transition-colors" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-teal-600/10 focus:border-teal-600 transition-all sm:text-sm bg-gray-50/50 hover:bg-gray-50 focus:bg-white outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-xl shadow-lg shadow-teal-600/20 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  <span>Bắt đầu khám phá</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
