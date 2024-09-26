export enum LadoRegiao{
    Nenhuma,
    Esquerda, 
    Direita
}

export const LadoRegiaoDisplayNames: { [key in LadoRegiao]: string } = {
    [LadoRegiao.Nenhuma]: 'Nenhuma',
    [LadoRegiao.Esquerda]: 'Esquerda',
    [LadoRegiao.Direita]: 'Direita',
};

export const getSelectedLadoRegiao = (selectedTipo: string): LadoRegiao => {
    // Encontra o enum correspondente ao nome exibido
    const enumKey = (Object.keys(LadoRegiao) as Array<keyof typeof LadoRegiao>).find(key => 
        LadoRegiaoDisplayNames[LadoRegiao[key]] === selectedTipo
    );

    // Retorna o valor do enum, se encontrado
    return enumKey !== undefined ? LadoRegiao[enumKey as keyof typeof LadoRegiao] : LadoRegiao.Nenhuma;
};