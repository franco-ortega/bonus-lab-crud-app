const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Mouse = require('../lib/models/Mouse');

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

  it('returns all mice via GET', async() => {
    await Promise.all([
      {
        name: 'Pippers',
        furColor: 'black',
        tailLength: 3
      },
      {
        name: 'Cassia',
        furColor: 'tan',
        tailLength: 2
      },
      {
        name: 'Tuvo',
        furColor: 'spotted',
        tailLength: 1
      }
    ].map(mouse => Mouse.insert(mouse)));

    const res = await request(app)
      .get('/api/v1/mice');

    const results = [
      {
        id: expect.any(String),
        name: 'Pippers',
        furColor: 'black',
        tailLength: 3
      },
      {
        id: expect.any(String),
        name: 'Cassia',
        furColor: 'tan',
        tailLength: 2
      },
      {
        id: expect.any(String),
        name: 'Tuvo',
        furColor: 'spotted',
        tailLength: 1
      }
    ];

    expect(res.body.length).toEqual(results.length);
    results.forEach(result => expect(res.body).toContainEqual(result));
  });
});
