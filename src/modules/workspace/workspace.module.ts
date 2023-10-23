import { Module } from '@nestjs/common';
import { WorkspaceCrud } from './workspacecrud.service';
import { WorkspaceController } from './workspace.controller';
import { PrismaModule } from 'src/Prisma/prisma.module';

@Module({
  imports: [
    PrismaModule
  ],
  controllers: [WorkspaceController],
  providers: [WorkspaceCrud],
})
export class WorkspaceModule {}
