import { Module } from '@nestjs/common';
import { SpaceTableService } from './spacetablecrud.service';
import { SpaceTableController } from './spacetable.controller';
import { PrismaModule } from 'src/Prisma/prisma.module';
import { TablesController } from './tables/tables.controller';
import { TableDataService } from './tables/tabledatacrud.service';
import { TableColumnService } from './tables/tablecolumncrud.service';

@Module({
  imports: [
    PrismaModule
  ],
  controllers: [
    SpaceTableController,
    TablesController
  ],
  providers: [
    SpaceTableService,
    TableDataService,
    TableColumnService
  ],
})
export class SpaceTableModule {}
