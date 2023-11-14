import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SpaceTablePrismaService {
  constructor(
    private prisma: PrismaService
  ) {}

  async create(spaceCreateDto: Prisma.SpaceTableCreateInput, spaceRef: string) {
    const createSpace = await this.prisma.spaceTable.create({
      data: {
        ...spaceCreateDto,
        space: {
          connect: {
            ref: spaceRef
          }
        }
      }
    })

    return createSpace
  }

  async findAllBySpaceTableByRef(spaceRef: string) {
    const findAllSpacesByWorkspace = await this.prisma.spaceTable.findMany({
      where: {
        spaceRef
      }
    })
    
    return findAllSpacesByWorkspace;
  }

  async findByRef(ref: string) {
    const findSpaceById = await this.prisma.spaceTable.findFirst({
      where: {
        ref
      }  
    })

    return findSpaceById;
  }

  async findUnique(spaceRef: string, ref: string) {
    const findSpaceById = await this.prisma.spaceTable.findUnique({
      where: {
        spaceRef_ref: {
          spaceRef,
          ref
        }
      }  
    })

    return findSpaceById;
  }


  async updateByRef(ref: string, updateSpaceData: Prisma.SpaceTableUpdateInput) {
    const spaceUpdate = await this.prisma.spaceTable.update({
      where: {
        ref
      }, 
      data: updateSpaceData
    })

    return spaceUpdate;
  }

  async removeByRef(ref: string) {
    const findSpaceByRef = await this.prisma.spaceTable.findFirst({
      where: {
        ref
      }  
    })

    if (!findSpaceByRef) return null 

    await this.prisma.spaceTable.delete({
      where: {
        ref
      }
    })

    return `${findSpaceByRef.name} deleted`;
  }
}