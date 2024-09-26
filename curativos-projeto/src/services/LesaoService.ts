import axios from 'axios';
import { RegisterLesaoRequest, UpdateLesaoRequest, LesaoResumoResult, LesaoDto } from '@/types/lesao';
import { PaginacaoResult } from '@/types/geral';
import {  Membro  } from '@/enums/Membro';
import {  Regiao  } from '@/enums/Regiao';
import {  LadoRegiao } from '@/enums/LadoRegiao';
import {  SituacaoLesao  } from '@/enums/SituacaoLesao';
import {  TipoUlcera  } from '@/enums/TipoUlcera';
import { Sexo } from '@/enums/Sexo';

export const createLesao = async (data: RegisterLesaoRequest): Promise<LesaoDto | null> => {
  try {
      const response = await axios.post<LesaoDto>('https://localhost:7164/lesao/register', data);
      console.log('Lesão criada com sucesso:', response.data);
      return response.data;
  } catch (error) {
      if (axios.isAxiosError(error)) {
          console.error('Erro ao criar Lesão:', error.response?.data || error.message);
      } else {
          console.error('Erro inesperado:', error);
      }
      return null;
  }
};

export const updateLesao = async (data: UpdateLesaoRequest): Promise<LesaoDto | null> => {
  try {
      const response = await axios.post<LesaoDto>('https://localhost:7164/lesao/update', data);
      console.log('Lesão atualizado com sucesso:', response.data);
      return response.data;
  } catch (error) {
      if (axios.isAxiosError(error)) {
          console.error('Erro ao criar Lesão:', error.response?.data || error.message);
      } else {
          console.error('Erro inesperado:', error);
      }
      return null;
  }
};



export const getLesoesPaginado = async (pageNumber = 1, pageSize = 10): Promise<PaginacaoResult<LesaoResumoResult>> => {
  try {
    const response = await axios.get<PaginacaoResult<LesaoResumoResult>>
    ("https://localhost:7164/lesao/paginado", { params: { pageNumber, pageSize } });

    return response.data; 
  } 
  catch (error) 
  {
    if (axios.isAxiosError(error)) {
      console.error('Erro ao consultar lesões:', error.response?.data || error.message);
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

export const getLesoesSearchPaginado = async (parametro: string, pageNumber = 1, pageSize = 10): Promise<PaginacaoResult<LesaoResumoResult>> => {
  try {

      const response = await axios.get<PaginacaoResult<LesaoResumoResult>>
      ("https://localhost:7164/lesao/search", { params: { parametro, pageNumber, pageSize } });

    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro ao consultar lesões:', error.response?.data || error.message);
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

export const getLesaoById = async (parametro: number): Promise<LesaoDto> => {
  try {

      const response = await axios.get<LesaoDto>
      ("https://localhost:7164/lesao/id", { params: { parametro } });

    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro ao consultar lesão:', error.response?.data || error.message);
    } 
    else {
      console.error('Erro inesperado:', error);
    }
    return {
        id: 0,
        paciente: {id: 0, nome: '', dataNascimento: new Date(), cpf: '', sexo: Sexo.Feminino},
        membro: Membro.None, 
        regiao: Regiao.None, 
        ladoRegiao: LadoRegiao.Nenhuma, 
        situacao: SituacaoLesao.None, 
        cirurgica: false,
        infectada: false,
        tipoUlcera: TipoUlcera.Nenhuma, 
        deiscenciaCirurgica: false,
        hanseniase: false,
        miiase: false,
        amputacao: false,
        desbridamento: false,
        traumatica: false,
        detalhes: '',
        altura: 0,
        largura: 0,
        profundidade: 0
      };
  }
};