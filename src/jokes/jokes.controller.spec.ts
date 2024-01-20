import { Test, TestingModule } from '@nestjs/testing';
import { JokesController } from './jokes.controller';
import { JokesService } from './jokes.service';

describe('JokesController', () => {
  let controller: JokesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JokesController],
      providers: [JokesService],
    }).compile();

    controller = module.get<JokesController>(JokesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
