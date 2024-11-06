import { Test, TestingModule } from '@nestjs/testing';
import { SummaryService } from './summary.service';
import { RequestCreateSummary } from './dto/requestCreateSummary.dto';
import { Repository } from 'typeorm';
import { Summary } from './summary.entity';
import { get } from 'http';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('SummaryService', () => {
  let service: SummaryService;
  let repository: Repository<Summary>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SummaryService,
        {
          provide: getRepositoryToken(Summary),
          useClass: Repository,
        }
      ],
    }).compile();

    service = module.get<SummaryService>(SummaryService);
    repository = module.get<Repository<Summary>>(getRepositoryToken(Summary));

    jest.spyOn(repository, 'find').mockResolvedValue([
      {id : 1, category : 'test category', summary : 'test summary', original_text : 'test original text', view_count : 0, created_at : new Date()},
    ] as Summary[]);
  
    jest.spyOn(repository, 'findOne').mockResolvedValue(
      {id : 1, category : 'test category', summary : 'test summary', original_text : 'test original text', view_count : 0, created_at : new Date()} as Summary
    );
    jest.spyOn(repository, 'save').mockResolvedValue(
      {id : 1, category : 'test category', summary : 'test summary', original_text : 'test original text', view_count : 0, created_at : new Date()} as Summary
    );

    jest.spyOn(repository, 'increment').mockResolvedValue(undefined);
  });

  

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllSummary', () => {
    it('should return an array of summaries', async () => {
      const result = await service.findAll();
      expect(result).toHaveLength(1);
      expect(result).toBeInstanceOf(Array);
    });
  })

  describe('findOneSummary', () => {  
    it('should return a summary', async () => {
      const result = await service.findOne(1);
      expect(result.id).toBe(1);
      expect(result.view_count).toBe(0);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  })

  describe('createSummary', () => {
    it('should create a summary', async () => {

      const requestSummary = new RequestCreateSummary();
      requestSummary.category = 'test category';
      requestSummary.summary = 'test summary';
      requestSummary.original_text = 'test original text';

      const result = await service.create(requestSummary);

      expect(result.category).toBe('test category');
      expect(result.summary).toBe('test summary');
      expect(repository.save).toHaveBeenCalledWith(requestSummary);
    });
  })  
});
