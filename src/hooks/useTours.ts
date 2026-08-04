import { useState, useEffect } from 'react';
import { api } from '../lib/axios';
import type { Tour } from '../types/tour';

export const useTours = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/product');
        setTours(response.data);
      } catch (err) {
        setError('Không thể tải dữ liệu tour. Vui lòng thử lại sau.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchTours();
  }, []);

  return { tours, isLoading, error };
};

export const useTourDetail = (slug: string | undefined) => {
  const [tour, setTour] = useState<Tour | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    
    const fetchTour = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/product/${slug}`);
        setTour(response.data);
      } catch (err) {
        setError('Không tìm thấy thông tin tour.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchTour();
  }, [slug]);

  return { tour, isLoading, error };
};
