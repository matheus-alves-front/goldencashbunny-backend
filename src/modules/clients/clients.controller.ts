import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { ClientsService } from './clientscrud.service';
import { Prisma } from '@prisma/client';

interface GoldenHeadersType extends Headers {
  xgoldentoken: string,
  xgoldenworkspace: string
}

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(
    @Body() createClientDto: Prisma.ClientCreateInput,
    @Headers() headers: GoldenHeadersType
  ) {
    return this.clientsService.create(createClientDto, headers);
  }

  @Get()
  findAll(
    @Headers() headers: GoldenHeadersType
  ) {
    return this.clientsService.findAll(headers);
  }

  @Get('/id/:id')
  findOne(
    @Param('id') id: string,
    @Headers() headers: GoldenHeadersType
  ) {
    return this.clientsService.findOne(id, headers);
  }

  @Patch('/id/:id')
  update(
    @Param('id') id: string, 
    @Body() updateClientDto: Prisma.ClientUpdateInput,
    @Headers() headers: GoldenHeadersType
  ) {
    return this.clientsService.update(id, updateClientDto, headers);
  }

  @Delete('/id/:id')
  remove(
    @Param('id') id: string,
    @Headers() headers: GoldenHeadersType
  ) {
    return this.clientsService.remove(id, headers);
  }
}
