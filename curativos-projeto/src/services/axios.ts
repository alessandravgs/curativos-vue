import axios from 'axios';
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
}

export function createApiClient(router: any) {
  const apiClient = axios.create({
    baseURL: 'https://localhost:7164',
  });

  // Interceptar todas as requisições para adicionar o token
  apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (!config.skipAuth) {
      if (token) {
        // Verifica se o token é válido (tem 3 partes)
        if (token.split('.').length === 3) {
          const decoded = jwtDecode<JwtPayload>(token);
          const currentTime = Date.now() / 1000;

          // Verifica se o token já expirou
          if (decoded.exp < currentTime) {
            localStorage.removeItem('token');
            router.push({ name: 'Login' }); // Redireciona para o login
          } else {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } else {
          console.error('Token inválido ou malformado:', token);
          localStorage.removeItem('token');
          router.push({ name: 'Login' });
        }
      }
    } 
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  // Intercepta respostas para lidar com erros 401
  apiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        if (error.response.status === 401) {
          localStorage.removeItem('token');
          router.push({ name: 'Login' });
        }
      } else {
        console.error('Erro de conexão:', error.message);
      }
      return Promise.reject(error);
    }
  );

  return apiClient;
}

