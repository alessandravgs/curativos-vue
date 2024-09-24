// Interface para o retorno paginado
export interface PaginacaoResult<T> {
    totalItems: number;
    pageNumber: number;
    pageSize: number;
    items: T[];
  }