const db = require('../database/dbConfig');
const Auth = require('./authModel');

describe('auth model', () => {
  it('should set the testing environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('find()', () => {
    beforeEach(async () => {
      await db('users').truncate();
    });

    it('should insert 3 users and return all users', async () => {
      await Auth.add({ username: 'dave_1', password: 'password_1' });
      await Auth.add({ username: 'dave_2', password: 'password_2' });
      await Auth.add({ username: 'dave_3', password: 'password_3' });

      const users = await Auth.find();
      expect(users).toHaveLength(3);
    });
  });

  describe('findBy()', () => {
    beforeEach(async () => {
      await db('users').truncate();
    });

    it(`should insert 3 users and return the user with username 'dave_2'`, async () => {
      await Auth.add({ username: 'dave_1', password: 'password_1' });
      await Auth.add({ username: 'dave_2', password: 'password_2' });
      await Auth.add({ username: 'dave_3', password: 'password_3' });

      const [user] = await Auth.findBy({ username: 'dave_2' });
      expect(user.username).toEqual('dave_2');
    });
  });

  describe('add()', () => {
    beforeEach(async () => {
      await db('users').truncate();
    });

    it('should insert a user', async () => {
      await Auth.add({ username: 'dave', password: 'password' });

      const users = await db('users');
      expect(users).toHaveLength(1);
    });
  });

  describe('findById()', () => {
    beforeEach(async () => {
      await db('users').truncate();
    });

    it(`should insert 3 users and return the user with id of '2'`, async () => {
      await Auth.add({ username: 'dave_1', password: 'password_1' });
      await Auth.add({ username: 'dave_2', password: 'password_2' });
      await Auth.add({ username: 'dave_3', password: 'password_3' });

      const user = await Auth.findById(2);
      expect(user.id).toEqual(2);
    });
  });
});
