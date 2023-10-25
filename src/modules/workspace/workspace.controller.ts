import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { WorkspaceCrud } from './workspacecrud.service';
import { Prisma } from '@prisma/client';

interface GoldenHeadersType extends Headers {
  xgoldentoken: string
}

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceCrud: WorkspaceCrud) {}

  @Post()
  create(
    @Body() createAccountDto: Prisma.WorkspaceCreateInput,
    @Headers() headers: GoldenHeadersType
  ) {
    return this.workspaceCrud.create(createAccountDto, headers);
  }

  @Get()
  findAll(@Headers() headers: GoldenHeadersType) {
    return this.workspaceCrud.findAll(headers);
  }

  @Get('/id/:id')
  findById(
    @Param('id') id: string,
    @Headers() headers: GoldenHeadersType
  ) {
    return this.workspaceCrud.findById(id, headers);
  }

  @Patch('/id/:id')
  update(
    @Headers() headers: GoldenHeadersType,
    @Param('id') id: string, 
    @Body() updateAccountDto: Prisma.WorkspaceUpdateInput
  ) {
    return this.workspaceCrud.update(id, updateAccountDto, headers);
  }

  @Delete('/id/:id')
  remove(
    @Headers() headers: GoldenHeadersType,
    @Param('id') id: string,
  ) {
    return this.workspaceCrud.remove(id, headers);
  }
}
