export type TagTypeRespData = {
  id: number;
  name: "TYPE" | "DESCRIBER";
};

export type TagRespData = {
  id: number;
  name: string;
  description: string;
  type: TagTypeRespData;
};

export type ProductRespData = {
  id: number;
  name: string;
  description: string;
  price: number;
  barcode: string;
  tags: TagRespData[];
  picture?: string;
  para: boolean;
  notice?: string | null;
};

export type Coordinates = {
  x: number;
  y: number;
  z: "NaN";
  m: "NaN";
  valid: boolean;
};

export type Location = {
  id: number;
  googleUrl?: string;
  coordinates: Coordinates;
};

export type UptimeRespData = {
  id: number;
  openTime: string;
  closeTime: string;
  day: WeekDay;
};

export type PharmacyUptime = {
  uptimes?: UptimeRespData[];
  open: boolean;
};

export type PharmacyRespData = {
  id: number;
  name: string;
  accountId: number;
  location: Location;
  supportPayment: boolean;
  enabled: boolean;
  picture: string | null;
  phoneNumber: string | null;
  upTimes: PharmacyUptime;
};

export type StockId = {
  productId: number;
  pharmacyId: number;
};

export type PrivateStockData = {
  available: boolean;
  overridden: boolean;
  overriddenAvailability: boolean;
};

export type AvailableStockRespData = {
  id: StockId;
  product: ProductRespData;
  pharmacy: PharmacyRespData;
  price?: number | null;

  purchasable: boolean;
  privateData: PrivateStockData | null;
};

export type WeekDay =
  | "SUNDAY"
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY";

export type BookmarkRespData = {
  id: number;
  accountId: number;
  registeredProduct?: Omit<ProductRespData, "tags"> | null;
  products?: Omit<ProductRespData, "tags">[];
  name: string;
};

export type PurchaseRespData = {
  product: ProductRespData;
  productPrice: number;
  count: number;
};

export type OrderRespData = {
  id: number;

  secret: string;

  deliveryId?: number | null;

  accountId: number;

  pharmacy: PharmacyRespData;

  purchases: PurchaseRespData[];

  paymentId: number | null;

  checkoutPrice?: number | null;

  status: "INITIALIZING" | "PENDING" | "CANCELED" | "DELIVERING" | "FINALISED";

  date: string;

  price: number;

  deliveryPrice?: number | null;
};
