import { Hero } from '../components/home/Hero';
import { useTours } from '../hooks/useTours';
import { TourCard } from '../components/tour/TourCard';
import { Loader2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const { tours, isLoading } = useTours();
  const navigate = useNavigate();

  // Filter tours for carousels
  const hotTours = tours.filter(t => t.price >= 3500000).slice(0, 6);
  const domesticTours = tours;

  const CarouselSection = ({ title, data }: { title: string, data: typeof tours }) => (
    <div className="py-8 sm:py-12 border-b border-gray-100 last:border-0">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 mb-6 sm:mb-8 flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">{title}</h2>
        <button 
          onClick={() => navigate('/tours')}
          className="flex items-center gap-1 sm:gap-2 text-teal-600 font-semibold hover:text-teal-700 transition-colors text-sm sm:text-base whitespace-nowrap"
        >
          Xem tất cả <ArrowRight size={18} className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
        </button>
      </div>
      
      {/* Horizontal Scroll Container */}
      <div className="w-full overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
          <div className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-2 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
            {data.map(tour => (
              <div key={tour.id} className="w-[85vw] sm:w-auto min-w-[280px] sm:min-w-[320px] max-w-[320px] snap-start flex-shrink-0">
                <TourCard tour={tour} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <main className="bg-white">
      <Hero />
      
      {/* Carousels Section */}
      <section id="tour-carousels" className="pt-16 pb-24 bg-gray-50/50">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 size={40} className="text-teal-600 animate-spin mb-4" />
            <p className="text-gray-500 font-medium">Đang tải những hành trình tuyệt vời...</p>
          </div>
        ) : (
          <>
            {hotTours.length > 0 && <CarouselSection title="🔥 Tour Khám Phá Nổi Bật" data={hotTours} />}
            {domesticTours.length > 0 && <CarouselSection title="🇻🇳 Trọn Vẹn Việt Nam" data={domesticTours} />}
          </>
        )}
      </section>
    </main>
  );
};
