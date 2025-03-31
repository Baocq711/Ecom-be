import { EnvSchemas } from './dto';
import { Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

const logger = new Logger('EnvValidater');

const env = plainToInstance(EnvSchemas, process.env);

const envValidated = validateSync(env);

if (envValidated.length > 0) {
  logger.error('Environment variables validation failed');
  process.exit(1);
}
export default env;
