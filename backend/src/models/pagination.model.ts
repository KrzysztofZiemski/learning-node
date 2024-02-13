export interface PaginationQuery {
  limit?: number;
  page?: number;
}

export interface Pagination {
  limit: number;
  skip: number;
}
