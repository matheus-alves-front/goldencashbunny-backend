import { Injectable } from '@nestjs/common';
import { WorkspacePrismaService } from 'src/Prisma/utils/workspace.service';
import { Prisma } from '@prisma/client';
import { AccountPrismaService } from 'src/Prisma/utils/account.service';

interface GoldenHeadersType extends Headers {
  xgoldentoken: string
}

@Injectable()
export class WorkspaceCrud {
  constructor(
    private prismaWorkspace: WorkspacePrismaService,
    private prismaAccount: AccountPrismaService
  ) {}

  async create(createWorkspaceDto: Prisma.WorkspaceCreateInput, headers: GoldenHeadersType) {
    const { xgoldentoken } = headers

    if (!xgoldentoken) {
      return {
        error: 'Token not found'
      }
    }

    const getAccount = await this.prismaAccount.findById(xgoldentoken)

    if (!getAccount) {
      return {
        error: 'Account by id not found'
      }
    }

    const createWorkspaceByAccountId = await this.prismaWorkspace.create(createWorkspaceDto, getAccount.id)

    return createWorkspaceByAccountId
  }

  async findAll(headers: GoldenHeadersType) {
    const { xgoldentoken } = headers

    if (!xgoldentoken) {
      return {
        error: 'Token not found'
      }
    }

    const getAccount = await this.prismaAccount.findById(xgoldentoken)

    if (!getAccount) {
      return {
        error: 'Account by id not found'
      }
    }

    const findWorkspaceByAccountId = await this.prismaWorkspace.findAllByAccountId(getAccount.id)
    
    return findWorkspaceByAccountId
  }

  async findById(id: string, headers: GoldenHeadersType) {
    const { xgoldentoken } = headers

    if (!xgoldentoken) {
      return {
        error: 'Token not found'
      }
    }

    const getAccount = await this.prismaAccount.findById(xgoldentoken)

    if (!getAccount) {
      return {
        error: 'Account by id not found'
      }
    }

    const findWorkspaceById = await this.prismaWorkspace.findById(id)

    if (!findWorkspaceById) {
      return {
        error: 'Workspace not found.'
      }
    }

    return findWorkspaceById
  }

  async update(id: string, updateWorkspaceDto: Prisma.WorkspaceUpdateInput, headers: GoldenHeadersType) {
    const { xgoldentoken } = headers

    if (!xgoldentoken) {
      return {
        error: 'Token not found'
      }
    }

    const getAccount = await this.prismaAccount.findById(xgoldentoken)

    if (!getAccount) {
      return {
        error: 'Account by id not found'
      }
    }

    const findWorkspaceById = await this.prismaWorkspace.findById(id)

    if (!findWorkspaceById) {
      return {
        error: 'Workspace not found.'
      }
    }

    const workspaceUpdate = await this.prismaWorkspace.updateById(id, updateWorkspaceDto)

    return workspaceUpdate
  }

  async remove(id: string, headers: GoldenHeadersType) {
    const { xgoldentoken } = headers

    if (!xgoldentoken) {
      return {
        error: 'Token not found'
      }
    }

    const getAccount = await this.prismaAccount.findById(xgoldentoken)

    if (!getAccount) {
      return {
        error: 'Account by id not found'
      }
    }

   const findWorkspaceById = await this.prismaWorkspace.findById(id)

    if (!findWorkspaceById) {
      return {
        error: 'Workspace not found.'
      }
    }

    return await this.prismaWorkspace.removeById(id)

  }
}
