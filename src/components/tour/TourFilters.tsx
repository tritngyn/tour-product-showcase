import { useState } from 'react';
import { Search, ChevronDown, Clock } from 'lucide-react';

interface TourFiltersProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  priceFilter: string;
  setPriceFilter: (v: string) => void;
  durationFilter: string;
  setDurationFilter: (v: string) => void;
}

export const TourFilters = ({
  searchQuery, setSearchQuery,
  priceFilter, setPriceFilter,
  durationFilter, setDurationFilter
}: TourFiltersProps) => {
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isDurationOpen, setIsDurationOpen] = useState(false);

  const prices = [
    { value: 'all', label: 'Mọi mức giá' },
    { value: '<3', label: 'Dưới 3 triệu' },
    { value: '3-5', label: 'Từ 3 - 5 triệu' },
    { value: '>5', label: 'Trên 5 triệu' }
  ];

  const durations = [
    { value: 'all', label: 'Mọi thời gian' },
    { value: 'short', label: '1 - 3 ngày' },
    { value: 'medium', label: '4 - 7 ngày' },
    { value: 'long', label: 'Trên 7 ngày' }
  ];

  return (
    <div className="bg-white p-4 sm:p-5 rounded-[32px] shadow-[0_4px_24px_0_rgba(0,0,0,0.05)] border border-gray-100/50 mb-8 flex flex-col xl:flex-row gap-4 items-center">
      {/* Search */}
      <div className="relative w-full xl:w-[40%] flex-shrink-0 group">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <Search size={18} className="text-[var(--color-wandor-muted)] opacity-70 group-focus-within:opacity-100 group-focus-within:text-teal-600 transition-colors" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Bạn muốn đi đâu? (Tên tour, điểm đến...)"
          className="block w-full pl-12 pr-6 py-3.5 border border-gray-200 rounded-full focus:ring-4 focus:ring-teal-600/10 focus:border-teal-600 transition-all font-sans text-[15px] bg-gray-50/50 hover:bg-gray-50 outline-none text-[var(--color-wandor-dark)] placeholder:text-gray-400"
        />
      </div>

      {/* Filters container */}
      <div className="flex w-full xl:w-[60%] gap-4">
        {/* Duration */}
        <div className="relative w-1/2 group z-20">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Clock size={18} className={`transition-colors ${isDurationOpen ? 'text-teal-600' : 'text-[var(--color-wandor-muted)] opacity-70 group-hover:text-teal-600'}`} />
          </div>
          <button
            type="button"
            onClick={() => { setIsDurationOpen(!isDurationOpen); setIsPriceOpen(false); }}
            onBlur={() => setTimeout(() => setIsDurationOpen(false), 200)}
            className="flex items-center justify-between w-full pl-10 sm:pl-12 pr-3 sm:pr-6 py-3.5 border border-gray-200 rounded-full focus:ring-4 focus:ring-teal-600/10 focus:border-teal-600 transition-all font-sans text-[13px] sm:text-[15px] bg-gray-50/50 hover:bg-gray-50 text-[var(--color-wandor-dark)] text-left"
          >
            <span className="truncate mr-1">{durations.find(d => d.value === durationFilter)?.label || 'Mọi thời gian'}</span>
            <ChevronDown size={16} className={`flex-shrink-0 transition-transform duration-300 text-gray-400 ${isDurationOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDurationOpen && (
            <div className="absolute z-30 mt-2 w-full bg-white border border-gray-100 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 py-2">
              {durations.map((d) => (
                <div
                  key={d.value}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setDurationFilter(d.value);
                    setIsDurationOpen(false);
                  }}
                  className={`px-5 py-3 cursor-pointer text-[15px] transition-colors ${durationFilter === d.value ? 'bg-teal-50/50 text-teal-700 font-bold' : 'hover:bg-gray-50 text-gray-600 font-medium'}`}
                >
                  {d.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price */}
        <div className="relative w-1/2 group z-10">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none font-bold">
            <span className={`transition-colors ${isPriceOpen ? 'text-teal-600' : 'text-[var(--color-wandor-muted)] opacity-70 group-hover:text-teal-600'}`}>₫</span>
          </div>
          <button
            type="button"
            onClick={() => { setIsPriceOpen(!isPriceOpen); setIsDurationOpen(false); }}
            onBlur={() => setTimeout(() => setIsPriceOpen(false), 200)}
            className="flex items-center justify-between w-full pl-10 sm:pl-12 pr-3 sm:pr-6 py-3.5 border border-gray-200 rounded-full focus:ring-4 focus:ring-teal-600/10 focus:border-teal-600 transition-all font-sans text-[13px] sm:text-[15px] bg-gray-50/50 hover:bg-gray-50 text-[var(--color-wandor-dark)] text-left"
          >
            <span className="truncate mr-1">{prices.find(p => p.value === priceFilter)?.label || 'Mọi mức giá'}</span>
            <ChevronDown size={16} className={`flex-shrink-0 transition-transform duration-300 text-gray-400 ${isPriceOpen ? 'rotate-180' : ''}`} />
          </button>

          {isPriceOpen && (
            <div className="absolute z-30 mt-2 w-full bg-white border border-gray-100 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 py-2">
              {prices.map((p) => (
                <div
                  key={p.value}
                  onMouseDown={(e) => {
                    e.preventDefault(); // Prevent onBlur from firing before click
                    setPriceFilter(p.value);
                    setIsPriceOpen(false);
                  }}
                  className={`px-5 py-3 cursor-pointer text-[15px] transition-colors ${priceFilter === p.value ? 'bg-teal-50/50 text-teal-700 font-bold' : 'hover:bg-gray-50 text-gray-600 font-medium'}`}
                >
                  {p.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
