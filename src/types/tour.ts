export interface Tour {
  id: string;
  name: string;
  image: string;
  description: string;
  category: string; // 'Trong nước' | 'Quốc tế'
  price: number;
  destination: string;
  duration: string;
  departureDate: string;
  images?: string[];
  rating?: number;
  reviewCount?: number;
  detailDescription?: string;
  highlights?: string[];
  itinerary?: {
    day: number;
    title: string;
    description: string;
  }[];
}
