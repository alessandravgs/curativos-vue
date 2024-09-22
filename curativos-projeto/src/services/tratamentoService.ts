import axios from 'axios';
import { Cobertura, PaginacaoResult } from '@/types/cobertura';


const API_URL = 'https://localhost:7164/cobertura/register'; 
const API_URL1 = 'https://localhost:7164/cobertura/paginado'; 
const API_URL2 = 'https://localhost:7164/cobertura/search'; 

export const tratamentosService = {
  async createTratamento(data: { nome: string; descricao: string }) {
    const response = await axios.post(API_URL, data);
    console.log(response.data);
    return response.data;
  },

  async fetchTratamentos(pageNumber = 1, pageSize = 10) {
    const response = await axios.get(API_URL1, {
      params: {
        pageNumber,
        pageSize,
      },
    });
    return response.data; 
  },
};


export const getCoberturasPaginado = async (pageNumber = 1, pageSize = 10): Promise<PaginacaoResult<Cobertura>> => {
    try {
      const response = await axios.get<PaginacaoResult<Cobertura>>(API_URL1, {
        params: { pageNumber, pageSize }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar coberturas:', error);
      throw error;
    }
  };


  export const getCoberturasSearchPaginado = async (parametro: string, pageNumber = 1, pageSize = 10): Promise<PaginacaoResult<Cobertura>> => {
    try {
        console.log(parametro)
      const response = await axios.get<PaginacaoResult<Cobertura>>(API_URL2, {
        params: { parametro, pageNumber, pageSize }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar coberturas:', error);
      throw error;
    }
  };
