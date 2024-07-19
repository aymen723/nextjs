export type StockFilterParams = {
  page?: number | string;
  pageSize?: number | string;
  tags?: number[] | string[] | number | string;
  pharmacies?: number[] | string[] | number | string;
  products?: number[] | string[] | number | string;
  search?: string;
};

export type StockUpdateRequest = {
  price?: number;
  overridden?: boolean;
  overriddenAvailability?: boolean;
};
