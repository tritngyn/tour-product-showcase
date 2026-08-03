import { useState, useMemo } from 'react';
import { useTours } from '../hooks/useTours';
import { TourCard } from '../components/tour/TourCard';
import { TourFilters } from '../components/tour/TourFilters';
import { EmptyState } from '../components/ui/EmptyState';
import { Loader2 } from 'lucide-react';

export const ProductList = () => {
  const { tours, isLoading, error } = useTours();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredTours = useMemo(() => {
    return tours.filter(tour => {
      // 1. Search filter
      const q = searchQuery.toLowerCase();
      const matchesSearch = tour.name.toLowerCase().includes(q) || tour.destination.toLowerCase().includes(q);
      
      // 2. Category filter
      const matchesCategory = categoryFilter === 'all' || tour.category === categoryFilter;
      
      // 3. Price filter
      let matchesPrice = true;
      if (priceFilter === '<3') matchesPrice = tour.price < 3000000;
      else if (priceFilter === '3-5') matchesPrice = tour.price >= 3000000 && tour.price <= 5000000;
      else if (priceFilter === '>5') matchesPrice = tour.price > 5000000;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [tours, searchQuery, priceFilter, categoryFilter]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setPriceFilter('all');
    setCategoryFilter('all');
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 size={40} className="text-teal-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Đang tìm kiếm những hành trình tuyệt vời...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-100 p-6 rounded-2xl text-center text-red-600 max-w-lg mx-auto mt-10">
        <p className="font-bold mb-2">Đã có lỗi xảy ra</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Khám phá thế giới</h1>
        <p className="text-gray-500">Tìm kiếm và lên kế hoạch cho chuyến đi tiếp theo của bạn.</p>
      </div>

      <TourFilters 
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        priceFilter={priceFilter} setPriceFilter={setPriceFilter}
        categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}
      />

      {filteredTours.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTours.map(tour => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      ) : (
        <EmptyState onClear={handleClearFilters} />
      )}
    </div>
  );
};
