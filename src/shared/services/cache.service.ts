import env from '@/shared/config/env/env';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  set = this.cache.set;
  get = this.cache.get;
  del = this.cache.del;

  setAccessToken = async (userId: string, accessToken: string) =>
    this.cache.set(`AccessToken:${userId}`, accessToken, env.ACCESS_TOKEN_EXPIRES_IN);

  getAccessToken = async (userId: string) => this.cache.get(`AccessToken:${userId}`);
  delAccessToken = async (userId: string) => this.cache.del(`AccessToken:${userId}`);
}
