import { Path } from '@/helper/folderPath';

export type FolderS3 = {
  user: {
    ':id': {
      avatar: string;
    };
  };
  product: {
    ':id': {
      image: string;
    };
  };
};

export type S3Path = Path<FolderS3>;

export const FOLDERS3: FolderS3 = {
  user: {
    ':id': {
      avatar: 'user/:id/avatar',
    },
  },
  product: {
    ':id': {
      image: 'product/:id/image',
    },
  },
} as const;
