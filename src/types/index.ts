export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string | null;
  gender: string;
  city: string | null;
  district: string | null;
  street: string | null;
  image: string | null;
  status: number;
  created_at: string;
  updated_at: string;
}