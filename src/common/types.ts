export interface WithPagination<T> {
  items: T[],
  offset: number,
  total: number,
}
