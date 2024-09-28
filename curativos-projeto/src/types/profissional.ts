export interface ProfissionalDto {
    nome: string;
    email: string;
    cpf: string;
    login: string;
    telefone: string;
}

export interface RegisterProfissionalRequest {
    nome: string;
    email: string;
    cpf: string;
    login: string;
    telefone: string;
    senha: string;
}


export const createDefaultProfissionalDto = (): ProfissionalDto => {
    return {
        nome: '',
        email: '',
        cpf: '',
        login: '',
        telefone: ''
    };
}
