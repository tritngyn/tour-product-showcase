import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTourDetail } from '../hooks/useTours';
import { toursData as detailedTours } from '../components/TourDetail/tourData';
import { 
  ArrowLeft, MapPin, Calendar, CheckCircle2, Loader2, 
  Star, X, ChevronLeft, ChevronRight, Grid 
} from 'lucide-react';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tour: mockoonTour, isLoading, error } = useTourDetail(id);
  
  const [showGallery, setShowGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showGallery) {
        if (e.key === "Escape") closeGallery();
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showGallery]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 size={40} className="text-teal-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Đang tải thông tin tour...</p>
      </div>
    );
  }

  // Map ID cũ (1-6) sang ID mới để dự phòng trường hợp Mockoon chưa kịp reload data
  const oldIdMap: Record<string, string> = {
    '1': 'halong-hanoi',
    '2': 'danang-hoian',
    '3': 'phuquoc',
    '4': 'sapa-hagiang',
    '5': 'nha-trang',
    '6': 'saigon-mekong'
  };
  const mappedId = id ? (oldIdMap[id] || id) : '';

  // Use rich data if available, fallback to mockoon data
  const richData = mappedId ? detailedTours[mappedId] : null;
  const tour = richData ? {
    id: richData.id,
    name: richData.title,
    destination: richData.location,
    images: typeof richData.images[0] === 'string' ? richData.images : richData.images.map((i: any) => i.url || i),
    description: richData.description?.overview || '',
    detailDescription: richData.description?.detail || '',
    price: richData.basePrice * 10000, 
    duration: richData.duration,
    category: richData.tags?.[0] || 'Khám phá',
    rating: richData.rating,
    reviewCount: richData.reviewCount,
    tags: richData.tags,
    highlights: richData.highlights,
    itinerary: richData.itinerary,
  } : mockoonTour;

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

  const images = tour.images || [tour.image];

  const openGallery = (index = 0) => {
    setCurrentImageIndex(index);
    setShowGallery(true);
    document.body.style.overflow = "hidden";
  };

  const closeGallery = () => {
    setShowGallery(false);
    document.body.style.overflow = "unset";
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="pb-32 xl:pb-10 relative">
      <button 
        onClick={() => navigate('/tours')}
        className="flex items-center gap-2 text-gray-500 hover:text-teal-600 transition-colors mb-6 font-medium"
      >
        <ArrowLeft size={20} /> Quay lại danh sách
      </button>

      {/* Header Info */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3">
          <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
            {tour.category}
          </span>
          {tour.rating && (
            <div className="flex items-center gap-1 font-semibold">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="text-gray-900">{tour.rating}</span>
              <span className="text-gray-500 font-normal">({tour.reviewCount} đánh giá)</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-gray-500 font-semibold">
            <MapPin size={18} /> {tour.destination}
          </div>
          <div className="flex items-center gap-1.5 text-gray-500 font-semibold">
            <Calendar size={18} /> {tour.duration}
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
          {tour.name}
        </h1>
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        {/* Left column */}
        <div className="flex-1 min-w-0">
          
          {/* Gallery */}
          <div className="relative rounded-[32px] overflow-hidden mb-8 border border-white/50 shadow-sm">
            {images.length === 1 ? (
              <div className="aspect-[16/9] w-full" onClick={() => openGallery(0)}>
                <img src={images[0]} alt={tour.name} className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-500" />
              </div>
            ) : (
              <div className="grid grid-cols-5 gap-2 h-[400px]">
                {/* Main image */}
                <div className="col-span-3 relative group cursor-pointer overflow-hidden" onClick={() => openGallery(0)}>
                  <img src={images[0]} alt="Main" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                {/* 4 small images */}
                <div className="col-span-2 grid grid-cols-2 gap-2">
                  {images.slice(1, 4).map((img: string, idx: number) => (
                    <div key={idx} className="relative group cursor-pointer overflow-hidden" onClick={() => openGallery(idx + 1)}>
                      <img src={img} alt={`Img ${idx}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 hover:bg-black/10 transition-colors" />
                    </div>
                  ))}
                  {images.length > 4 && (
                    <div className="relative group cursor-pointer overflow-hidden" onClick={() => openGallery(4)}>
                      <img src={images[4]} alt="More" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 hover:bg-black/60 transition-colors flex items-center justify-center">
                        <div className="text-center text-white">
                          <Grid className="w-6 h-6 mx-auto mb-1" />
                          <p className="font-bold">Xem thêm</p>
                          <p className="text-xs">{images.length} ảnh</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Tabs (Liquid style) */}
          {richData && (
            <div className="flex overflow-x-auto gap-2 mb-8 pb-2 scrollbar-hide">
              {['overview', 'itinerary'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-full font-semibold transition-all whitespace-nowrap ${
                    activeTab === tab 
                      ? 'bg-teal-600 text-white shadow-md' 
                      : 'bg-white text-gray-500 hover:bg-teal-50 hover:text-teal-600'
                  }`}
                >
                  {tab === 'overview' ? 'Tổng quan' : 'Lịch trình'}
                </button>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="prose prose-teal max-w-none">
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                {/* Description */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Về chuyến đi này</h3>
                  <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                    {tour.description}
                  </p>
                  {tour.detailDescription && (
                    <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line mt-4">
                      {tour.detailDescription}
                    </p>
                  )}
                </div>

                {/* Highlights */}
                {tour.highlights && (
                  <div className="bg-teal-50/50 rounded-3xl p-8 border border-white">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Điểm nổi bật</h3>
                    <ul className="space-y-3">
                      {tour.highlights.map((hl: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-6 h-6 text-teal-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 font-medium">{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'itinerary' && tour.itinerary && (
              <div className="space-y-6 animate-in fade-in duration-300">
                {tour.itinerary.map((day: any, idx: number) => (
                  <div key={idx} className="relative pl-8 border-l-2 border-teal-100 pb-8 last:pb-0 last:border-transparent">
                    <div className="absolute left-[-11px] top-0 w-5 h-5 rounded-full bg-teal-50 border-4 border-teal-500"></div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-bold">
                        Ngày {day.day}
                      </span>
                      <h4 className="text-xl font-bold text-gray-900 m-0">{day.title}</h4>
                    </div>
                    <p className="text-gray-600 mt-3 leading-relaxed">{day.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right column: Sticky Booking Card (Glassmorphism) */}
        <div className="xl:w-[400px] flex-shrink-0">
          <div className="bg-white/70 backdrop-blur-xl p-8 rounded-[32px] shadow-xl shadow-teal-900/5 border border-white sticky top-24">
            <div className="mb-6">
              <p className="text-gray-500 font-medium mb-1">Giá trọn gói từ</p>
              <p className="text-4xl font-black text-orange-600">{formattedPrice}</p>
              <p className="text-sm text-gray-400 mt-2">* Áp dụng cho 1 người lớn</p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-teal-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 font-medium">Bảo hiểm du lịch 100tr</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-teal-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 font-medium">Hướng dẫn viên theo suốt tuyến</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-teal-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 font-medium">Khách sạn chuẩn quốc tế</p>
              </div>
            </div>
            
            {/* Desktop CTA */}
            <button className="hidden xl:flex w-full justify-center items-center py-4 bg-teal-600 text-white font-bold text-lg rounded-full hover:bg-teal-700 transition-colors shadow-lg shadow-teal-600/20 active:scale-95">
              Đặt Tour Ngay
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-100 p-4 px-6 flex items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40">
        <div>
          <p className="text-xs text-gray-500 font-medium">Tổng tiền</p>
          <p className="text-xl font-black text-orange-600">{formattedPrice}</p>
        </div>
        <button className="px-8 py-3 bg-teal-600 text-white font-bold rounded-full hover:bg-teal-700 active:scale-95 transition-all">
          Đặt Tour
        </button>
      </div>

      {/* Lightbox Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <button onClick={closeGallery} className="absolute top-6 right-6 text-white/70 hover:text-white bg-black/20 p-2 rounded-full backdrop-blur-sm z-50">
            <X size={24} />
          </button>
          
          <div className="absolute top-6 left-6 text-white/70 font-medium tracking-widest z-50">
            {currentImageIndex + 1} / {images.length}
          </div>

          <button onClick={prevImage} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-sm z-50">
            <ChevronLeft size={32} />
          </button>
          
          <div className="max-w-5xl w-full max-h-[80vh] px-16 flex items-center justify-center">
            <img src={images[currentImageIndex]} alt="Gallery" className="w-full h-full object-contain mx-auto" />
          </div>

          <button onClick={nextImage} className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-sm z-50">
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </div>
  );
};
