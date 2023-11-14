import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { TableColumnPrismaService } from "src/Prisma/utils/tablecolumn.service";
import { TableDataPrismaService } from "src/Prisma/utils/tabledata.service";

@Injectable()
export class TableDataService {
  constructor(
    private tableDataPrisma: TableDataPrismaService,
    private tableColumnPrisma: TableColumnPrismaService
  ) {}

  async create(
    spaceTableRef: string,
    tableDataDto: Prisma.TableDataCreateInput
  ) {
    const tableDataCreate = await this.tableDataPrisma.create(tableDataDto, spaceTableRef) 

    return tableDataCreate
  }

  async findAllBySpaceTableRef(
    spaceRef: string
  ) {
    if (!spaceRef) {
      return {
        error: 'Space Ref missing'
      }
    }

    return await this.tableDataPrisma.findAllBySpaceTableRef(spaceRef)
  }

  async updateByTableDataRef(
    tableDataRef: string,
    tableDataUpdated: Prisma.TableDataUpdateInput
  ) {
    if (!tableDataRef) {
      return {
        error: 'Table Data Ref missing'
      }
    }

    return await this.tableDataPrisma.updateByRef(tableDataRef, tableDataUpdated)
  }
}