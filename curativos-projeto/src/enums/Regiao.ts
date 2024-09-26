export enum Regiao{
    None,
    PavilhaoAuditivo,
    RegiaoOcciptal,
    Cotovelo,
    Mao,
    Trocanter,
    Joelho,
    RegiaoSacral,
    Quirodactilo,
    Pododactilo,
    Halux,
    MaleoloLateral,
    MaleoloInterno,
    Calcanhar,
    RegiaoPlanar,
    Dorso, 
    Coto, 
    Anterior,
    Posterior,
    Medio,
    Lateral
}

export const RegiaoDisplayNames: { [key in Regiao]: string } = {
    [Regiao.None]: 'Nenhuma',
    [Regiao.PavilhaoAuditivo]: 'Pavilhão Auditivo',
    [Regiao.RegiaoOcciptal]: 'Região Occipital',
    [Regiao.Cotovelo]: 'Cotovelo',
    [Regiao.Mao]: 'Mão',
    [Regiao.Trocanter]: 'Trocanter',
    [Regiao.Joelho]: 'Joelho',
    [Regiao.RegiaoSacral]: 'Região Sacral',
    [Regiao.Quirodactilo]: 'Quirodáctilo',
    [Regiao.Pododactilo]: 'Pododáctilo',
    [Regiao.Halux]: 'Hálux',
    [Regiao.MaleoloLateral]: 'Maleolo Lateral',
    [Regiao.MaleoloInterno]: 'Maleolo Interno',
    [Regiao.Calcanhar]: 'Calcanhar',
    [Regiao.RegiaoPlanar]: 'Região Planar',
    [Regiao.Dorso]: 'Dorso',
    [Regiao.Coto]: 'Coto',
    [Regiao.Anterior]: 'Anterior',
    [Regiao.Posterior]: 'Posterior',
    [Regiao.Medio]: 'Médio',
    [Regiao.Lateral]: 'Lateral'
};

export const getSelectedRegiao = (selectedTipo: string): Regiao => {
    // Encontra o enum correspondente ao nome exibido
    const enumKey = (Object.keys(Regiao) as Array<keyof typeof Regiao>).find(key => 
        RegiaoDisplayNames[Regiao[key]] === selectedTipo
    );

    // Retorna o valor do enum, se encontrado
    return enumKey !== undefined ? Regiao[enumKey as keyof typeof Regiao] : Regiao.None;
};