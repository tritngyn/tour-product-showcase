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
    <section className="relative min-h-svh w-full overflow-hidden">
      {/* Background video (z-0) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://pollen-batch-41236914.figma.site/_components/v2/f0ee2dae7671c170c34f12e31c4cb41418976c98/769c564298c132f7919405cd9f17c1b1231f341d.769c5642.mp4"
      />

      {/* Top gradient overlay (z-1) */}
      <div 
        className="absolute inset-x-0 top-0 h-[687px] pointer-events-none z-[1]"
        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)' }}
      />

      {/* Content wrapper (z-2) */}
      <div className="relative z-[2] max-w-[1360px] mx-auto">
        <Header />

        {/* Hero body */}
        <div className="flex flex-col items-center px-6 pt-16 pb-24 text-center">
          <h1 className="font-sans text-[clamp(40px,6vw,68px)] font-medium text-[var(--color-wandor-text)] leading-[1.05] tracking-[-0.04em] max-w-[820px] mb-5">
            Bạn muốn đi đâu tiếp theo?
          </h1>
          <p className="font-sans text-xl font-medium text-[var(--color-wandor-muted)] leading-relaxed max-w-[500px] mb-10">
            Hãy để vivu. đồng hành cùng bạn trên mọi nẻo đường. Đặt tour ngay hôm nay để nhận ưu đãi hấp dẫn.
          </p>

          {/* Liquid glass PR card */}
          <div className="relative w-[701px] max-md:w-[calc(100vw-48px)] min-h-[208px] bg-white/[0.15] border-[3px] border-white/80 rounded-[44px] shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] overflow-hidden backdrop-blur-[24px] flex flex-col items-center justify-center p-8 transition-transform hover:scale-[1.02] duration-500">
            <h3 className="font-sans text-2xl font-bold text-teal-900 mb-4 tracking-tight">
              Hành trình ngàn dặm bắt đầu từ một bước chân
            </h3>
            <p className="font-sans text-lg text-teal-800 leading-relaxed text-center max-w-[500px] mb-6">
              Khám phá những vùng đất mới, văn hóa mới và tạo ra những kỷ niệm không thể nào quên. Chúng tôi cung cấp các tour du lịch chất lượng cao với giá cả hợp lý nhất.
            </p>
            
            <button 
              onClick={handleScrollToTours}
              className="w-[200px] h-14 bg-[var(--color-wandor-dark)] border-none rounded-[44px] shadow-lg cursor-pointer flex items-center justify-center font-sans text-base font-medium text-[#fafafa] uppercase tracking-[0.02em] transition-all hover:bg-teal-900 hover:shadow-xl hover:-translate-y-1 active:scale-95"
            >
              Bắt Đầu Khám Phá
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
