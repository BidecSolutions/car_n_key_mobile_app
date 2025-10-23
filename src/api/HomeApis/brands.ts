import api from '..';
import { Brand, BrandResponse } from '../../types';

export const fetchBrands = async (): Promise<Brand[]> => {
  try {
    const response = await api.protected.get<BrandResponse>('brands');
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error('Failed to fetch brands');
    }
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw error;
  }
};
