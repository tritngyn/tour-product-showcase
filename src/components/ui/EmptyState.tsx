import { Compass } from 'lucide-react';

interface EmptyStateProps {
  onClear: () => void;
}

export const EmptyState = ({ onClear }: EmptyStateProps) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-12 flex flex-col items-center justify-center text-center shadow-sm">
      <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 mb-6">
        <Compass size={40} className="animate-[spin_4s_linear_infinite]" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Chưa tìm thấy chuyến đi phù hợp</h3>
      <p className="text-gray-500 max-w-md mb-6">
        Rất tiếc, hiện chưa có chuyến đi nào khớp với bộ lọc của bạn. Bạn thử xóa bộ lọc hoặc tìm với từ khóa khác xem sao nhé!
      </p>
      <button 
        onClick={onClear}
        className="px-6 py-2.5 bg-teal-600 text-white font-medium rounded-xl hover:bg-teal-700 transition-colors shadow-sm shadow-teal-600/20"
      >
        Xóa bộ lọc
      </button>
    </div>
  );
};
