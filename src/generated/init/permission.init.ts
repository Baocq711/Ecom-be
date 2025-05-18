import { Method, Module, Prisma } from '@prismaclient/index';

export const methods: Method[] = ['POST', 'GET', 'GET', 'PATCH', 'DELETE'];
export const actions: string[] = ['CREATE', 'FIND ALL', 'FIND ONE', 'UPDATE', 'DELETE'];
export const crudModules: Module[] = [
  'USER',
  'ROLE',
  'PERMISSION',
  'PRODUCT',
  'CATEGORY',
  'CART_ITEM',
  'ORDER',
  'PAYMENT',
];

export const variantModule: Prisma.PermissionCreateManyInput[] = [
  {
    name: 'CREATE VARIANT',
    method: 'POST',
    module: 'VARIANT',
    path: '/variant/:id',
  },
  {
    name: 'FIND ALL VARIANT',
    method: 'GET',
    module: 'VARIANT',
    path: '/variant',
  },
  {
    name: 'FIND ONE VARIANT',
    method: 'GET',
    module: 'VARIANT',
    path: '/variant/:id',
  },
  {
    name: 'UPDATE VARIANT',
    method: 'PATCH',
    module: 'VARIANT',
    path: '/variant/:id',
  },
  {
    name: 'DELETE VARIANT',
    method: 'DELETE',
    module: 'VARIANT',
    path: '/variant/:id',
  },
];
export const cartModule: Prisma.PermissionCreateManyInput[] = [
  {
    name: 'CREATE CART',
    method: 'POST',
    module: 'CART',
    path: '/cart',
  },
  {
    name: 'FIND ALL CART',
    method: 'GET',
    module: 'CART',
    path: '/cart',
  },
  {
    name: 'DELETE CART',
    method: 'DELETE',
    module: 'CART',
    path: '/cart',
  },
];
export const authModule: Prisma.PermissionCreateManyInput[] = [
  {
    name: 'SIGN OUT',
    method: 'POST',
    module: 'AUTH',
    path: '/auth/sign-out',
  },
  {
    name: 'GET PROFILE',
    method: 'GET',
    module: 'AUTH',
    path: '/auth/profile',
  },
];
export const fileModule: Prisma.PermissionCreateManyInput[] = [
  {
    name: 'UPLOAD FILE',
    method: 'POST',
    module: 'FILE',
    path: '/file/upload',
  },
  {
    name: 'DELETE FILE',
    method: 'DELETE',
    module: 'FILE',
    path: '/file',
  },
];
