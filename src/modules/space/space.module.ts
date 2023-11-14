import { Module } from '@nestjs/common';
import { SpaceService } from './spacecrud.service';
import { SpaceController } from './space.controller';
import { PrismaModule } from 'src/Prisma/prisma.module';

@Module({
  imports: [
    PrismaModule
  ],
  controllers: [SpaceController],
  providers: [SpaceService],
})
export class SpaceModule {}
