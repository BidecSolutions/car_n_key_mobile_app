import api from '..';
import { BodyType } from '../../types';

export const fetchBodyTypes = async (): Promise<BodyType[]> => {
  try {
    const response = await api.public.get('body-types');
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
