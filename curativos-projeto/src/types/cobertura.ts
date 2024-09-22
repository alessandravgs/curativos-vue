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
  
  // Interface para o retorno paginado
  export interface PaginacaoResult<T> {
    totalItems: number;
    pageNumber: number;
    pageSize: number;
    items: T[];
  }
  