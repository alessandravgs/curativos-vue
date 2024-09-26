import { LadoRegiao } from "@/enums/LadoRegiao";
import { Membro } from "@/enums/Membro";
import { Regiao } from "@/enums/Regiao";
import { SituacaoLesao } from "@/enums/SituacaoLesao";
import { TipoUlcera } from "@/enums/TipoUlcera";
import { Sexo } from "./enums";

export interface RegisterLesaoRequest{
    pacienteId: number,
    membro: Membro,
    regiao: Regiao,
    ladoReigao: LadoRegiao,
    situacao: SituacaoLesao,
    altura: number,
    largura: number,
    profundidade: number,
    tipoUlcera: TipoUlcera,
    cirurgica: boolean,
    infectada: boolean,
    deiscenciaCirurgica: boolean,
    hanseniase: boolean,
    miiase: boolean,
    amputacao: boolean,
    desbridamento: boolean,
    traumatica: boolean,
    detalhes: string
}

export interface UpdateLesaoRequest{
    id: number
    pacienteId: number,
    membro: Membro,
    regiao: Regiao,
    ladoReigao: LadoRegiao,
    situacao: SituacaoLesao,
    altura: number,
    largura: number,
    profundidade: number,
    tipoUlcera: TipoUlcera,
    cirurgica: boolean,
    infectada: boolean,
    deiscenciaCirurgica: boolean,
    hanseniase: boolean,
    miiase: boolean,
    amputacao: boolean,
    desbridamento: boolean,
    traumatica: boolean,
    detalhes: string
}

export interface LesaoResumoResult{
    id: number,
    detalhes: string, 
    paciente: string,
    regiao: Regiao,
    ladoRegiao: LadoRegiao,
    situacao: SituacaoLesao,
}

export interface LesaoDto {
    id: number;
    paciente: PacienteLesaoDto;
    membro: Membro; 
    regiao: Regiao; 
    ladoRegiao: LadoRegiao; 
    situacao: SituacaoLesao; 
    cirurgica: boolean;
    infectada: boolean;
    tipoUlcera: TipoUlcera; 
    deiscenciaCirurgica: boolean;
    hanseniase: boolean;
    miiase: boolean;
    amputacao: boolean;
    desbridamento: boolean;
    traumatica: boolean;
    detalhes: string;
    altura: number;
    largura: number;
    profundidade: number;
}


export interface PacienteLesaoDto {
    id: number;
    nome: string;
    dataNascimento: Date; 
    cpf: string; 
    sexo: Sexo;
}