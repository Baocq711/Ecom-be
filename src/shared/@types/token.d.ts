export {};
declare global {
  interface JwtPayload {
    exp: number;
    iat: number;
  }

  interface UserJwtPayload extends JwtPayload {
    id: string;
    // role: string;
  }
  interface UserPayload {
    id: string;
    // role: string;
  }
}
