export type ProductFilterParams = {
  search?: string;
  tags?: number[] | string[] | number | string;
  page?: number | string;
  pageSize?: number | string;
  ids?: number[] | string[] | number | string;
};
