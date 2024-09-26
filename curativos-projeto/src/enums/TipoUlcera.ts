export enum TipoUlcera{
    Nenhuma,
    Mista,
    Venosa,
    Arterial
}

export const TipoUlceraDisplayNames: { [key in TipoUlcera]: string } = {
    [TipoUlcera.Nenhuma]: 'Nenhuma',
    [TipoUlcera.Mista]: 'Mista',
    [TipoUlcera.Venosa]: 'Venosa',
    [TipoUlcera.Arterial]: 'Arterial'
};

export const getSelectedTipoUlcera = (selectedTipo: string): TipoUlcera => {
    // Encontra o enum correspondente ao nome exibido
    const enumKey = (Object.keys(TipoUlcera) as Array<keyof typeof TipoUlcera>).find(key => 
        TipoUlceraDisplayNames[TipoUlcera[key]] === selectedTipo
    );

    // Retorna o valor do enum, se encontrado
    return enumKey !== undefined ? TipoUlcera[enumKey as keyof typeof TipoUlcera] : TipoUlcera.Nenhuma;
};