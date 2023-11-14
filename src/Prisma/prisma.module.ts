import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AccountPrismaService } from './utils/account.service';
import { WorkspacePrismaService } from './utils/workspace.service';
import { ClientPrismaService } from './utils/client.service';
import { SpacePrismaService } from './utils/space.service';
import { SpaceTablePrismaService } from './utils/spacetable.service';
import { TableColumnPrismaService } from './utils/tablecolumn.service';
import { TableDataPrismaService } from './utils/tabledata.service';

@Module({
  providers: [
    PrismaService,
    AccountPrismaService,
    WorkspacePrismaService,
    ClientPrismaService,
    SpacePrismaService,
    SpaceTablePrismaService,
    TableColumnPrismaService,
    TableDataPrismaService
  ],
  exports: [
    AccountPrismaService,
    WorkspacePrismaService,
    ClientPrismaService,
    SpacePrismaService,
    SpaceTablePrismaService,
    TableColumnPrismaService,
    TableDataPrismaService
  ]
})
export class PrismaModule {}