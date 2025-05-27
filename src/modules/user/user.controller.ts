import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '@/shared/dto/user/create-user.dto';
import { Public } from '@/shared/decorator/public.decorator';
import { PrismaService } from '@/shared/services/prisma.service';
import { CacheService } from '@/shared/services/cache.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
    private readonly cacheService: CacheService,
  ) {}

  @Post()
  @Public()
  async create(@Query('parentId') parentId: string) {
    const a = 0;
    // function convertBigIntToString(obj) {
    //   return JSON.parse(JSON.stringify(obj, (key, value) => (typeof value === 'bigint' ? value.toString() : value)));
    // }
    // @Body() createUserDto: CreateUserDto
    console.log(
      await this.prismaService.$queryRaw`
      WITH RECURSIVE sub AS (
        SELECT id
        FROM "Category"
        WHERE id = ${parentId}::uuid
        UNION ALL
        SELECT c.id
        FROM "Category" c
        JOIN sub s ON c."parentId" = s.id
      )
      SELECT
        p.*,
        COUNT(*) OVER()::numeric AS total      -- đếm tổng
      FROM "Product" p
      WHERE p."categoryId" IN (SELECT id FROM sub)
      ORDER BY p.id
      LIMIT  ${1}
      OFFSET ${0}
    `,
    );
    // ${
    // keyword &&
    // this.prismaService.$queryRaw`AND (
    // p."name"        ILIKE ${'%' + keyword + '%'}
    // OR p."sku"      ILIKE ${'%' + keyword + '%'}
    // OR p."tags"::text ILIKE ${'%' + keyword + '%'}
    // )`
    // }
  }
  // return this.userService.create(createUserDto);

  // @Get()
  // @Public()
  // async findAll(@User() user: UserJwtPayload) {
  // return this.userService.findAll(query);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
