import type { Tour } from '../../types/tour';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TourCardProps {
  tour: Tour;
}

export const TourCard = ({ tour }: TourCardProps) => {
  const navigate = useNavigate();

  // Format currency
  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(tour.price);

  return (
    <div className="group bg-white rounded-[32px] shadow-[0_4px_24px_0_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_0_rgba(15,118,110,0.15)] hover:-translate-y-1 transition-all duration-300 border border-gray-100/50 overflow-hidden flex flex-col h-full cursor-pointer" onClick={() => navigate(`/tours/${tour.id}`)}>
      {/* Image container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={tour.image} 
          alt={tour.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-teal-700 shadow-sm">
          {tour.category}
        </div>
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white flex items-center gap-1 shadow-sm">
          <Calendar size={12} />
          {tour.duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
          <MapPin size={14} className="text-teal-600" />
          <span className="uppercase tracking-wider font-semibold">{tour.destination}</span>
        </div>
        
        <h3 className="font-sans text-xl font-bold text-[var(--color-wandor-text)] leading-tight mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors tracking-tight">
          {tour.name}
        </h3>
        
        <p className="font-sans text-[15px] text-[var(--color-wandor-muted)] line-clamp-2 mb-4 flex-1">
          {tour.description}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Giá từ</p>
            <p className="text-lg font-black text-orange-600">{formattedPrice}</p>
          </div>
          <button 
            className="w-11 h-11 rounded-full bg-teal-50 text-[var(--color-wandor-dark)] flex items-center justify-center group-hover:bg-[var(--color-wandor-dark)] group-hover:text-white transition-all active:scale-95 shadow-sm"
            aria-label="Xem chi tiết"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
