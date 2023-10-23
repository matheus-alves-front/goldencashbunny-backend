import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AccountPrismaService } from './utils/account.service';
import { WorkspacePrismaService } from './utils/workspace.service';
import { ClientPrismaService } from './utils/client.service';

@Module({
  providers: [
    PrismaService,
    AccountPrismaService,
    WorkspacePrismaService,
    ClientPrismaService
  ],
  exports: [
    AccountPrismaService,
    WorkspacePrismaService,
    ClientPrismaService
  ]
})
export class PrismaModule {}