import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { OrderRoutes } from './interfaces/routes/orderRoutes';
import { OrderController } from './interfaces/controllers/OrderController';
import { OrderService } from './application/services/OrderService';
import { DynamoDBOrderRepository } from './infrastructure/dynamodb/DynamoDBOrderRepository';
import { errorHandler, notFoundHandler } from './interfaces/middlewares/errorHandler';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const orderRepository = new DynamoDBOrderRepository();
const orderService = new OrderService(orderRepository);
const orderController = new OrderController(orderService);
const orderRoutes = new OrderRoutes(orderController);

app.use(orderRoutes.getPath(), orderRoutes.getRouter());

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
  console.log(`Rutas de órdenes disponibles en http://localhost:${port}/api/orders`);
});

export default app;