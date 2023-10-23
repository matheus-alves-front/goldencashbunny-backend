import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AccountPrismaService {
  constructor(
    private prisma: PrismaService
  ) {}

  async create(account: Prisma.AccountCreateInput) {
    const createAccount = await this.prisma.account.create({
      data: account
    })

    return createAccount;
  }

  async findAll() {
    const findAllAccounts = await this.prisma.account.findMany()
    
    return findAllAccounts;
  }

  async findByEmail(email: string) {
    const findAccountByEmail = await this.prisma.account.findFirst({
      where: {
        email
      }  
    })
    return findAccountByEmail;
  }

  async findById(id: string) {
    const findAccountById = await this.prisma.account.findFirst({
      where: {
        id
      }  
    })
    return findAccountById;
  }

  async updateById(id: string, updateAccountData: Prisma.AccountUpdateInput) {
    const accountUpdate = await this.prisma.account.update({
      where: {
        id
      }, 
      data: updateAccountData
    })

    return accountUpdate;
  }

  async removeById(id: string) {
    const findAccountById = await this.prisma.account.findFirst({
      where: {
        id
      }  
    })

    if (!findAccountById) return null 

    await this.prisma.account.delete({
      where: {
        id
      }
    })

    return `${findAccountById.username} deleted`;
  }
}