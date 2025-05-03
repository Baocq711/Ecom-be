import { UserRepository } from '@/shared/repositories/user.repository';
import { RefreshTokenRepository } from '@/shared/repositories/refreshToken.repository';
import { OtpRepository } from '@/shared/repositories/otp.repository';
import { RoleRepository } from '@/shared/repositories/role.repository';
import { PermissionRepository } from '@/shared/repositories/permission.repository';
const repositories = [
  UserRepository,
  RefreshTokenRepository,
  OtpRepository,
  RoleRepository,
  PermissionRepository,
] as const;
export default repositories;
