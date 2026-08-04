import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { api } from '../../lib/axios';
import { LogOut, Compass } from 'lucide-react';

export const Header = () => {
  const logout = useAuthStore((state) => state.logout);
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
          className="flex items-center gap-3 cursor-pointer transition-transform hover:scale-105" 
          onClick={() => navigate('/')}
        >
          <div className="w-12 h-12 bg-gradient-to-tr from-teal-600 to-teal-400 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-teal-600/30 transform -rotate-6">
            <Compass size={28} className="rotate-6" />
          </div>
          <span className="font-bold text-2xl text-gray-900 tracking-tight font-display">vivu<span className="text-teal-600">.</span></span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-sm font-medium text-gray-500 mr-4">
            Xin chào, Admin
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-teal-50 text-teal-700 text-sm font-bold tracking-wide transition-all hover:bg-teal-100 hover:scale-105 active:scale-95 shadow-sm"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Đăng xuất</span>
          </button>
        </div>
      </div>
    </header>
  );
};
