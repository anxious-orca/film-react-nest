import { Test } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let filmsController: FilmsController;
  let filmsService: FilmsService;

  beforeEach(async () => {
    const moduleRef = await Test
            .createTestingModule({
              controllers: [FilmsController],
              providers: [FilmsService],
            })
            .overrideProvider(FilmsService)
            .useValue({
                getAllFilms: jest.fn().mockResolvedValue([]),
                getFilmById: jest.fn().mockResolvedValue({schedule: []}),
            })
            .compile();

    filmsController = moduleRef.get<FilmsController>(FilmsController);
    filmsService = moduleRef.get<FilmsService>(FilmsService); 
  });

  it('.getSchedule() должен вызвать метод getFilmById сервиса filmsService', async () => {
    const id = '1';

    await filmsController.getSchedule(id);

    expect(filmsService.getFilmById).toHaveBeenCalledWith(id);
  });

  it('.findAll() должен вызвать метод getAllFilms сервиса filmsService', async () => {
    await filmsController.findAll();

    expect(filmsService.getAllFilms).toHaveBeenCalled();
  });
});