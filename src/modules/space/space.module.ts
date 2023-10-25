import { Module } from '@nestjs/common';
import { SpaceService } from './spacecrud.service';
import { SpaceController } from './space.controller';

@Module({
  controllers: [SpaceController],
  providers: [SpaceService],
})
export class SpaceModule {}
