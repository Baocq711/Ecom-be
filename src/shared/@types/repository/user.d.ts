import { Provider } from '@prismaclient/index';

export {};

declare global {
  interface FindByEmailUser {
    email: string;
    provider: Provider;
  }
  interface CreateUserByGoogle {
    email: string;
    name: string;
    avatar: string;
    provider: Provider;
    refreshTokenProvider: string;
  }
  interface UpdateUserByGoogle {
    name: string;
    avatar: string;
    refreshTokenProvider: string;
  }
}
