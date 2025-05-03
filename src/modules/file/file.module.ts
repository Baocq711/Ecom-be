import { DynamicModule, Module } from '@nestjs/common';
import { FileService } from './file.service';
import { S3ClientConfig } from '@aws-sdk/client-s3';
import { MulterService } from '@/modules/file/multer.service';
import { MulterModule } from '@nestjs/platform-express';
import { FILE_MODULE_OPTIONS } from '@/shared/@types/constants/file-module-options.constants';
import { FileController } from '@/modules/file/file.controller';

@Module({})
export class FileModule {
  static forRoot(options: S3ClientConfig): DynamicModule {
    return {
      imports: [
        MulterModule.registerAsync({
          useClass: MulterService,
        }),
      ],
      module: FileModule,
      providers: [{ provide: FILE_MODULE_OPTIONS, useValue: options }, FileService],
      controllers: [FileController],
      exports: [FileService],
    };
  }
}
