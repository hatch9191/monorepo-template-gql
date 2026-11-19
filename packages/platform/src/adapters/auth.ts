export type AuthAdapter = {
  getToken(): Promise<string | null>;
  signOut(): Promise<void>;
};
