import { Provider } from '@prismaclient/index';

export {};

declare global {
  interface GoogleState {
    userAgent: string;
    ip: string;
    redirectTo?: string;
    [key: string]: any;
  }
  interface GoogleUser {
    email: string;
    name: string;
    avatar: string;
    provider: Provider;
  }
}
