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
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full cursor-pointer" onClick={() => navigate(`/tours/${tour.id}`)}>
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
        
        <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors">
          {tour.name}
        </h3>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-1">
          {tour.description}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Giá từ</p>
            <p className="text-lg font-black text-orange-600">{formattedPrice}</p>
          </div>
          <button 
            className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors"
            aria-label="Xem chi tiết"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
