import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { SpaceTableService } from "../spacetablecrud.service";
import { Prisma } from "@prisma/client";
import { TableColumnService } from "./tablecolumncrud.service";
import { TableDataService } from "./tabledatacrud.service";

interface PostDataFromColumns {
  columnRef: string,
  data: Prisma.TableDataUpdateInput
}

@Controller('table/:spaceTableId')
export class TablesController {
  constructor(
    private readonly spacetableService: SpaceTableService,
    private readonly tableColumnService: TableColumnService,
    private readonly tableDataService: TableDataService
  ) {}

  @Post('column')
  async createTableColumn(
    @Param('spaceTableId') spaceTableRef: string,
    @Body() createTableColumn: Prisma.TableColumnCreateInput
  ) {
    return await this.tableColumnService.create(spaceTableRef, createTableColumn) 
  }

  @Get('column')
  async findAllColumnsBySpaceRef(
    @Param('spaceTableId') spaceTableRef: string,
  ) {
    return await this.tableColumnService.findAllBySpaceTableRef(spaceTableRef)
  }

  @Get('data')
  async findAllDataBySpaceRef(
    @Param('spaceTableId') spaceTableRef: string,
  ) {
    return await this.tableDataService.findAllBySpaceTableRef(spaceTableRef)
  }

  @Post('data')
  async createTableData(
    @Param('spaceTableId') spaceTableRef: string,
    @Body() createTableData: PostDataFromColumns
  ) {
    const {
      columnRef
    } = createTableData

    const findTableColumn = await this.tableColumnService.findByRef(columnRef) 

    const {
      columnName,
      columnType,
    } = findTableColumn

    // @ts-ignore
    const firstTableData: Prisma.TableDataCreateInput = {
      columnName,
      type: columnType,
      value: ""
    }

    return await this.tableDataService.create(spaceTableRef, firstTableData)
  }

  @Patch('data/:tableDataRef')
  async updateTableData(
    @Param('tableDataRef') tableDataRef: string,
    @Body() createTableData: PostDataFromColumns
  ) {
    const {
      columnRef,
      data
    } = createTableData

    const findTableColumn = await this.tableColumnService.findByRef(columnRef) 

    if (!findTableColumn) {
      return {
        error: 'Table Column Invalid'
      }
    }

    return await this.tableDataService.updateByTableDataRef(tableDataRef, data)
  }
}