import 'axios';

declare module 'axios' {
  interface AxiosRequestConfig {
    skipAuth?: boolean; // Adiciona a propriedade skipAuth
  }
}