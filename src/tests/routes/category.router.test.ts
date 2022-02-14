import request from 'supertest';
import app from '../../app';
import db from '../../db/database';

beforeAll(async () => {
  await db.migrate.latest();
  await db.seed.run();
});

afterAll(() => {
  db.destroy();
});

describe('GET /api/v1/offers', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(app).get('/api/v1/categories');
    expect(response.statusCode).toBe(200);
  });

  test('should specify json as the content type in the http header', async () => {
    const response = await request(app).get('/api/v1/categories');
    console.log(response);
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
  });

  test('should category contain number of offers', async () => {});
});

// describe('GET /api/v1/offers?category_id=', () => {
//   test('should respond with 200 status code');
//   test('should specify json as the content type in the http header');
//   test('should return list of offers with counter');
// });
//
// describe('POST /api/v1/offers', () => {
//   test('should respond with 200 status code');
//   test('should specify json as the content type in the http header');
//   test('should return a 400 status code');
// });
