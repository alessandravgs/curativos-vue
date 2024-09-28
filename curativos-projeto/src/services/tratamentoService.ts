import { Cobertura, CoberturaResumoResult } from '@/types/cobertura';
import { PaginacaoResult } from '@/types/geral';
import { useRouter } from 'vue-router';
import { createApiClient } from '@/services/axios';

const router = useRouter();
const apiClient = createApiClient(router);


const API_URL = '/cobertura/register'; 
const API_URL1 = '/cobertura/paginado'; 
const API_URL2 = '/cobertura/search'; 
const API_URL3 = '/cobertura/update'; 

export const getCoberturasPaginado = async (pageNumber = 1, pageSize = 10): Promise<PaginacaoResult<Cobertura>> => {
    try {
      const response = await apiClient.get<PaginacaoResult<Cobertura>>(API_URL1, {
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
        const response = await apiClient.get<PaginacaoResult<Cobertura>>(API_URL2, {
        params: { parametro, pageNumber, pageSize }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar coberturas:', error);
      throw error;
    }
  };

  export const updateCobertura = async (data: { id: number, nome: string; descricao: string } ): Promise<CoberturaResumoResult> => {
    try{
        const response = await apiClient.post(API_URL3, data);
        return response.data;
    }
    catch(error){
      console.error('Erro ao atualizar cobertura:', error);
      throw error;
    }
  };

  export const createTratamento = async (data: { nome: string; descricao: string } ): Promise<CoberturaResumoResult> => {
    try{
        const response = await apiClient.post(API_URL, data);
        return response.data;
    }
    catch(error){
      console.error('Erro ao criar cobertura:', error);
      throw error;
    }
  };