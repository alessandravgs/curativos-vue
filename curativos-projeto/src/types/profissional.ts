export interface ProfissionalDto {
    nome: string;
    email: string;
    cpf: string;
    login: string;
    telefone: string;
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
