import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/summary', () => {
    it ('Get all summaries /', () => {
      return request(app.getHttpServer())
        .get('/summary')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveLength(7);
        });
    })

    it('Get summary by id /:id', () => {
      return request(app.getHttpServer())
        .get('/summary/1')
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(1);
        });
    })

    it('Create summary /', () => {
      return request(app.getHttpServer())
        .post('/summary')
        .send({
          category: 'test category',
          summary: 'test summary',
          original_text: 'test original text',
          view_count: 0
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.category).toBe('test category');
          expect(res.body.summary).toBe('test summary');
          expect(res.body.original_text).toBe('test original text');
          expect(res.body.view_count).toBe(0);
        });
    })
  })
});
