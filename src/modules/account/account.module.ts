import { Module } from '@nestjs/common';
import { AccountCrud } from './accountcrud.service';
import { AccountController } from './account.controller';
import { PrismaModule } from 'src/Prisma/prisma.module';

@Module({
  imports: [
    PrismaModule
  ],
  controllers: [AccountController],
  providers: [AccountCrud],
  exports: [
    AccountCrud
  ]
})
export class AccountModule {}
