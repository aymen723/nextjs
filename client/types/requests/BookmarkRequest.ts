export type BookmarkFilterParams = {
  name?: string;

  page?: number | string;
  pageSize?: number | string;
  accountId?: number;
  registeredProd?: number;
};

export type BookmarkCreateRequest = {
  name?: string;
  registeredProd?: number;
  products?: number[];
};
