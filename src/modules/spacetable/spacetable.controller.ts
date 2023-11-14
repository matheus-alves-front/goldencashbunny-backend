import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { SpaceTableService } from './spacetablecrud.service';
import { Prisma } from '@prisma/client';

interface GoldenHeadersType extends Headers {
  xgoldentoken: string,
  xgoldenworkspace: string
}

@Controller('space/:spaceRef/table')
export class SpaceTableController {
  constructor(private readonly spacetableService: SpaceTableService) {}

  @Post()
  create(
    @Param('spaceRef') spaceRef: string,
    @Body() createSpaceDto: Prisma.SpaceTableCreateInput,
    @Headers() headers: GoldenHeadersType
  ) {
    console.log(spaceRef)
    return this.spacetableService.create(createSpaceDto, headers, spaceRef);
  }

  @Get()
  findAll(
    @Headers() headers: GoldenHeadersType,
    @Param('spaceRef') spaceRef: string,
  ) {
    return this.spacetableService.findAll(headers, spaceRef);
  }

  @Get('ref/:ref')
  findOne(
    @Param('ref') ref: string,
    @Headers() headers: GoldenHeadersType
  ) {
    return this.spacetableService.findOne(ref, headers);
  }

  @Patch('ref/:ref')
  update(
    @Param('ref') ref: string, 
    @Body() updateSpaceDto: Prisma.SpaceTableUpdateInput,
    @Headers() headers: GoldenHeadersType
  ) {
    return this.spacetableService.update(ref, updateSpaceDto, headers);
  }

  @Delete('ref/:ref')
  remove(
    @Param('ref') ref: string,
    @Headers() headers: GoldenHeadersType
  ) {
    return this.spacetableService.remove(ref, headers);
  }
}
