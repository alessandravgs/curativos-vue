export enum Membro{
    None,
    MembrosSuperiores,
    MembrosInferiores,
    MembroSuperiorEsquerdo,
    MembroSuperiorDireito,
    MembroInferiorDireito,
    MembroInferiorEsquerdo,
}

export const MembroDisplayNames: { [key in Membro]: string } = {
    [Membro.None]: 'Nenhum',
    [Membro.MembrosSuperiores]: 'Membros Superiores',
    [Membro.MembrosInferiores]: 'Membros Inferiores',
    [Membro.MembroSuperiorEsquerdo]: 'Membro Superior Esquerdo',
    [Membro.MembroSuperiorDireito]: 'Membro Superior Direito',
    [Membro.MembroInferiorDireito]: 'Membro Inferior Direito',
    [Membro.MembroInferiorEsquerdo]: 'Membro Inferior Esquerdo',
};

export const getSelectedMembro = (selectedTipo: string): Membro => {
    // Encontra o enum correspondente ao nome exibido
    const enumKey = (Object.keys(Membro) as Array<keyof typeof Membro>).find(key => 
        MembroDisplayNames[Membro[key]] === selectedTipo
    );

    // Retorna o valor do enum, se encontrado, ou um valor padrão
    return enumKey !== undefined ? Membro[enumKey as keyof typeof Membro] : Membro.None; 
};
