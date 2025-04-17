import { CreateUserDto } from '@/shared/dto/user/create-user.dto';
import { isNestException } from '@/shared/errors';
import { ConflictException } from '@/shared/exception/conflict.exception';
import { InternalServerErrorException } from '@/shared/exception/internal-server-error.exception';
import { UserRepository } from '@/shared/repositories/user.repository';
import { HashService } from '@/shared/services/hash.service';
import { PrismaService } from '@/shared/services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    private readonly hashService: HashService,
    private readonly userRepository: UserRepository,
    private readonly prismaService: PrismaService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      if (await this.userRepository.exists({ email: createUserDto.email })) {
        throw new ConflictException('t.modules.user.emailExists');
      }

      createUserDto.password = await this.hashService.hash(createUserDto.password);
      return this.prismaService.user.create({ data: createUserDto, omit: { password: true } });
    } catch (error) {
      if (isNestException(error)) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  // findAll() {
  //   return `This action returns all user`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
