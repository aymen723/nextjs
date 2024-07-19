import {
  Coordinates,
  Location,
  OrderRespData,
} from "@/client/types/responses/StockResponses";

export const weekDayFr = {
  SUNDAY: "dimanche",
  MONDAY: "lundi",
  TUESDAY: "mardi",
  WEDNESDAY: "mercredi",
  THURSDAY: "jeudi",
  FRIDAY: "vendredi",
  SATURDAY: "samedi",
} as const;

export const weekDayNum = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
} as const;

export const OrderStatusFr: Record<OrderRespData["status"], string> = {
  INITIALIZING: "initialisation",
  PENDING: "en attente",
  DELIVERING: "livrer",
  FINALISED: "finalisé",
  CANCELED: "annulé",
} as const;

export const getGoogleUrlFromLocation = (location: Location) => {
  if (location.googleUrl) return location.googleUrl;
  return `https://www.google.com/maps?q=${location.coordinates.y},${location.coordinates.x}`;
};
