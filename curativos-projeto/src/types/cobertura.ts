// Interface para representar o objeto Curativo
  export interface Curativo {
    id: number;
    descricao: string;
  }
  
  // Interface para representar o objeto Cobertura
  export interface Cobertura {
    id: number;
    nome: string;
    descricao: string;
    curativos: Curativo[];
  }

  export interface CoberturaResumoResult {
    id: number;
    nome: string;
    descricao: string;
  }

  export interface CoberturaUpdateRequest {
    Id: number;
    Nome: string;
    Descricao: string;
 }
  