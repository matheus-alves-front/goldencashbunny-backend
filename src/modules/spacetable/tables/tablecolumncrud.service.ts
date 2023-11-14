import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { SpaceTablePrismaService } from "src/Prisma/utils/spacetable.service";
import { TableColumnPrismaService } from "src/Prisma/utils/tablecolumn.service";
import { TableDataPrismaService } from "src/Prisma/utils/tabledata.service";

@Injectable()
export class TableColumnService {
  constructor(
    private readonly tableDataPrisma: TableDataPrismaService,
    private readonly tableColumnPrisma: TableColumnPrismaService,
    private readonly spaceTablePrisma: SpaceTablePrismaService
  ) {}

  async create(
    spaceTableRef: string,
    tableColumnDto: Prisma.TableColumnCreateInput
  ) {
    const spaceTable = await this.spaceTablePrisma.findByRef(spaceTableRef)

    if (!spaceTable) {
      return {
        error: 'Space Table Not Found'
      }
    }

    const tableColumnCreate = await this.tableColumnPrisma.create(tableColumnDto, spaceTableRef) 

    const {
      columnName,
      columnType,
    } = tableColumnCreate

    // @ts-ignore
    const firstTableData: Prisma.TableDataCreateInput = {
      columnName,
      type: columnType,
      value: ""
    }

    console.log(firstTableData)

    await this.tableDataPrisma.create(firstTableData, spaceTableRef)

    return tableColumnCreate
  }

  async findAllBySpaceTableRef(
    spaceTableRef: string
  ) {
    if (!spaceTableRef) {
      return {
        error: 'Space Table Not Found'
      }
    }

    return await this.tableColumnPrisma.findAllBySpaceTableRef(spaceTableRef)
  }

  async findByRef(columnRef: string) {
    return await this.tableColumnPrisma.findByRef(columnRef)
  }
}