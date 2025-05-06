import { Transform, Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import ms from 'ms';

export class EnvSchemas {
  @IsString()
  DATABASE_URL: string;

  @IsString()
  HOST: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'Giá trị phải là số hợp lệ' })
  PORT: number;

  @IsString()
  ACCESS_TOKEN_SECRET: string;

  @Transform(({ value }: { value: ms.StringValue | number | string | undefined }) => {
    if (typeof value === 'number' && !isNaN(value)) return value;
    if (typeof value === 'string') return Number(ms(value as ms.StringValue));
    return undefined;
  })
  @IsNumber({}, { message: 'Giá trị phải là số hợp lệ' })
  ACCESS_TOKEN_EXPIRES_IN: number;

  @IsString()
  REFRESH_TOKEN_SECRET: string;

  @Transform(({ value }: { value: ms.StringValue | number | string | undefined }) => {
    if (typeof value === 'number' && !isNaN(value)) return value;
    if (typeof value === 'string') return Number(ms(value as ms.StringValue));
    return undefined;
  })
  @IsNumber({}, { message: 'Giá trị phải là số hợp lệ' })
  REFRESH_TOKEN_EXPIRES_IN: number;

  @Transform(({ value }: { value: ms.StringValue | number | string | undefined }) => {
    if (typeof value === 'number' && !isNaN(value)) return value;
    if (typeof value === 'string') return Number(ms(value as ms.StringValue));
    return undefined;
  })
  @IsNumber({}, { message: 'Giá trị phải là số hợp lệ' })
  OTP_EXPIRES_IN: number;

  @IsString()
  EMAIL_HOST: string;

  @IsString()
  EMAIL_USER: string;

  @IsString()
  EMAIL_PASS: string;

  @IsString()
  APP_NAME: string;

  @IsString()
  GOOGLE_CLIENT_ID: string;

  @IsString()
  GOOGLE_CLIENT_SECRET: string;

  @IsString()
  FRONTEND_URL: string;

  @IsString()
  CLOUD_BUCKET_NAME: string;

  @IsString()
  CLOUD_ACCESS_KEY: string;

  @IsString()
  CLOUD_SECRET_KEY: string;

  @IsString()
  CLOUD_REGION: string;

  @IsString()
  CLOUD_ENDPOINT: string;

  @IsString()
  INIT_ADMIN_USERNAME: string;

  @IsString()
  INIT_USER_USERNAME: string;

  @IsString()
  INIT_PASSWORD: string;
}
