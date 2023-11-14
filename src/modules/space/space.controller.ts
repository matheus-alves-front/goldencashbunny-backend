import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { SpaceService } from './spacecrud.service';
import { Prisma } from '@prisma/client';

interface GoldenHeadersType extends Headers {
  xgoldentoken: string,
  xgoldenworkspace: string
}
@Controller('space')
export class SpaceController {
  constructor(private readonly spaceService: SpaceService) {}

  @Post()
  create(
    @Body() createSpaceDto: Prisma.SpaceCreateInput,
    @Headers() headers: GoldenHeadersType
  ) {
    return this.spaceService.create(createSpaceDto, headers);
  }

  @Get()
  findAll(
    @Headers() headers: GoldenHeadersType
  ) {
    return this.spaceService.findAll(headers);
  }

  @Get(':ref')
  findOne(
    @Param('ref') ref: string,
    @Headers() headers: GoldenHeadersType
  ) {
    return this.spaceService.findOne(ref, headers);
  }

  @Patch(':ref')
  update(
    @Param('ref') ref: string, 
    @Body() updateSpaceDto: Prisma.SpaceUpdateInput,
    @Headers() headers: GoldenHeadersType
  ) {
    return this.spaceService.update(ref, updateSpaceDto, headers);
  }

  @Delete(':ref')
  remove(
    @Param('ref') ref: string,
    @Headers() headers: GoldenHeadersType
  ) {
    return this.spaceService.remove(ref, headers);
  }
}
