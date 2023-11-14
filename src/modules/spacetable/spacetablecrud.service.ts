import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { SpacePrismaService } from 'src/Prisma/utils/space.service';
import { SpaceTablePrismaService } from 'src/Prisma/utils/spacetable.service';

interface GoldenHeadersType extends Headers {
  xgoldentoken: string,
  xgoldenworkspace: string
}

@Injectable()
export class SpaceTableService {
  constructor(
    private prismaSpace: SpacePrismaService,
    private prismaSpaceTable: SpaceTablePrismaService,
  ) {}

  async create(
    createSpaceTableDto: Prisma.SpaceTableCreateInput,
    headers: GoldenHeadersType,
    spaceRef: string
  ) {
    const spaceExists = await this.prismaSpace.findByRef(spaceRef)

    if (!spaceExists) {
      return {
        error: 'Space not Found'
      }
    }

    const createSpace = await this.prismaSpaceTable.create(createSpaceTableDto, spaceExists.ref)

    return createSpace;
  }

    
  async findAll(
    headers: GoldenHeadersType,
    spaceRef: string
  ) {
    const getAllSpacesByWorkspace = await this.prismaSpaceTable.findAllBySpaceTableByRef(spaceRef)

    return getAllSpacesByWorkspace;
  }

  async findOne(
    ref: string,
    headers: GoldenHeadersType
  ) {
    const getSpaceByRef = await this.prismaSpaceTable.findByRef(ref)

    if (!getSpaceByRef) {
      return {
        error: 'Space not found by ref'
      }
    }
    
    return getSpaceByRef;

  }

  async update(
    ref: string, 
    updateSpaceTableDto: Prisma.SpaceTableUpdateInput,
    headers: GoldenHeadersType
  ) {


    const getSpaceByRef = await this.prismaSpaceTable.findByRef(ref)

    if (!getSpaceByRef) {
      return {
        error: 'Client Id not found'
      }
    }

    const updateSpaceById = await this.prismaSpaceTable.updateByRef(getSpaceByRef.ref, updateSpaceTableDto)
    
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

    const getSpaceByRef = await this.prismaSpaceTable.findByRef(ref)

    if (!getSpaceByRef) {
      return {
        error: 'Space Table Ref not found'
      }
    }

    await this.prismaSpaceTable.removeByRef(getSpaceByRef.ref)
    
    return `${getSpaceByRef.name} Deleted`;
  }
}
