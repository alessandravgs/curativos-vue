import { Membro, Regiao, LadoRegiao, SituacaoLesao, TipoUlcera } from "./enums";

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

export interface LesaoResumoResult{
    id: number,
    detalhes: string, 
    paciente: string,
    regiao: Regiao,
    ladoRegiao: LadoRegiao,
    situacao: SituacaoLesao,
}