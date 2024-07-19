export type PaymentRespData = {
  paymentId: number;

  userId: number;

  pharmacyId: number;

  invoiceNumber: string;

  dueDate: string;

  Checkoutprice: number | null;

  checkouturl: string;
  orderId: number;

  transactionFee: number;

  deliveryPrice: number | null;

  //  Double discount;

  deliveryId: number | null;

  comment: string | null;
};
