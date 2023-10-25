import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './modules/account/account.module';
import { PrismaModule } from './Prisma/prisma.module';
import { WorkspaceModule } from './modules/workspace/workspace.module';
import { SpaceModule } from './modules/space/space.module';

@Module({
  imports: [
    PrismaModule,
    AccountModule,
    WorkspaceModule,
    SpaceModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
