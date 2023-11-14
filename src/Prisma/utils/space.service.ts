import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SpacePrismaService {
  constructor(
    private prisma: PrismaService
  ) {}

  async create(spaceCreateDto: Prisma.SpaceCreateInput, workspaceId: string) {
    const createSpace = await this.prisma.space.create({
      data: {
        ...spaceCreateDto,
        workspace: {
          connect: {
            id: workspaceId
          }
        }
      }
    })

    return createSpace
  }

  async findAllByWorkspaceId(workspaceId: string) {
    const findAllSpacesByWorkspace = await this.prisma.space.findMany({
      where: {
        workspaceId
      }
    })
    
    return findAllSpacesByWorkspace;
  }

  async findByRef(ref: string) {
    const findSpaceById = await this.prisma.space.findFirst({
      where: {
        ref
      }  
    })

    return findSpaceById;
  }

  async findById(workspaceId: string, ref: string) {
    const findSpaceById = await this.prisma.space.findUnique({
      where: {
        workspaceId_ref: {
          workspaceId,
          ref
        }
      }  
    })

    return findSpaceById;
  }


  async updateByRef(ref: string, updateSpaceData: Prisma.SpaceUpdateInput) {
    const spaceUpdate = await this.prisma.space.update({
      where: {
        ref
      }, 
      data: updateSpaceData
    })

    return spaceUpdate;
  }

  async removeByRef(ref: string) {
    const findSpaceByRef = await this.prisma.space.findFirst({
      where: {
        ref
      }  
    })

    if (!findSpaceByRef) return null 

    await this.prisma.space.delete({
      where: {
        ref
      }
    })

    return `${findSpaceByRef.name} deleted`;
  }
}