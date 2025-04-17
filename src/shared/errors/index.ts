import { Prisma } from '@prismaclient/index';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  HttpVersionNotSupportedException,
  UnsupportedMediaTypeException,
  UnprocessableEntityException,
  ServiceUnavailableException,
  PayloadTooLargeException,
  RequestTimeoutException,
  PreconditionFailedException,
  NotAcceptableException,
  MethodNotAllowedException,
  UnauthorizedException,
  NotImplementedException,
  BadGatewayException,
  GatewayTimeoutException,
  ConflictException,
  GoneException,
  MisdirectedException,
  ImATeapotException,
  HttpException,
} from '@nestjs/common';

export function isUniqueConstraintPrismaError(error: any): error is Prisma.PrismaClientKnownRequestError {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002';
}

export function isNotFoundPrismaError(error: any): error is Prisma.PrismaClientKnownRequestError {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025';
}

export function isForeignKeyConstraintPrismaError(error: any): error is Prisma.PrismaClientKnownRequestError {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003';
}

export function isNestException(error: any): boolean {
  return error instanceof HttpException;
  // const exceptions = [
  //   BadRequestException,
  //   NotFoundException,
  //   ForbiddenException,
  //   HttpVersionNotSupportedException,
  //   UnsupportedMediaTypeException,
  //   UnprocessableEntityException,
  //   ServiceUnavailableException,
  //   PayloadTooLargeException,
  //   RequestTimeoutException,
  //   PreconditionFailedException,
  //   NotAcceptableException,
  //   MethodNotAllowedException,
  //   UnauthorizedException,
  //   NotImplementedException,
  //   BadGatewayException,
  //   GatewayTimeoutException,
  //   ConflictException,
  //   GoneException,
  //   MisdirectedException,
  //   ImATeapotException,
  //   HttpException,
  // ];
  // return exceptions.some((exception) => error instanceof exception);
}
