import { INestApplication } from '@nestjs/common';
import { WsAdapter } from '@nestjs/platform-ws';
import {
  Test,
  TestingModule,
} from '@nestjs/testing';
import supertest from 'supertest';

import { AppModule } from '../src/app.module';

describe('App', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useWebSocketAdapter(new WsAdapter(app));
    await app.init();
  });

  describe('Query getHello', () => {
    it('should return query result', async (done) => {
      await supertest(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          variables: {},
          query: `
            query {
              getHello
            }
          `,
        })
        .expect(200)
        .expect((response) => {
          expect(response.body.data.getHello).toBe('Hello World!');
        });

      done();
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
