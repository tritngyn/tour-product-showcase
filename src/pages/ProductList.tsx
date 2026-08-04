import { useState, useMemo, useEffect } from 'react';
import { useTours } from '../hooks/useTours';
import { TourCard } from '../components/tour/TourCard';
import { TourFilters } from '../components/tour/TourFilters';
import { EmptyState } from '../components/ui/EmptyState';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

export const ProductList = () => {
  const { tours, isLoading, error } = useTours();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Reset về trang 1 khi đổi filter
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, priceFilter, categoryFilter]);

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
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredTours.length / itemsPerPage);
  const paginatedTours = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTours.slice(start, start + itemsPerPage);
  }, [filteredTours, currentPage]);

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
        <h1 className="font-sans text-[36px] font-bold text-[var(--color-wandor-text)] leading-tight tracking-[-0.04em] mb-2">Khám phá thế giới</h1>
        <p className="font-sans text-[17px] text-[var(--color-wandor-muted)]">Tìm kiếm và lên kế hoạch cho chuyến đi tiếp theo của bạn.</p>
      </div>

      <TourFilters 
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        priceFilter={priceFilter} setPriceFilter={setPriceFilter}
        categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}
      />

      {filteredTours.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedTours.map(tour => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-[var(--color-wandor-text)] hover:bg-teal-50 hover:text-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              
              {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;
                // Chỉ hiển thị trang đầu, trang cuối và các trang xung quanh trang hiện tại
                if (
                  page === 1 || 
                  page === totalPages || 
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-[15px] font-medium transition-colors ${
                        currentPage === page 
                          ? 'bg-teal-600 text-white shadow-md' 
                          : 'text-[var(--color-wandor-muted)] hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  );
                } else if (
                  page === currentPage - 2 ||
                  page === currentPage + 2
                ) {
                  return <span key={page} className="text-gray-400">...</span>;
                }
                return null;
              })}

              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-[var(--color-wandor-text)] hover:bg-teal-50 hover:text-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      ) : (
        <EmptyState onClear={handleClearFilters} />
      )}
    </div>
  );
};
