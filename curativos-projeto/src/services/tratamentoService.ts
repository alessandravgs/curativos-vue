import axios from 'axios';
import { Cobertura, CoberturaResumoResult } from '@/types/cobertura';
import { PaginacaoResult } from '@/types/geral';


const API_URL = 'https://localhost:7164/cobertura/register'; 
const API_URL1 = 'https://localhost:7164/cobertura/paginado'; 
const API_URL2 = 'https://localhost:7164/cobertura/search'; 
const API_URL3 = 'https://localhost:7164/cobertura/update'; 

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
        const response = await axios.get<PaginacaoResult<Cobertura>>(API_URL2, {
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
        const response = await axios.post(API_URL3, data);
        return response.data;
    }
    catch(error){
      console.error('Erro ao atualizar cobertura:', error);
      throw error;
    }
  };

  export const createTratamento = async (data: { nome: string; descricao: string } ): Promise<CoberturaResumoResult> => {
    try{
        const response = await axios.post(API_URL, data);
        return response.data;
    }
    catch(error){
      console.error('Erro ao criar cobertura:', error);
      throw error;
    }
  };