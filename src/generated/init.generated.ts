import { Method, Module, Prisma } from '@prismaclient/index';

const methods: Method[] = ['POST', 'GET', 'GET', 'PATCH', 'DELETE'];
const actions: string[] = ['CREATE', 'FIND ALL', 'FIND ONE', 'UPDATE', 'DELETE'];
const crudModules: Module[] = ['USER', 'ROLE', 'PERMISSION', 'PRODUCT', 'VARIANT'];

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
          path: `/${module.toLowerCase()}${index >= 2 ? '/:id' : ''}`,
        }) as Prisma.PermissionCreateManyInput,
    ),
  ),
  ...authModule,
  ...fileModule,
];
