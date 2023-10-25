import { Module } from '@nestjs/common';
import { ClientsService } from './clientscrud.service';
import { ClientsController } from './clients.controller';
import { PrismaModule } from 'src/Prisma/prisma.module';

@Module({
  imports: [
    PrismaModule
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
