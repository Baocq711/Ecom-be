import { FILE_MODULE_OPTIONS } from '@/shared/@types/constants/file-module-options.constants';
import { FileSize } from '@/shared/@types/enum/file-size.enum';
import { FileType } from '@/shared/@types/enum/file-type.enum';
import { S3Path } from '@/shared/@types/file-folder';
import env from '@/shared/config/env/env';
import { BadRequestException } from '@/shared/exception/bad-request.exception';
import { InternalServerErrorException } from '@/shared/exception/internal-server-error.exception';
import { DeleteObjectCommand, S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { Inject, Injectable } from '@nestjs/common';
import { v7 } from 'uuid';

@Injectable()
export class FileService {
  private readonly s3Client: S3Client;
  constructor(@Inject(FILE_MODULE_OPTIONS) private readonly options: S3ClientConfig) {
    this.s3Client = new S3Client({
      region: options.region,
      credentials: options.credentials,
      endpoint: options.endpoint,
      forcePathStyle: !!options.endpoint,
    });
  }

  async upload({
    file,
    fileType,
    folder,
    id,
  }: {
    file: Express.Multer.File;
    folder: S3Path;
    fileType: FileType;
    id?: string;
  }) {
    if (this.isRequiresId(folder) && !id) throw new Error('modules.file.requiredId');
    const finalFolder = this.replaceId(folder, id);
    const { mimetype, buffer, originalname, size } = file;
    if (!this.isValidFileType(mimetype, fileType))
      throw new BadRequestException(
        'modules.file.invalidFileType',
        //  { extension: this.getExtension(mimetype) }
      );

    if (size > FileSize[fileType])
      throw new BadRequestException(
        'modules.file.fileSizeLimit',
        // , { size: FileSize[fileType] }
      );

    const finalName = `${v7()}_${Date.now()}_${originalname}`;
    try {
      const parallelUploads3 = new Upload({
        client: this.s3Client,
        params: {
          Bucket: env.CLOUD_BUCKET_NAME,
          Key: `${finalFolder}/${finalName}`,
          Body: buffer,
          ContentType: mimetype,
        },
        queueSize: 4,
        partSize: FileSize[fileType],
        leavePartsOnError: false,
      });

      return parallelUploads3.done().then((data) => data.Key);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async delete(key: string): Promise<void> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: env.CLOUD_BUCKET_NAME,
        Key: key,
      });

      await this.s3Client.send(command);
    } catch (error) {
      console.error(`Failed to delete file ${key}:`, error);
      throw new InternalServerErrorException();
    }
  }

  private isValidFileType(mimetype: string, fileType: FileType): boolean {
    return mimetype.startsWith(fileType);
  }

  private getExtension(mimetype: string): string {
    const parts = mimetype.split('/');
    return parts[parts.length - 1];
  }

  private isRequiresId(folder: S3Path): boolean {
    return folder.includes(':id');
  }

  private replaceId(folder: S3Path, id?: string) {
    return folder.replace('/:id', id ? `/${id}` : '');
  }
}
