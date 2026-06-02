export type ResultsWithMeta<T> = {
  results: number;
  data: T[];
  page: number;
  limit: number;
  hasNextPage: boolean;
  totalCount: number;
  totalPages: number;
};

export type ResultsWithTotalCount<T> = Pick<ResultsWithMeta<T>, 'data' | 'totalCount'>;
