import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ClientPrismaService {
  constructor(
    private prisma: PrismaService
  ) {}

  async create(client: Prisma.ClientCreateInput, workspaceId: string) {
    const createClientToWorkspace = await this.prisma.client.create({
      data: {
        ...client,
        workspace: {
          connect: {
            id: workspaceId
          }
        }
      },      
    })

    return createClientToWorkspace;
  }

  async findAllByWorkspaceId(workspaceId: string) {
    const findAllClientsByWorkspace = await this.prisma.client.findMany({
      where: {
        workspaceId
      }
    })
    
    return findAllClientsByWorkspace;
  }

  async findById(id: string) {
    const findClientById = await this.prisma.workspace.findFirst({
      where: {
        id
      }  
    })

    return findClientById;
  }

  async updateById(id: string, updateClientData: Prisma.ClientUpdateInput) {
    const findClientById = await this.prisma.client.findFirst({
      where: {
        id
      }  
    })

    const updateData = {
      ...findClientById,
      updateClientData
    }

    const clientUpdate = await this.prisma.client.update({
      where: {
        id
      }, 
      data: updateData
    })

    return clientUpdate;
  }

  async removeById(id: string) {
    const findClientById = await this.prisma.client.findFirst({
      where: {
        id
      }  
    })

    if (!findClientById) return null 

    await this.prisma.client.delete({
      where: {
        id
      }
    })

    return `${findClientById.fullname} deleted`;
  }
}