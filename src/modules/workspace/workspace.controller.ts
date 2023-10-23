import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { WorkspaceCrud } from './workspacecrud.service';
import { Prisma } from '@prisma/client';

interface HeadersType extends Headers {
  xgoldentoken: string
}

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceCrud: WorkspaceCrud) {}

  @Post()
  create(@Body() createAccountDto: Prisma.WorkspaceCreateInput) {
    return this.workspaceCrud.create(createAccountDto);
  }

  @Get()
  findAll(@Headers() headers: HeadersType) {
    console.log("headers", headers.xgoldentoken)
    // console.log(headers.accountId)
    return headers
    // return this.workspaceCrud.findAll();
  }

  @Get('/id/:id')
  findById(@Param('id') id: string) {
    return this.workspaceCrud.findById(id);
  }

  @Patch('/id/:id')
  update(@Param('id') id: string, @Body() updateAccountDto: Prisma.WorkspaceUpdateInput) {
    return this.workspaceCrud.update(id, updateAccountDto);
  }

  @Delete('/id/:id')
  remove(@Param('id') id: string) {
    return this.workspaceCrud.remove(id);
  }
}
