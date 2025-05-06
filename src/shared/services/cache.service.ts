import env from '@/shared/config/env/env';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  set = this.cache.set;
  get = this.cache.get;
  del = this.cache.del;
  clear = this.cache.clear;

  setAccessToken = async (userId: string, accessToken: string) =>
    this.cache.set(`AccessToken:${userId}`, accessToken, env.ACCESS_TOKEN_EXPIRES_IN);
  getAccessToken = async (userId: string) => this.cache.get(`AccessToken:${userId}`);
  delAccessToken = async (userId: string) => this.cache.del(`AccessToken:${userId}`);

  setUserRoleId = async (roleId: string) => this.cache.set('RoleUser', roleId, 0);
  getUserRoleId = async (): Promise<string | null> => this.cache.get('RoleUser');

  setPermissions = async (roleId: string, permissions: FindOneByPathAndMethodPermission[]) =>
    this.cache.set(`Permissions:${roleId}`, permissions, 0);
  getPermissions = async (roleId: string): Promise<FindOneByPathAndMethodPermission[] | null> =>
    this.cache.get(`Permissions:${roleId}`);
}
