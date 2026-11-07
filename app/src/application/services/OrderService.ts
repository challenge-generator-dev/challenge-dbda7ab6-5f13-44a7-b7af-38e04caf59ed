import { Order } from '../../domain/models/Order';
import { OrderDTO, ProductDTO } from '../../domain/models/Order';
import { OrderRepository } from '../../domain/repositories/OrderRepository';

export class OrderService {
    private readonly orderRepository: OrderRepository;

    constructor(orderRepository: OrderRepository) {
        this.orderRepository = orderRepository;
    }

    async createOrder(orderData: OrderDTO): Promise<OrderDTO> {
        const order = Order.fromDTO(orderData);
        const createdOrder = await this.orderRepository.create(order);
        return createdOrder.toDTO();
    }

    async getOrder(id: string): Promise<OrderDTO | null> {
        const order = await this.orderRepository.findById(id);
        return order ? order.toDTO() : null;
    }

    async updateOrder(id: string, orderData: Partial<OrderDTO>): Promise<OrderDTO | null> {
        const existingOrder = await this.orderRepository.findById(id);
        if (!existingOrder) {
            return null;
        }

        const updatedData: OrderDTO = {
            id: existingOrder.id,
            products: orderData.products || existingOrder.products,
            quantities: orderData.quantities || existingOrder.quantities,
            status: orderData.status || existingOrder.status
        };

        const updatedOrder = Order.fromDTO(updatedData);
        const result = await this.orderRepository.update(updatedOrder);
        return result.toDTO();
    }

    async deleteOrder(id: string): Promise<boolean> {
        const existingOrder = await this.orderRepository.findById(id);
        if (!existingOrder) {
            return false;
        }
        await this.orderRepository.delete(id);
        return true;
    }
}