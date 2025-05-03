import { Provider } from '@prismaclient/index';

export {};

declare global {
  interface SignInUser {
    email: string;
    password?: string;
    provider: Provider;
  }

  interface ClientInfo {
    ip: string;
    device: string;
  }
}
