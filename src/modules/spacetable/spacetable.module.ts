import { Module } from '@nestjs/common';
import { SpaceTableService } from './spacetablecrud.service';
import { SpaceTableController } from './spacetable.controller';
import { PrismaModule } from 'src/Prisma/prisma.module';

@Module({
  imports: [
    PrismaModule
  ],
  controllers: [SpaceTableController],
  providers: [SpaceTableService],
})
export class SpaceTableModule {}
