export type PaymentProduct = {
  productId: number;
  count: number;
};
export type PaymentCreationRequest = {
  pharmacyId: number;
  products: PaymentProduct[];
  delivery: boolean;
  x?: number;
  y?: number;
};

export type OrderFilterParams = {
  page?: number | string;
  pageSize?: number | string;
};
