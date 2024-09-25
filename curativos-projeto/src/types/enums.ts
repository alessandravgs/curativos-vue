export enum Sexo {
    Feminino = 0,
    Masculino = 1,
}

export enum Membro{
    None,
    MembrosSuperiores,
    MembrosInferiores,
    MembroSuperiorEsquerdo,
    MembroSuperiorDireito,
    MembroInferiorDireito,
    MembroInferiorEsquerdo,
}

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
    Pododáctilo,
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

export enum LadoRegiao{
    Nenhuma,
    Esquerda, 
    Direita
}

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

export enum TipoUlcera{
    Nenhuma,
    Mista,
    Venosa,
    Arterial
}