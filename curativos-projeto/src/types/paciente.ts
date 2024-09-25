import { Sexo } from "./enums";

export interface PacienteResumoResult{
    id: number,
    nome: string, 
    sexo: Sexo,
    dataNascimento: Date,
    cpf: string,
    telefone: string,
}

export interface Paciente {
    id: number, 
    nome: string,
    cpf: string,
    dataNascimento: Date,
    sexo: Sexo,
    telefone: string,
    email: string,
    alergias: Alergia[],
    comorbidades: Comorbidade[]
}

export interface Alergia{
    id: number,
    nome: string,
}

export interface Comorbidade{
    id: number,
    nome: string,
}

export interface RegisterPacienteRequest{
    nome: string,
    cpf: string,
    dataNascimento: Date,
    sexo: Sexo,
    telefone: string,
    email: string,
    alergias: number[],
    comorbidades: number[],
}