const request = require('supertest');
const server = require('../api/server');
const authRouter = require('./auth-router');
const db = require('../database/dbConfig');

describe('auth-router.js', () => {
  it('should set the testing environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('POST /register', () => {
    beforeEach(async () => {
      await db('users').truncate();
    });

    it('should return a json object', async () => {
      const res = await request(server.use(authRouter))
        .post('/register')
        .send({
          username: 'dave',
          password: 'password'
        });
      expect(res.type).toBe('application/json');
    });

    it('should return 201 created', async () => {
      const res = await request(server.use(authRouter))
        .post('/register')
        .send({
          username: 'dave',
          password: 'password'
        });
      expect(res.status).toBe(201);
    });
  });
});
