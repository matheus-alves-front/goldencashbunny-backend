import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AccountPrismaService } from './utils/account.service';
import { WorkspacePrismaService } from './utils/workspace.service';
import { ClientPrismaService } from './utils/client.service';
import { SpacePrismaService } from './utils/space.service';

@Module({
  providers: [
    PrismaService,
    AccountPrismaService,
    WorkspacePrismaService,
    ClientPrismaService,
    SpacePrismaService
  ],
  exports: [
    AccountPrismaService,
    WorkspacePrismaService,
    ClientPrismaService,
    SpacePrismaService
  ]
})
export class PrismaModule {}