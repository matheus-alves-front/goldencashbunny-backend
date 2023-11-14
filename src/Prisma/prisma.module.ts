import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AccountPrismaService } from './utils/account.service';
import { WorkspacePrismaService } from './utils/workspace.service';
import { ClientPrismaService } from './utils/client.service';
import { SpacePrismaService } from './utils/space.service';
import { SpaceTablePrismaService } from './utils/spacetable.service';

@Module({
  providers: [
    PrismaService,
    AccountPrismaService,
    WorkspacePrismaService,
    ClientPrismaService,
    SpacePrismaService,
    SpaceTablePrismaService
  ],
  exports: [
    AccountPrismaService,
    WorkspacePrismaService,
    ClientPrismaService,
    SpacePrismaService,
    SpaceTablePrismaService
  ]
})
export class PrismaModule {}