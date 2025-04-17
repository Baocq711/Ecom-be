import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsNotEmpty({ message: 'validation.name.isNotEmpty' })
  name: string;

  @IsOptional()
  @IsNotEmpty({ message: 'validation.phone.isNotEmpty' })
  phone: string;

  @IsOptional()
  @IsNotEmpty({ message: 'validation.address.isNotEmpty' })
  address: string;

  @IsOptional()
  @IsNotEmpty({ message: 'validation.roleId.isNotEmpty' })
  roleId: string;
}
