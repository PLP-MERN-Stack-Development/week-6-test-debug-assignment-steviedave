const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server.js');
const Bug = require('../models/bugModel.js');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  await Bug.deleteMany(); // clean db after each test
});

describe('Bug API', () => {
  it('should create a new bug', async () => {
    const res = await request(app)
      .post('/api/bugs')
      .send({
        title: 'Test Bug',
        description: 'This is a test bug',
        priority: 'high',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Bug');
    expect(res.body.status).toBe('open');
  });

  it('should fetch all bugs', async () => {
    await Bug.create({ title: 'Bug1', description: 'bug desc', priority: 'low' });

    const res = await request(app).get('/api/bugs');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });
});
