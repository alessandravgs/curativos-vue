export enum Sexo {
    Feminino = 0,
    Masculino = 1,
}

export const SexoDisplayNames: { [key in Sexo]: string } = {
    [Sexo.Feminino]: 'Feminino',
    [Sexo.Masculino]: 'Masculino',
};

export const getSelectedSexo = (selectedTipo: string): Sexo | null => {
    // Encontra o enum correspondente ao nome exibido
    const enumKey = (Object.keys(Sexo) as Array<keyof typeof Sexo>).find(key => 
        SexoDisplayNames[Sexo[key]] === selectedTipo
    );

    // Retorna o valor do enum, se encontrado
    return enumKey !== undefined ? Sexo[enumKey as keyof typeof Sexo] : null;
};