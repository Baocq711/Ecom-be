export {};

declare global {
  interface CreateRefreshToken {
    userId: string;
    device: string;
    ip: string;
    refreshToken: string;
  }
  interface UpdateRefreshToken {
    refreshTokenId: string;
    refreshToken: string;
  }
  interface ExistRefreshToken {
    userId: string;
    device: string;
    ip: string;
  }
}
