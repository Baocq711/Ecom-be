import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Device = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const device = request.headers['user-agent'];
  return device;
});
