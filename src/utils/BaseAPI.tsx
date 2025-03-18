import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { isTokenExpired } from './jwtUtils';

export const client = axios.create({
  baseURL: 'https://localhost:7009/',
});

client.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    if (isTokenExpired(token)) {
      useAuthStore.getState().clearToken();
      throw new Error('Token expired');
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearToken();
    }
    return Promise.reject(error);
  }
);
