import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TableDataPrismaService {
  constructor(
    private prisma: PrismaService
  ) {}

  async create(columnCreateDto: Prisma.TableDataCreateInput, spaceTableRef: string) {
    const createData = await this.prisma.tableData.create({
      data: {
        ...columnCreateDto,
        spaceTable: {
          connect: {
            ref: spaceTableRef
          }
        }
      }
    })

    return createData
  }

  async findAllBySpaceTableRef(spaceTableRef: string) {
    const findAllColumnsBySpaceTableRef = await this.prisma.tableData.findMany({
      where: {
        spaceTableRef
      }
    })
    
    return findAllColumnsBySpaceTableRef;
  }

  async findByRef(ref: string) {
    const findSpaceById = await this.prisma.tableData.findFirst({
      where: {
        ref
      }  
    })

    return findSpaceById;
  }

  async findUnique(spaceTableRef: string, ref: string) {
    const findTableDataById = await this.prisma.tableData.findUnique({
      where: {
        spaceTableRef_ref: {
          spaceTableRef,
          ref
        }
      }  
    })

    return findTableDataById;
  }


  async updateByRef(ref: string, updateSpaceData: Prisma.TableColumnUpdateInput) {
    const dataUpdate = await this.prisma.tableData.update({
      where: {
        ref
      }, 
      data: updateSpaceData
    })

    return dataUpdate;
  }

  async removeByRef(ref: string) {
    const findDataByRef = await this.prisma.tableData.findFirst({
      where: {
        ref
      }  
    })

    if (!findDataByRef) return null 

    await this.prisma.tableData.delete({
      where: {
        ref
      }
    })

    return `${findDataByRef.columnName} deleted`;
  }
}