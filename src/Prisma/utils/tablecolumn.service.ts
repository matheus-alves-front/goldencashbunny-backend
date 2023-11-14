import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TableColumnPrismaService {
  constructor(
    private prisma: PrismaService
  ) {}

  async create(columnCreateDto: Prisma.TableColumnCreateInput, spaceTableRef: string) {
    console.log("columnCreateDto prisma", columnCreateDto, spaceTableRef)
    const createColumn = await this.prisma.tableColumn.create({
      data: {
        ...columnCreateDto,
        spaceTable: {
          connect: {
            ref: spaceTableRef
          }
        }
      }
    })

    return createColumn
  }

  async findAllBySpaceTableRef(spaceTableRef: string) {
    const findAllColumnsBySpaceTableRef = await this.prisma.tableColumn.findMany({
      where: {
        spaceTableRef
      }
    })
    
    return findAllColumnsBySpaceTableRef;
  }

  async findByRef(ref: string) {
    const findSpaceById = await this.prisma.tableColumn.findFirst({
      where: {
        ref
      }  
    })

    return findSpaceById;
  }

  async findUnique(spaceTableRef: string, ref: string) {
    const findColumnById = await this.prisma.tableColumn.findUnique({
      where: {
        spaceTableRef_ref: {
          spaceTableRef,
          ref
        }
      }  
    })

    return findColumnById;
  }


  async updateByRef(ref: string, updateSpaceData: Prisma.TableColumnUpdateInput) {
    const columnUpdate = await this.prisma.tableColumn.update({
      where: {
        ref
      }, 
      data: updateSpaceData
    })

    return columnUpdate;
  }

  async removeByRef(ref: string) {
    const findColumnByRef = await this.prisma.tableColumn.findFirst({
      where: {
        ref
      }  
    })

    if (!findColumnByRef) return null 

    await this.prisma.tableColumn.delete({
      where: {
        ref
      }
    })

    return `${findColumnByRef.columnName} deleted`;
  }
}