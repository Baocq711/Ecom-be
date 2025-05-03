import { Controller, Delete, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileType } from '@/shared/@types/enum/file-type.enum';
import { Public } from '@/shared/decorator/public.decorator';
import { FOLDERS3, S3Path } from '@/shared/@types/file-folder';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @Public()
  @UseInterceptors(FileInterceptor('abc'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.upload({
      file,
      folder: FOLDERS3.user[':id'].avatar as S3Path,
      fileType: FileType.image,
      id: '123',
    });
  }

  @Delete()
  @Public()
  deleteFile() {
    return this.fileService.delete(
      'user/123/avatar/019675c2-c8c7-729f-803c-1273ddcee34f_1745732421831_Ảnh chụp màn hình 2023-05-25 114631.png',
    );
  }
}
