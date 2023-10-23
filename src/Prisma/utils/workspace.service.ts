import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class WorkspacePrismaService {
  constructor(
    private prisma: PrismaService
  ) {}

  async create(workspace: Prisma.WorkspaceCreateInput, accountId: string) {
    const createWorkspaceToAccount = await this.prisma.workspace.create({
      data: {
        ...workspace,
        account: {
          connect: {
            id: accountId
          }
        }
      },      
    })

    return createWorkspaceToAccount;
  }

  async findAllByAccountId(accountId: string) {
    const findAllWorkspacesByAccount = await this.prisma.workspace.findMany({
      where: {
        accountId
      }
    })
    
    return findAllWorkspacesByAccount;
  }

  async findById(id: string) {
    const findWorkspaceById = await this.prisma.workspace.findFirst({
      where: {
        id
      }  
    })

    return findWorkspaceById;
  }

  async updateById(id: string, updateWorkspaceData: Prisma.WorkspaceUpdateInput) {
    const findWorkspaceById = await this.prisma.workspace.findFirst({
      where: {
        id
      }  
    })

    const updateData = {
      ...findWorkspaceById,
      updateWorkspaceData
    }

    const workspaceUpdate = await this.prisma.workspace.update({
      where: {
        id
      }, 
      data: updateData
    })

    return workspaceUpdate;
  }

  async removeById(id: string) {
    const findWorkspaceById = await this.prisma.workspace.findFirst({
      where: {
        id
      }  
    })

    if (!findWorkspaceById) return null 

    await this.prisma.workspace.delete({
      where: {
        id
      }
    })

    return `${findWorkspaceById.companyname} deleted`;
  }
}