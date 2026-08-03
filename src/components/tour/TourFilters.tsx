import { Search, Map } from 'lucide-react';

interface TourFiltersProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  priceFilter: string;
  setPriceFilter: (v: string) => void;
  categoryFilter: string;
  setCategoryFilter: (v: string) => void;
}

export const TourFilters = ({
  searchQuery, setSearchQuery,
  priceFilter, setPriceFilter,
  categoryFilter, setCategoryFilter
}: TourFiltersProps) => {
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
      <div className="flex w-full gap-4">
        {/* Category */}
        <div className="relative w-1/2 group">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Map size={18} className="text-[var(--color-wandor-muted)] opacity-70 group-focus-within:opacity-100 group-focus-within:text-teal-600 transition-colors" />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="block w-full pl-12 pr-10 py-3.5 border border-gray-200 rounded-full focus:ring-4 focus:ring-teal-600/10 focus:border-teal-600 transition-all font-sans text-[15px] bg-gray-50/50 hover:bg-gray-50 outline-none appearance-none cursor-pointer text-[var(--color-wandor-dark)]"
          >
            <option value="all">Tất cả khu vực</option>
            <option value="Trong nước">Du lịch Trong nước</option>
            <option value="Quốc tế">Du lịch Quốc tế</option>
          </select>
        </div>

        {/* Price */}
        <div className="relative w-1/2 group">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none font-bold">
            <span className="text-[var(--color-wandor-muted)] opacity-70 group-focus-within:opacity-100 group-focus-within:text-teal-600 transition-colors">₫</span>
          </div>
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="block w-full pl-12 pr-10 py-3.5 border border-gray-200 rounded-full focus:ring-4 focus:ring-teal-600/10 focus:border-teal-600 transition-all font-sans text-[15px] bg-gray-50/50 hover:bg-gray-50 outline-none appearance-none cursor-pointer text-[var(--color-wandor-dark)]"
          >
            <option value="all">Mọi mức giá</option>
            <option value="<3">Dưới 3 triệu</option>
            <option value="3-5">Từ 3 - 5 triệu</option>
            <option value=">5">Trên 5 triệu</option>
          </select>
        </div>
      </div>
    </div>
  );
};
