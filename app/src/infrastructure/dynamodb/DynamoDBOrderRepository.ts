import { Order, OrderDTO } from '../../domain/models/Order';
import { OrderRepository } from '../../domain/repositories/OrderRepository';
import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dotenv from 'dotenv';

/**
 * Implementación concreta del repositorio de órdenes usando DynamoDB.
 * Maneja la persistencia de órdenes en una tabla DynamoDB.
 */
export class DynamoDBOrderRepository implements OrderRepository {
    private readonly dynamoDB: DynamoDB.DocumentClient;
    private readonly tableName: string;

    constructor() {
        dotenv.config();
        this.dynamoDB = new DynamoDB.DocumentClient({
            region: process.env.AWS_REGION || 'us-east-1',
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        });
        this.tableName = process.env.DYNAMODB_TABLE_NAME || 'Orders';
    }

    /**
     * Crea una nueva orden en DynamoDB.
     * @param order Orden a crear.
     * @returns Promise con la orden creada.
     */
    async create(order: Order): Promise<Order> {
        const params: DocumentClient.PutItemInput = {
            TableName: this.tableName,
            Item: {
                orderId: order.id,
                products: order.products,
                quantities: order.quantities,
                status: order.status
            },
            ConditionExpression: 'attribute_not_exists(orderId)'
        };

        try {
            await this.dynamoDB.put(params).promise();
            return order;
        } catch (error) {
            if (error.code === 'ConditionalCheckFailedException') {
                throw new Error('Order with the same ID already exists');
            }
            throw new Error(`Failed to create order: ${error.message}`);
        }
    }

    /**
     * Obtiene una orden por su ID.
     * @param id ID de la orden.
     * @returns Promise con la orden encontrada o null si no existe.
     */
    async findById(id: string): Promise<Order | null> {
        const params: DocumentClient.GetItemInput = {
            TableName: this.tableName,
            Key: {
                orderId: id
            }
        };

        try {
            const result = await this.dynamoDB.get(params).promise();
            if (!result.Item) {
                return null;
            }

            const orderDTO: OrderDTO = {
                id: result.Item.orderId,
                products: result.Item.products,
                quantities: result.Item.quantities,
                status: result.Item.status
            };

            return Order.fromDTO(orderDTO);
        } catch (error) {
            throw new Error(`Failed to find order: ${error.message}`);
        }
    }

    /**
     * Actualiza una orden existente en DynamoDB.
     * @param order Orden con los datos actualizados.
     * @returns Promise con la orden actualizada.
     */
    async update(order: Order): Promise<Order> {
        const params: DocumentClient.UpdateItemInput = {
            TableName: this.tableName,
            Key: {
                orderId: order.id
            },
            UpdateExpression: 'SET products = :products, quantities = :quantities, #st = :status',
            ExpressionAttributeNames: {
                '#st': 'status'
            },
            ExpressionAttributeValues: {
                ':products': order.products,
                ':quantities': order.quantities,
                ':status': order.status
            },
            ReturnValues: 'ALL_NEW'
        };

        try {
            const result = await this.dynamoDB.update(params).promise();
            if (!result.Attributes) {
                throw new Error('Order not found');
            }

            const orderDTO: OrderDTO = {
                id: result.Attributes.orderId,
                products: result.Attributes.products,
                quantities: result.Attributes.quantities,
                status: result.Attributes.status
            };

            return Order.fromDTO(orderDTO);
        } catch (error) {
            throw new Error(`Failed to update order: ${error.message}`);
        }
    }

    /**
     * Elimina una orden por su ID.
     * @param id ID de la orden a eliminar.
     * @returns Promise que se resuelve cuando la orden es eliminada.
     */
    async delete(id: string): Promise<void> {
        const params: DocumentClient.DeleteItemInput = {
            TableName: this.tableName,
            Key: {
                orderId: id
            },
            ConditionExpression: 'attribute_exists(orderId)'
        };

        try {
            await this.dynamoDB.delete(params).promise();
        } catch (error) {
            if (error.code === 'ConditionalCheckFailedException') {
                throw new Error('Order not found');
            }
            throw new Error(`Failed to delete order: ${error.message}`);
        }
    }
}