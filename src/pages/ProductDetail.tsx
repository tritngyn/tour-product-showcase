import { useParams, useNavigate } from 'react-router-dom';
import { useTourDetail } from '../hooks/useTours';
import { ArrowLeft, MapPin, Calendar, CheckCircle2, Loader2 } from 'lucide-react';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { tour, isLoading, error } = useTourDetail(id);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 size={40} className="text-teal-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Đang tải thông tin tour...</p>
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="bg-red-50 border border-red-100 p-6 rounded-2xl text-center text-red-600 max-w-lg mx-auto mt-10">
        <p className="font-bold mb-2">Đã có lỗi xảy ra</p>
        <p className="text-sm">{error || 'Không tìm thấy tour này.'}</p>
        <button onClick={() => navigate('/tours')} className="mt-4 text-teal-600 underline text-sm">Quay lại danh sách</button>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(tour.price);

  return (
    <div className="pb-32 xl:pb-10 relative">
      <button 
        onClick={() => navigate('/tours')}
        className="flex items-center gap-2 text-gray-500 hover:text-teal-600 transition-colors mb-6 font-medium"
      >
        <ArrowLeft size={20} /> Quay lại danh sách
      </button>

      <div className="flex flex-col xl:flex-row gap-8">
        {/* Left column: Image & Details */}
        <div className="flex-1 space-y-8">
          <div className="rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[21/9] xl:aspect-[16/9] shadow-md border border-gray-100">
            <img src={tour.image} alt={tour.name} className="w-full h-full object-cover" />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                {tour.category}
              </span>
              <div className="flex items-center gap-1.5 text-gray-500 text-sm font-semibold">
                <MapPin size={16} /> {tour.destination}
              </div>
              <div className="flex items-center gap-1.5 text-gray-500 text-sm font-semibold">
                <Calendar size={16} /> {tour.duration}
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {tour.name}
            </h1>

            <div className="prose prose-teal max-w-none">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lịch trình chi tiết</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">
                {tour.description}
              </p>
            </div>
          </div>
        </div>

        {/* Right column: Sticky Booking Card */}
        <div className="xl:w-[400px] flex-shrink-0">
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl shadow-teal-900/5 border border-gray-100 sticky top-24">
            <div className="mb-6">
              <p className="text-gray-500 font-medium mb-1">Giá trọn gói từ</p>
              <p className="text-4xl font-black text-orange-600">{formattedPrice}</p>
              <p className="text-sm text-gray-400 mt-2">* Áp dụng cho 1 người lớn</p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-teal-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600">Bảo hiểm du lịch tối đa 100.000.000đ</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-teal-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600">Hướng dẫn viên chuyên nghiệp</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-teal-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600">Khách sạn 4-5 sao chuẩn quốc tế</p>
              </div>
            </div>
            
            {/* Desktop CTA */}
            <button className="hidden xl:flex w-full justify-center items-center py-4 bg-teal-600 text-white font-bold text-lg rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-600/20 active:scale-95">
              Đặt Tour Ngay
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 px-6 flex items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50">
        <div>
          <p className="text-xs text-gray-500 font-medium">Tổng tiền</p>
          <p className="text-xl font-black text-orange-600">{formattedPrice}</p>
        </div>
        <button className="px-8 py-3 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 active:scale-95 transition-all">
          Đặt Tour
        </button>
      </div>
    </div>
  );
};
