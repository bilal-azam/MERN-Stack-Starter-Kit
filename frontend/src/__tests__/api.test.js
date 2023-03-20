// backend/__tests__/api.test.js
const request = require('supertest');
const app = require('../index'); // ensure index.js exports app

test('GET /cache', async () => {
  const response = await request(app).get('/cache');
  expect(response.status).toBe(200);
});
