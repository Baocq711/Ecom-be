import { Method } from '@prismaclient/index';

export {};

declare global {
  interface FindOneByPathAndMethodPermission {
    path: string;
    method: Method;
  }
}
