import { CreateUserDto } from '@/shared/dto/user/create-user.dto';
import { I18nTranslations } from '@i18ntypes/i18n.generated';
import { IntersectionType } from '@nestjs/mapped-types';
import { IsNumber, Max, Min } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class SignUpDto extends IntersectionType(CreateUserDto) {
  @IsNumber({}, { message: i18nValidationMessage<I18nTranslations>('validation.isNumber') })
  @Min(100000, { message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @Max(999999, { message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  otp: number;
}
