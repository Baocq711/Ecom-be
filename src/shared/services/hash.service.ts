import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  hash = async (data: string): Promise<string> => bcrypt.hash(data, 10);

  compare = async (data: string, hashed: string): Promise<boolean> => bcrypt.compare(data, hashed);
}
