import request from 'supertest';
import { Server } from '../../src/main';
import { OrderDTO, ProductDTO } from '../../src/domain/models/Order';

describe('OrderController Integration Tests', () => {
  let server: Server;
  let testOrderId: string;

  beforeAll(async () => {
    server = new Server();
    server.start();
    await new Promise(resolve => setTimeout(resolve, 1000));
  });

  afterAll(async () => {
    if (testOrderId) {
      await request(server.app)
        .delete(`/orders/${testOrderId}`);
    }
  });

  describe('POST /orders', () => {
    it('should create a new order', async () => {
      const orderData = {
        id: '',
        products: [
          { id: 'prod-001', name: 'Laptop', price: 999.99 },
          { id: 'prod-002', name: 'Mouse', price: 29.99 }
        ],
        quantities: [1, 2],
        status: 'pending'
      };

      const response = await request(server.app)
        .post('/orders')
        .send(orderData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.products).toHaveLength(2);
      expect(response.body.status).toBe('pending');
      testOrderId = response.body.id;
    });

    it('should return 400 for invalid order data', async () => {
      const invalidOrder = {
        id: '',
        products: [],
        quantities: [],
        status: 'invalid-status'
      };

      await request(server.app)
        .post('/orders')
        .send(invalidOrder)
        .expect(400);
    });
  });

  describe('GET /orders/:id', () => {
    it('should return an order by id', async () => {
      const response = await request(server.app)
        .get(`/orders/${testOrderId}`)
        .expect(200);

      expect(response.body.id).toBe(testOrderId);
      expect(response.body.products).toBeDefined();
    });

    it('should return 404 for non-existent order', async () => {
      await request(server.app)
        .get('/orders/non-existent-id')
        .expect(404);
    });
  });

  describe('PUT /orders/:id', () => {
    it('should update an existing order', async () => {
      const updateData = {
        id: testOrderId,
        products: [
          { id: 'prod-001', name: 'Laptop', price: 999.99 },
          { id: 'prod-003', name: 'Keyboard', price: 79.99 }
        ],
        quantities: [1, 1],
        status: 'confirmed'
      };

      const response = await request(server.app)
        .put(`/orders/${testOrderId}`)
        .send(updateData)
        .expect(200);

      expect(response.body.status).toBe('confirmed');
      expect(response.body.products).toHaveLength(2);
    });

    it('should return 404 when updating non-existent order', async () => {
      const updateData = {
        id: 'non-existent',
        products: [],
        quantities: [],
        status: 'pending'
      };

      await request(server.app)
        .put('/orders/non-existent')
        .send(updateData)
        .expect(404);
    });
  });

  describe('DELETE /orders/:id', () => {
    it('should delete an order', async () => {
      await request(server.app)
        .delete(`/orders/${testOrderId}`)
        .expect(204);

      await request(server.app)
        .get(`/orders/${testOrderId}`)
        .expect(404);

      testOrderId = '';
    });

    it('should return 404 when deleting non-existent order', async () => {
      await request(server.app)
        .delete('/orders/non-existent-id')
        .expect(404);
    });
  });

  describe('Error handling', () => {
    it('should handle internal server errors gracefully', async () => {
      const response = await request(server.app)
        .get('/orders/test-error-handling')
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });
});