import { SituacaoLesao } from "@/enums/SituacaoLesao";
import { Sexo } from "./enums";

export interface CoberturaResumida {
    nome: string;
}

export interface DetalhesCurativoRelatorio {
    profissional: string;
    lesao: string;
    data: Date; 
    observacoes: string;
    orientacoes: string;
    coberturas: CoberturaResumida[];
    fotos: string[];
    situacao: SituacaoLesao;
    altura: number;
    largura: number;
    profundidade: number;
}

export interface PacienteCurativoRelatorio {
    nomePaciente: string;
    cpf: string;
    contato: string;
    sexo: Sexo;
    dataNascimento: Date; 
    curativos: DetalhesCurativoRelatorio[];
}

export interface DetalhesCurativoProfissionalRelatorio {
    nomePaciente: string;
    sexoPaciente: Sexo;
    lesao: string;
    data: Date;
    observacoes: string;
    orientacoes: string;
    coberturas: CoberturaResumida[];
    situacao: SituacaoLesao;
    altura: number;
    largura: number;
    profundidade: number;
}

export interface ProfissionalCurativoRelatorio {
    nomeProfissional: string;
    emailProfissional: string;
    cpfProfissional: string;
    curativos: DetalhesCurativoProfissionalRelatorio[];
}

export interface CurativosLesaoDetalhes {
    profissional: string;
    data: Date;
    observacoes: string;
    orientacoes: string;
    coberturas: CoberturaResumida[];
    situacao: SituacaoLesao;
    altura: number;
    largura: number;
    profundidade: number;
}

export interface LesaoCurativoRelatorio {
    lesao: string;
    nomePaciente: string;
    sexo: Sexo;
    dataNascimento: Date;
    curativos: CurativosLesaoDetalhes[];
    cpf: string;
    contato: string;
}

export const criarLesaoCurativoRelatorio = (): LesaoCurativoRelatorio => {
    return {
        lesao: '',
        nomePaciente: '',
        sexo: Sexo.Masculino,
        dataNascimento: new Date(),
        curativos: [],
        cpf: '',
        contato: ''
    };
};

export const criarCurativosLesaoDetalhes = (): CurativosLesaoDetalhes => {
    return {
        profissional: '',
        data: new Date(),
        observacoes: '',
        orientacoes: '',
        coberturas: [],
        situacao: SituacaoLesao.None,
        altura: 0,
        largura: 0,
        profundidade: 0
    };
};

export const criarProfissionalCurativoRelatorio = (): ProfissionalCurativoRelatorio => {
    return {
        nomeProfissional: '',
        emailProfissional: '',
        cpfProfissional: '',
        curativos: []
    };
};

export const criarDetalhesCurativoProfissionalRelatorio = (): DetalhesCurativoProfissionalRelatorio => {
    return {
        nomePaciente: '',
        sexoPaciente: Sexo.Masculino,
        lesao: '',
        data: new Date(),
        observacoes: '',
        orientacoes: '',
        coberturas: [],
        altura: 0,
        largura: 0,
        profundidade: 0,
        situacao: SituacaoLesao.None
    };
};

export const criarPacienteCurativoRelatorio = (): PacienteCurativoRelatorio => {
    return {
        nomePaciente: '',
        cpf: '',
        contato: '',
        sexo: Sexo.Masculino,
        dataNascimento: new Date(), 
        curativos: [],
    };
};

export const criarDetalhesCurativoRelatorio = (): DetalhesCurativoRelatorio => {
    return {
        profissional: '',
        lesao: '',
        data: new Date(), 
        observacoes: '',
        orientacoes: '',
        coberturas: [],
        fotos: [],
        altura: 0,
        largura: 0,
        profundidade: 0,
        situacao: SituacaoLesao.None
    };
};

export const criarCoberturaResumida = (): CoberturaResumida => {
    return {
        nome: ''
    };
};

export const transformarFotosCurativos = (paciente: PacienteCurativoRelatorio): PacienteCurativoRelatorio => {
    console.log(paciente)
    return {
        ...paciente,
        curativos: paciente.curativos.map(curativo => ({
            ...curativo,
            fotos: curativo.fotos.map(foto => `data:image/jpeg;base64,${foto}`)
        }))
    };
};