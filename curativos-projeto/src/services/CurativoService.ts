import axios from 'axios';
import { CurativoDto, CurativoResumoResult, RegisterCurativoRequest, UpdateCurativoRequest, createDefaultCurativo } from './../types/curativo';
import { PaginacaoResult } from '@/types/geral';

export const createCurativo = async (data: RegisterCurativoRequest): Promise<number | null> => {
    try {
        const response = await axios.post<number>('https://localhost:7164/curativo/register', data);
        console.log('Curativo criado com sucesso:', response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Erro ao criar Curativo:', error.response?.data || error.message);
        } else {
            console.error('Erro inesperado:', error);
        }
        return null;
    }
};

export const updateCurativo = async (data: UpdateCurativoRequest): Promise<number | null> => {
  try {
      const response = await axios.post<number>('https://localhost:7164/curativo/update', data);
      console.log('Curativo atualizado com sucesso:', response.data);
      return response.data;
  } catch (error) {
      if (axios.isAxiosError(error)) {
          console.error('Erro ao atualizar curativo:', error.response?.data || error.message);
      } else {
          console.error('Erro inesperado:', error);
      }
      return null;
  }
};

export const getCurativoById = async (parametro: number): Promise<CurativoDto> => {
    try {
  
        const response = await axios.get<CurativoDto>
        ("https://localhost:7164/curativo/id", { params: { parametro } });
  
      return response.data;
  
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro ao consultar curativo:', error.response?.data || error.message);
      } 
      else {
        console.error('Erro inesperado:', error);
      }
      return createDefaultCurativo();
    }
};

export const getCurativosPaginado = async (pageNumber = 1, pageSize = 10): Promise<PaginacaoResult<CurativoResumoResult>> => {
  try {
    const response = await axios.get<PaginacaoResult<CurativoResumoResult>>
    ("https://localhost:7164/curativo/paginado", { params: { pageNumber, pageSize } });

    return response.data; 
  } 
  catch (error) 
  {
    if (axios.isAxiosError(error)) {
      console.error('Erro ao consultar curativos:', error.response?.data || error.message);
    } 
    else {
      console.error('Erro inesperado:', error);
    }
    return {
      totalItems: 0,      
      pageSize: 0,  
      pageNumber: 1,    
      items: []         
    };
  }
};

export const getCurativoSearchByPacientePaginado = async (parametro: string, pageNumber = 1, pageSize = 10): Promise<PaginacaoResult<CurativoResumoResult>> => {
    try {
  
        const response = await axios.get<PaginacaoResult<CurativoResumoResult>>
        ("https://localhost:7164/curativo/search", { params: { parametro, pageNumber, pageSize } });
  
      return response.data;
  
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro ao consultar curativos:', error.response?.data || error.message);
      } 
      else {
        console.error('Erro inesperado:', error);
      }
      return {
        totalItems: 0,      
        pageSize: 0,  
        pageNumber: 1,    
        items: []         
      };
    }
  };