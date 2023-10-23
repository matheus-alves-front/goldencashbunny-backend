import { Injectable } from '@nestjs/common';
import { WorkspacePrismaService } from 'src/Prisma/utils/workspace.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class WorkspaceCrud {
  constructor(private prismaWorkspace: WorkspacePrismaService) {}

  async create(createAccountDto: Prisma.WorkspaceCreateInput) {
    
  }

  async findAll() {
    // return await this.prismaWorkspace.findAll();
  }

  async findById(id: string) {
   
  }

  async findByEmail(email: string) {
   
  }

  async update(id: string, updateAccountDto: Prisma.WorkspaceUpdateInput) {
    
  }

  async remove(id: string) {
   
  }
}
