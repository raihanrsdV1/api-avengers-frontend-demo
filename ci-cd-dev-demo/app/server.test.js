const request = require('supertest');
const app = require('./server');

describe('Demo App Tests', () => {
  test('GET / should return welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toContain('Hello World');
  });

  test('GET /health should return healthy status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('healthy');
  });

  test('GET /api/info should return app info', async () => {
    const response = await request(app).get('/api/info');
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('CI/CD Demo App');
    expect(response.body.version).toBe('1.0.0');
  });
});