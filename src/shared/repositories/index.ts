import { UserRepository } from '@/shared/repositories/user.repository';
import { RefreshTokenRepository } from '@/shared/repositories/refreshToken.repository';
import { OtpRepository } from '@/shared/repositories/otp.repository';

const repositories = [UserRepository, RefreshTokenRepository, OtpRepository] as const;
export default repositories;
