import axios from 'axios';

import { API_URL, NEXT_URL } from '@/config/index';
export const apiFetcher = async (url: string): Promise<any> => {
  try {
    const { data } = await axios.get(`${API_URL}${url}`);
    return data;
  } catch (error) {
    return (error as Record<string, any>)?.response?.data;
  }
};

export const apiGet = async (url: string): Promise<any> => {
  try {
    const { data } = await axios.get(`${API_URL}${url}`);
    return data;
  } catch (error) {
    return (error as Record<string, any>)?.response?.data;
  }
};

export const sessionGet = async (url: string): Promise<any> => {
  try {
    const { data } = await axios.get(`${NEXT_URL}/api/session/${url}`);
    return data;
  } catch (error) {
    return (error as Record<string, any>)?.response?.data;
  }
};
