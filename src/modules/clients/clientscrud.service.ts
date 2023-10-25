import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ClientPrismaService } from 'src/Prisma/utils/client.service';
import { WorkspacePrismaService } from 'src/Prisma/utils/workspace.service';

interface GoldenHeadersType extends Headers {
  xgoldentoken: string,
  xgoldenworkspace: string
}

@Injectable()
export class ClientsService {
  constructor(
    private prismaClients: ClientPrismaService,
    private prismaWorkspace: WorkspacePrismaService,
  ) {}

  async create(
    createClientDto: Prisma.ClientCreateInput,
    headers: GoldenHeadersType
  ) {
    const { 
      xgoldentoken,
      xgoldenworkspace
    } = headers

    if (!xgoldentoken) {
      return {
        error: 'xgoldentoken missing'
      }
    }
    
    if (!xgoldenworkspace) {
      return {
        error: 'xgoldenworkspace missing'
      }
    }

    const workspaceExists = await this.prismaWorkspace.findById(xgoldenworkspace)

    if (!workspaceExists) {
      return {
        error: 'Workspace not Found'
      }
    }

    const createClient = await this.prismaClients.create(createClientDto, xgoldenworkspace)

    return createClient;
  }

    
  async findAll(
    headers: GoldenHeadersType
  ) {
    const { 
      xgoldentoken,
      xgoldenworkspace
    } = headers

    if (!xgoldentoken) {
      return {
        error: 'xgoldentoken missing'
      }
    }

    if (!xgoldenworkspace) {
      return {
        error: 'xgoldenworkspace missing'
      }
    }

    const getAllClientsByWorkspace = await this.prismaClients.findAllByWorkspaceId(xgoldenworkspace)

    return getAllClientsByWorkspace;
  }

  async findOne(
    id: string,
    headers: GoldenHeadersType
  ) {
    const { 
      xgoldentoken,
      xgoldenworkspace
    } = headers

    if (!xgoldentoken) {
      return {
        error: 'xgoldentoken missing'
      }
    }

    if (!xgoldenworkspace) {
      return {
        error: 'xgoldenworkspace missing'
      }
    }

    const getClientById = await this.prismaClients.findById(id)

    if (!getClientById) {
      return {
        error: 'Client Id not found'
      }
    }
    
    return getClientById;

  }

  async update(
    id: string, 
    updateClientDto: Prisma.ClientUpdateInput,
    headers: GoldenHeadersType
  ) {
    const { 
      xgoldentoken,
      xgoldenworkspace
    } = headers

    if (!xgoldentoken) {
      return {
        error: 'xgoldentoken missing'
      }
    }

    if (!xgoldenworkspace) {
      return {
        error: 'xgoldenworkspace missing'
      }
    }

    const getClientById = await this.prismaClients.findById(id)

    if (!getClientById) {
      return {
        error: 'Client Id not found'
      }
    }

    const updateClientById = await this.prismaClients.updateById(getClientById.id, updateClientDto)
    
    return updateClientById;
  }

  async remove(
    id: string,
    headers: GoldenHeadersType
  ) {
    const { 
      xgoldentoken,
      xgoldenworkspace
    } = headers

    if (!xgoldentoken) {
      return {
        error: 'xgoldentoken missing'
      }
    }

    if (!xgoldenworkspace) {
      return {
        error: 'xgoldenworkspace missing'
      }
    }

    const getClientById = await this.prismaClients.findById(id)

    if (!getClientById) {
      return {
        error: 'Client Id not found'
      }
    }

    await this.prismaClients.removeById(getClientById.id)
    
    return `${getClientById.fullname} Deleted`;
  }
}
