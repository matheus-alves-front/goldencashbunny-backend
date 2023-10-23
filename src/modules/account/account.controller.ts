import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccountCrud } from './accountcrud.service';
import { Prisma } from '@prisma/client';

@Controller('account')
export class AccountController {
  constructor(private readonly accountCrud: AccountCrud) {}

  @Post()
  create(@Body() createAccountDto: Prisma.AccountCreateInput) {
    return this.accountCrud.create(createAccountDto);
  }

  @Get()
  findAll() {
    return this.accountCrud.findAll();
  }

  @Get('/id/:id')
  findById(@Param('id') id: string) {
    return this.accountCrud.findById(id);
  }

  @Get('/email')
  findByEmail(@Body() body: { email: string }) {
    return this.accountCrud.findByEmail(body.email);
  }

  @Patch('/id/:id')
  update(@Param('id') id: string, @Body() updateAccountDto: Prisma.AccountUpdateInput) {
    return this.accountCrud.update(id, updateAccountDto);
  }

  @Delete('/id/:id')
  remove(@Param('id') id: string) {
    return this.accountCrud.remove(id);
  }
}
