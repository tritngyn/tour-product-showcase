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
}
