const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

describe('bonus-lab-crud-app-back-end routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it('creates a new mouse via POST', async() => {
    const res = await request(app)
      .post('/api/v1/mice')
      .send({
        name: 'Squeakers',
        furColor: 'brown',
        tailLength: 4
      });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Squeakers',
      furColor: 'brown',
      tailLength: 4
    });
  });
});
