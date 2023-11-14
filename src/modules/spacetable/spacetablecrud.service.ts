import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { SpacePrismaService } from 'src/Prisma/utils/space.service';
import { SpaceTablePrismaService } from 'src/Prisma/utils/spacetable.service';

interface GoldenHeadersType extends Headers {
  xgoldentoken: string,
  xgoldenworkspace: string
}

interface CreateSpaceBodyWithData {
  spaceRef: string,
  data: Prisma.SpaceTableCreateInput
}

interface UpdateSpaceBodyWithData {
  spaceRef: string,
  data: Prisma.SpaceTableUpdateInput
}

@Injectable()
export class SpaceTableService {
  constructor(
    private prismaSpace: SpacePrismaService,
    private prismaSpaceTable: SpaceTablePrismaService,
  ) {}

  async create(
    createSpaceTableDto: CreateSpaceBodyWithData,
    headers: GoldenHeadersType,
  ) {
    const { 
      spaceRef,
      data 
    } = createSpaceTableDto

    const spaceExists = await this.prismaSpace.findByRef(spaceRef)

    if (!spaceExists) {
      return {
        error: 'Space not Found'
      }
    }

    const createSpaceTable = await this.prismaSpaceTable.create(data, spaceExists.ref)

    return createSpaceTable;
  }

    
  async findAll(
    headers: GoldenHeadersType,
    spaceRef: string
  ) {
    const getAllSpacesTableFromSpaceRef = await this.prismaSpaceTable.findAllBySpaceTableByRef(spaceRef)

    return getAllSpacesTableFromSpaceRef;
  }

  async findOne(
    ref: string,
    headers: GoldenHeadersType
  ) {
    const getSpaceTableByRef = await this.prismaSpaceTable.findByRef(ref)

    if (!getSpaceTableByRef) {
      return {
        error: 'Space Table not found by ref'
      }
    }
    
    return getSpaceTableByRef;

  }

  async update(
    ref: string, 
    updateSpaceTableDto: UpdateSpaceBodyWithData,
    headers: GoldenHeadersType
  ) {
    const { 
      spaceRef,
      data 
    } = updateSpaceTableDto

    const getSpaceTableByRef = await this.prismaSpaceTable.findByRef(ref)

    if (!getSpaceTableByRef) {
      return {
        error: 'Space Table Id not found'
      }
    }

    const updateSpaceById = await this.prismaSpaceTable.updateByRef(getSpaceTableByRef.ref, data)
    
    return updateSpaceById;
  }

  async remove(
    ref: string,
    headers: GoldenHeadersType
  ) {
    const getSpaceTableByRef = await this.prismaSpaceTable.findByRef(ref)

    if (!getSpaceTableByRef) {
      return {
        error: 'Space Table Ref not found'
      }
    }

    await this.prismaSpaceTable.removeByRef(getSpaceTableByRef.ref)
    
    return `${getSpaceTableByRef.name} Deleted`;
  }
}
