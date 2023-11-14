import { Test, TestingModule } from '@nestjs/testing';
import { SpaceController } from './spacetable.controller';
import { SpaceService } from './spacetablecrud.service';

describe('SpaceController', () => {
  let controller: SpaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpaceController],
      providers: [SpaceService],
    }).compile();

    controller = module.get<SpaceController>(SpaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
