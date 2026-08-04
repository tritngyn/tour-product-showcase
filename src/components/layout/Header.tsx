import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { api } from '../../lib/axios';
import { LogOut } from 'lucide-react';

export const Header = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Logout API failed, continuing with local logout', error);
    } finally {
      // Always clear local state even if API fails
      logout();
      navigate('/login');
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-50 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 sm:gap-3 cursor-pointer transition-transform hover:scale-105" 
          onClick={() => navigate('/')}
        >
          <span className="font-bold text-2xl sm:text-3xl text-gray-900 tracking-tight font-display">vivu<span className="text-teal-600">.</span></span>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          {isAuthenticated ? (
            <>
              <div className="hidden sm:block text-sm font-medium text-gray-500 mr-4">
                Xin chào, Admin
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-teal-50 text-teal-700 text-xs sm:text-sm font-bold tracking-wide transition-all hover:bg-teal-100 hover:scale-105 active:scale-95 shadow-sm"
              >
                <LogOut size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="hidden sm:inline">Đăng xuất</span>
              </button>
            </>
          ) : (
            <button 
              onClick={() => navigate('/login')}
              className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-teal-600 text-white text-xs sm:text-sm font-bold tracking-wide transition-all hover:bg-teal-700 hover:scale-105 active:scale-95 shadow-sm"
            >
              Đăng nhập
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
