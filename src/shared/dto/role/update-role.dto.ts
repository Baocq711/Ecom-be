import { CreateRoleDto } from '@/shared/dto/role/create-role.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
