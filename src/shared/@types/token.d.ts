export {};
declare global {
  interface JwtPayload {
    exp?: number;
    iat?: number;
  }

  interface UserJwtPayload {
    id: string;
    roleId: string;
  }

  interface UserGooglePayload<T = any> {
    accessToken: string;
    refreshToken: string;
    profile: T;
  }
}
