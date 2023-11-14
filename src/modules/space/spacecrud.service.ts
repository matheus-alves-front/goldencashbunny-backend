import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { SpacePrismaService } from 'src/Prisma/utils/space.service';
import { WorkspacePrismaService } from 'src/Prisma/utils/workspace.service';

interface GoldenHeadersType extends Headers {
  xgoldentoken: string,
  xgoldenworkspace: string
}
@Injectable()
export class SpaceService {
  constructor(
    private prismaSpace: SpacePrismaService,
    private prismaWorkspace: WorkspacePrismaService,
  ) {}

  async create(
    createSpaceDto: Prisma.SpaceCreateInput,
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

    const createSpace = await this.prismaSpace.create(createSpaceDto, xgoldenworkspace)

    return createSpace;
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

    const getAllSpacesByWorkspace = await this.prismaSpace.findAllByWorkspaceId(xgoldenworkspace)

    return getAllSpacesByWorkspace;
  }

  async findOne(
    ref: string,
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

    const getSpaceByRef = await this.prismaSpace.findByRef(ref)

    if (!getSpaceByRef) {
      return {
        error: 'Space not found by ref'
      }
    }
    
    return getSpaceByRef;

  }

  async update(
    ref: string, 
    updateSpaceDto: Prisma.ClientUpdateInput,
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

    const getSpaceByRef = await this.prismaSpace.findByRef(ref)

    if (!getSpaceByRef) {
      return {
        error: 'Client Id not found'
      }
    }

    const updateSpaceById = await this.prismaSpace.updateByRef(getSpaceByRef.ref, updateSpaceDto)
    
    return updateSpaceById;
  }

  async remove(
    ref: string,
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

    const getSpaceByRef = await this.prismaSpace.findByRef(ref)

    if (!getSpaceByRef) {
      return {
        error: 'Space Ref not found'
      }
    }

    await this.prismaSpace.removeByRef(getSpaceByRef.ref)
    
    return `${getSpaceByRef.name} Deleted`;
  }
}
