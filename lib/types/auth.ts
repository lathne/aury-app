export interface AuthUser {
  id: string;
  email: string;
  name: string;
  token: string;
}

export interface AuthData extends AuthUser {
  timestamp: number;
}
