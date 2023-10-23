import { Injectable } from '@nestjs/common';
import { AccountPrismaService } from 'src/Prisma/utils/account.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AccountCrud {
  constructor(private prismaAccount: AccountPrismaService) {}

  async create(createAccountDto: Prisma.AccountCreateInput) {
    const accountAlreadyExistsValidation = await this.prismaAccount.findByEmail(createAccountDto.email)

    if (accountAlreadyExistsValidation) {
      return {
        error: `This Email already on use: ${accountAlreadyExistsValidation.email}, username ${accountAlreadyExistsValidation.username}` 
      };
    }

    return await this.prismaAccount.create(createAccountDto)
  }

  async findAll() {
    return await this.prismaAccount.findAll();
  }

  async findById(id: string) {
    const getAccountById = await this.prismaAccount.findById(id)

    if (!getAccountById) {
      return {
        error: `Account Don't found by id` 
      };
    }

    return getAccountById;
  }

  async findByEmail(email: string) {
    const getAccountByEmail = await this.prismaAccount.findByEmail(email);

    if (!getAccountByEmail) {
      return {
        error: `Account Don't found by email` 
      };
    }

    return getAccountByEmail;
  }

  async update(id: string, updateAccountDto: Prisma.AccountUpdateInput) {
    const accountExists = await this.prismaAccount.findById(id)

    if (!accountExists) {
      return {
        error: `Account Don't found by id` 
      };
    }

    const updateAccount = await this.prismaAccount.updateById(id, updateAccountDto)

    if (!updateAccount) {
      return {
        error: `Invalid Update` 
      };
    }

    return updateAccount;
  }

  async remove(id: string) {
    const accountExists = await this.prismaAccount.findById(id)

    if (!accountExists) {
      return {
        error: `Account Don't found by id` 
      };
    }

    return await this.prismaAccount.removeById(id);
  }
}
