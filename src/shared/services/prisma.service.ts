import { I18nTranslations } from '@i18ntypes/i18n.generated';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prismaclient/client';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly i18nService: I18nService<I18nTranslations>) {
    super();
  }

  logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await this.$connect();
    } catch {
      this.logger.error(this.i18nService.t('prisma.error.cannotConnect'));
      process.exit(1);
    }
  }
}
