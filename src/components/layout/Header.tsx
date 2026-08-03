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
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105" 
          onClick={() => navigate('/')}
        >
          <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white shadow-md shadow-teal-600/20">
            <Compass size={24} />
          </div>
          <span className="font-bold text-xl text-gray-900 tracking-tight font-display">vivu<span className="text-teal-600">.</span></span>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[var(--color-wandor-muted)] uppercase tracking-[0.04em] transition-opacity hover:opacity-55"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Đăng xuất</span>
        </button>
      </div>
    </header>
  );
};
