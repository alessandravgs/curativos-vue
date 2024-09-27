import axios from 'axios';
import { CurativoDto, RegisterCurativoRequest, createDefaultCurativo } from './../types/curativo';

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