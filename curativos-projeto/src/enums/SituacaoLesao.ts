export enum SituacaoLesao{
    None,
    Granulacao,
    Hiperqueratosa,
    Descamativa,
    Necrose,
    Eritematosa,
    Maceracao,
    Bolhosa,
    Fibrinosa,
    Fechada
}

export const SituacaoLesaoDisplayNames: { [key in SituacaoLesao]: string } = {
    [SituacaoLesao.None]: 'Nenhuma',
    [SituacaoLesao.Granulacao]: 'Granulação',
    [SituacaoLesao.Hiperqueratosa]: 'Hiperqueratosa',
    [SituacaoLesao.Descamativa]: 'Descamativa',
    [SituacaoLesao.Necrose]: 'Necrose',
    [SituacaoLesao.Eritematosa]: 'Eritematosa',
    [SituacaoLesao.Maceracao]: 'Maceracão',
    [SituacaoLesao.Bolhosa]: 'Bolhosa',
    [SituacaoLesao.Fibrinosa]: 'Fibrinosa',
    [SituacaoLesao.Fechada]: 'Fechada'
};

export const getSelectedSituacaoLesao = (selectedTipo: string): SituacaoLesao => {
    // Encontra o enum correspondente ao nome exibido
    const enumKey = (Object.keys(SituacaoLesao) as Array<keyof typeof SituacaoLesao>).find(key => 
        SituacaoLesaoDisplayNames[SituacaoLesao[key]] === selectedTipo
    );

    // Retorna o valor do enum, se encontrado
    return enumKey !== undefined ? SituacaoLesao[enumKey as keyof typeof SituacaoLesao] : SituacaoLesao.None;
};