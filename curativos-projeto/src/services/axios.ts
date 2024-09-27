import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useRouter } from 'vue-router';

interface JwtPayload {
  exp: number;
}

const router = useRouter();

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
                router.push({ name: 'Login' });
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
      // A resposta foi recebida, mas o status é um erro
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        router.push({ name: 'Login' });
      }
    } else {
      // Não foi possível receber uma resposta
      console.error('Erro de conexão:', error.message);
    }
    return Promise.reject(error);
  }
);


export default apiClient;
