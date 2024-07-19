export type TokenData = {
  token: string;
  expirationDate: string;
  creationDate: string;
};

export type UserRole = "CLIENT" | "ADMIN" | "PHARMACY";

export type PharmacyProfile = {
  id: number;
  name: string;
  enabled: boolean;
  accountId: number;
  phoneNumber: null | string;
  picture: string | null;
};

export type UserProfile = {
  id: number;
  username: string;
  email: string;
  emailVerified: boolean;
  picture?: string;
  role: UserRole;
  pharmacy: PharmacyProfile | null;
};

export type LoginResp = {
  tokenData: TokenData;
  refreshTokenData: TokenData;
  role: UserRole;
  id: number;
  profile: UserProfile;
};
