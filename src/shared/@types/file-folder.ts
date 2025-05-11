import { Path } from '@/helper/folderPath';

type FolderS3Example = {
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

type S3PathExample = Path<FolderS3Example>;

export type FolderS3 = {
  user: {
    ':id': {
      avatar: S3PathExample;
    };
  };
  product: {
    ':id': {
      image: S3PathExample;
    };
  };
};

export type S3Path = Path<FolderS3>;

export const FOLDER_S3: FolderS3 = {
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
};
