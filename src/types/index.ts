import {ImageSourcePropType} from 'react-native';

export type DrawerParamList = {
  Tabs: undefined;
  Wallet: undefined;
  Offers: undefined;
  History: undefined;
  Complains: undefined;
  Settings: undefined;
  Refferals: undefined;
  RideDetails: undefined;
};

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

export type Dealer = {
  id: string;
  name: string;
  offerRange: string;
  distance: string;
  inspection: string;
  pickup: string;
};

export interface Brand {
  id: number;
  name: string;
  slug: string;
  country: string;
  logoUrl: string | null;
  foundedYear: number | null;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BrandResponse {
  success: boolean;
  message: string;
  data: Brand[];
}

export interface BodyType {
  id: number;
  name: string;
  image: string | null;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}
