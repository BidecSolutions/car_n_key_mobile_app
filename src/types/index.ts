import { ImageSourcePropType } from "react-native";

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


export type VehicleInfoItem = {
  id: string;
  icon: string;
  label: string;
  value: string;
};

export interface Salesperson {
  id: number;
  name: string;
  role: string;
  rating: number;
  reviews: number;
  image: ImageSourcePropType;
}

export interface Review {
  id: number;
  author: string;
  text: string;
  rating: number;
}