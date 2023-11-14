import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { SpaceTableService } from './spacetablecrud.service';
import { Prisma } from '@prisma/client';

interface GoldenHeadersType extends Headers {
  xgoldentoken: string,
  xgoldenworkspace: string
}

interface SpaceRefBody {
  spaceRef: string,
}
interface CreateSpaceBodyWithData {
  spaceRef: string,
  data: Prisma.SpaceTableCreateInput
}

interface UpdateSpaceBodyWithData {
  spaceRef: string,
  data: Prisma.SpaceTableUpdateInput
}

@Controller('table')
export class SpaceTableController {
  constructor(private readonly spacetableService: SpaceTableService) {}

  @Post()
  create(
    @Body() createSpaceTableDto: CreateSpaceBodyWithData,
    @Headers() headers: GoldenHeadersType
  ) {
    return this.spacetableService.create(createSpaceTableDto, headers);
  }

  @Get()
  findAll(
    @Headers() headers: GoldenHeadersType,
    @Body() body: SpaceRefBody,
  ) {
    return this.spacetableService.findAll(headers, body.spaceRef);
  }

  @Get(':ref')
  findOne(
    @Param('ref') ref: string,
    @Headers() headers: GoldenHeadersType
  ) {
    return this.spacetableService.findOne(ref, headers);
  }

  @Patch(':ref')
  update(
    @Param('ref') ref: string, 
    @Body() updateSpaceTableDto: UpdateSpaceBodyWithData,
    @Headers() headers: GoldenHeadersType
  ) {
    return this.spacetableService.update(ref, updateSpaceTableDto, headers);
  }

  @Delete(':ref')
  remove(
    @Param('ref') ref: string,
    @Headers() headers: GoldenHeadersType
  ) {
    return this.spacetableService.remove(ref, headers);
  }
}
