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
    <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col xl:flex-row gap-4 items-center">
      {/* Search */}
      <div className="relative w-full xl:w-[40%] flex-shrink-0">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Bạn muốn đi đâu? (Tên tour, điểm đến...)"
          className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all sm:text-sm bg-gray-50 outline-none"
        />
      </div>

      {/* Filters container */}
      <div className="flex w-full gap-4">
        {/* Category */}
        <div className="relative w-1/2">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Map size={18} className="text-gray-400" />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="block w-full pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all sm:text-sm bg-gray-50 outline-none appearance-none cursor-pointer"
          >
            <option value="all">Tất cả khu vực</option>
            <option value="Trong nước">Du lịch Trong nước</option>
            <option value="Quốc tế">Du lịch Quốc tế</option>
          </select>
        </div>

        {/* Price */}
        <div className="relative w-1/2">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 font-bold">
            ₫
          </div>
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="block w-full pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all sm:text-sm bg-gray-50 outline-none appearance-none cursor-pointer"
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
