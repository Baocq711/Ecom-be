import { Method, Module, Prisma } from '@prismaclient/index';

const methods: Method[] = ['POST', 'GET', 'GET', 'PATCH', 'DELETE'];
const actions: string[] = ['CREATE', 'FIND ALL', 'FIND ONE', 'UPDATE', 'DELETE'];
const crudModules: Module[] = ['USER', 'ROLE', 'PERMISSION', 'PRODUCT', 'CATEGORY', 'CART_ITEM', 'ORDER', 'PAYMENT'];

const variantModule: Prisma.PermissionCreateManyInput[] = [
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
const cartModule: Prisma.PermissionCreateManyInput[] = [
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
const authModule: Prisma.PermissionCreateManyInput[] = [
  {
    name: 'SIGN OUT',
    method: 'POST',
    module: 'AUTH',
    path: '/auth/sign-out',
  },
];
const fileModule: Prisma.PermissionCreateManyInput[] = [
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

export const initPermissions: Prisma.PermissionCreateManyInput[] = [
  ...crudModules.flatMap((module) =>
    methods.map(
      (method, index) =>
        ({
          name: `${actions[index]} ${module}`,
          method,
          module,
          path: `/${module.toLowerCase().replace('_', '-')}${index >= 2 ? '/:id' : ''}`,
        }) as Prisma.PermissionCreateManyInput,
    ),
  ),
  ...authModule,
  ...fileModule,
  ...cartModule,
  ...variantModule,
];
