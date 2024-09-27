import { SituacaoLesao } from "@/enums/SituacaoLesao";
import { Sexo } from "./enums";
import { Membro } from "@/enums/Membro";
import { Regiao } from "@/enums/Regiao";
import { LadoRegiao } from "@/enums/LadoRegiao";
import { TipoUlcera } from "@/enums/TipoUlcera";
import { CoberturaResumoResult } from "./cobertura";

export interface RegisterCurativoRequest {
    PacienteId: number;             
    LesaoId: number;                 
    CoberturasIds: number[];         
    Observacoes?: string;             
    Orientacoes?: string;             
    Altura: number;                   
    Largura: number;                 
    Profundidade: number;             
    SituacaoLesao: SituacaoLesao;         
}

export interface CurativoDto {
    id: number;
    paciente: PacienteCurativoDto;
    lesao: LesaoCurativoDto;
    evolucao: EvolucaoLesaoCurativoDto;
    coberturas: CoberturaResumoResult[];
    orientacoes: string;
    detalhes: string;
}

export interface PacienteCurativoDto {
    id: number;
    nome: string;
    sexo: Sexo;
    dataNascimento: Date;
    cpf: string;
    telefone: string;
}

export interface LesaoCurativoDto {
    id: number;
    membro: Membro;
    regiao: Regiao;
    ladoRegiao: LadoRegiao;
    situacao: SituacaoLesao;
    tipoUlcera: TipoUlcera;
    cirurgica: boolean;
    infectada: boolean;
    deiscenciaCirurgica: boolean;
    hanseniase: boolean;
    miiase: boolean;
    amputacao: boolean;
    desbridamento: boolean;
    traumatica: boolean;
    detalhes: string;
}

export interface EvolucaoLesaoCurativoDto {
    altura: number;
    largura: number;
    profundidade: number;
}

export interface CurativoResumoResult {
    id: number;
    lesao: string;
    paciente: string;
    data: Date; 
}

export interface UpdateCurativoRequest {
    id: number;
    pacienteId: number;
    lesaoId: number;
    coberturasIds: number[];
    observacoes?: string; 
    orientacoes?: string;
    altura: number;
    largura: number;
    profundidade: number;
    situacao: SituacaoLesao; 
}

export const createDefaultCurativo = (): CurativoDto => {
    return {
        id: 0,
        paciente: {
            id: 0,
            nome: '',
            sexo: Sexo.Feminino,
            dataNascimento: new Date(),
            cpf: '',
            telefone: '',
        },
        lesao: {
            id: 0,
            membro: Membro.None,
            regiao: Regiao.None,
            ladoRegiao: LadoRegiao.Nenhuma,
            situacao: SituacaoLesao.None,
            tipoUlcera: TipoUlcera.Nenhuma,
            cirurgica: false,
            infectada: false,
            deiscenciaCirurgica: false,
            hanseniase: false,
            miiase: false,
            amputacao: false,
            desbridamento: false,
            traumatica: false,
            detalhes: '',
        },
        evolucao: {
            altura: 0,
            largura: 0,
            profundidade: 0,
        },
        coberturas: [],
        orientacoes: '',
        detalhes: '',
    };
};
