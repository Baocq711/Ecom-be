// src/common/pipes/validate-id.pipe.ts
import { BadRequestException } from '@/shared/exception/bad-request.exception';
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { isUUID } from 'class-validator';

@Injectable()
export class ValidateIdPipe implements PipeTransform<string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    // Chỉ xử lý với các tham số đường dẫn có tên 'id'
    if (metadata.type === 'param' && metadata.data === 'id') {
      const isUuid = isUUID(value, '7');
      if (!isUuid) {
        throw new BadRequestException('validation.isUUID');
      }
    }
    return value;
  }
}
