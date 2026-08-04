import { useNavigate } from 'react-router-dom';
import { Header } from '../layout/Header';

export const Hero = () => {
  const navigate = useNavigate();

  const handleScrollToTours = () => {
    const el = document.getElementById('tour-carousels');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/tours');
    }
  };

  return (
    <section className="relative min-h-[calc(100svh-24px)] sm:min-h-[calc(100svh-48px)] w-[calc(100%-24px)] sm:w-[calc(100%-48px)] mx-auto mt-3 sm:mt-6 overflow-hidden rounded-[32px] sm:rounded-[48px] shadow-2xl">
      {/* Background image (z-0) */}
      <img
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/vaskar-sam-xRw_N4Bgfos-unsplash.jpg"
        alt="Travel Background"
      />

      {/* Content wrapper (z-2) */}
      <div className="relative z-[2] max-w-[1360px] mx-auto">
        <Header />

        {/* Hero body */}
        <div className="flex flex-col items-center px-4 sm:px-6 pt-12 sm:pt-16 pb-16 sm:pb-24 text-center">
          <h1 className="font-sans text-[clamp(36px,6vw,68px)] font-medium text-[var(--color-wandor-text)] leading-[1.05] tracking-[-0.04em] max-w-[820px] mb-4 sm:mb-5">
            Bạn muốn đi đâu tiếp theo?
          </h1>
          <p className="font-sans text-base sm:text-xl font-medium text-[var(--color-wandor-muted)] leading-relaxed max-w-[500px] mb-8 sm:mb-10">
            Hãy để vivu. đồng hành cùng bạn trên mọi nẻo đường. Đặt tour ngay hôm nay để nhận ưu đãi hấp dẫn.
          </p>

          {/* Liquid glass PR card */}
          <div className="relative w-full sm:w-[701px] min-h-[180px] sm:min-h-[208px] bg-white/[0.15] border-[3px] border-white/80 rounded-[32px] sm:rounded-[44px] shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] overflow-hidden backdrop-blur-[24px] flex flex-col items-center justify-center p-6 sm:p-8 transition-transform hover:scale-[1.02] duration-500">
            <h3 className="font-sans text-xl sm:text-2xl font-bold text-teal-900 mb-3 sm:mb-4 tracking-tight">
              Hành trình ngàn dặm bắt đầu từ một bước chân
            </h3>
            <p className="font-sans text-base sm:text-lg text-teal-800 leading-relaxed text-center max-w-[500px] mb-5 sm:mb-6">
              Khám phá những vùng đất mới, văn hóa mới và tạo ra những kỷ niệm không thể nào quên. Chúng tôi cung cấp các tour du lịch chất lượng cao với giá cả hợp lý nhất.
            </p>
            
            <button 
              onClick={handleScrollToTours}
              className="w-full sm:w-[200px] h-12 sm:h-14 bg-[var(--color-wandor-dark)] border-none rounded-full shadow-lg cursor-pointer flex items-center justify-center font-sans text-sm sm:text-base font-medium text-[#fafafa] uppercase tracking-[0.02em] transition-all hover:bg-teal-900 hover:shadow-xl hover:-translate-y-1 active:scale-95"
            >
              Bắt Đầu Khám Phá
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
