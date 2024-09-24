import axios from 'axios';
import { RegisterPacienteRequest, Alergia, Comorbidade } from '@/types/paciente';

const API_URL = "https://localhost:7164/paciente/register";

export const createPaciente = async (data: RegisterPacienteRequest ) => {
    try {
      const response = await axios.post('https://localhost:7164/paciente/register', data);
      console.log('Paciente criado com sucesso:', response.data);
    } 
    catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro ao criar paciente:', error.response?.data || error.message);
      } 
      else {
      console.error('Erro inesperado:', error);
      }
  }
};

export const fetchAlergias = async (): Promise<Alergia[]> => {
  try {
    const response = await axios.get<Alergia[]>('https://localhost:7164/paciente/alergias');
    return response.data; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro ao consultar alergias:', error.response?.data || error.message);
    } else {
      console.error('Erro inesperado:', error);
    }
    return [];
  }
};

export const fetchComorbidades = async (): Promise<Comorbidade[]> => {
  try {
    const response = await axios.get<Comorbidade[]>('https://localhost:7164/paciente/comorbidades');
    console.log("fecth")
    console.log(response.data)
    return response.data; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro ao consultar comorbidades:', error.response?.data || error.message);
    } else {
      console.error('Erro inesperado:', error);
    }
    return [];
  }
};