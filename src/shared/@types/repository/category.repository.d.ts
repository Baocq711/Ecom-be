export {};

declare global {
  interface CreateCategory {
    name: string;
    description?: string;
    parentId?: string;
    productIds?: string[];
  }

  interface UpdateCategory extends Partial<CreateCategory> {}
}
