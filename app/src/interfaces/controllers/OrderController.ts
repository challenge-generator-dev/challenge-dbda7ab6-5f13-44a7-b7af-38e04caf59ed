import { Request, Response, NextFunction } from 'express';
import { OrderService } from '../../application/services/OrderService';
import { OrderDTO, ProductDTO } from '../../domain/models/Order';
import { Order } from '../../domain/models/Order';

export class OrderController {
    private readonly orderService: OrderService;

    constructor(orderService: OrderService) {
        if (!orderService) {
            throw new Error('OrderService es requerido para OrderController');
        }
        this.orderService = orderService;
    }

    public async createOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { products, quantities, status } = req.body as OrderDTO;

            if (!products || !Array.isArray(products) || products.length === 0) {
                res.status(400).json({ error: 'La orden debe contener al menos un producto' });
                return;
            }

            if (!quantities || !Array.isArray(quantities) || quantities.length !== products.length) {
                res.status(400).json({ error: 'Las cantidades deben corresponder a cada producto' });
                return;
            }

            for (const qty of quantities) {
                if (typeof qty !== 'number' || qty <= 0 || !Number.isInteger(qty)) {
                    res.status(400).json({ error: 'Cada cantidad debe ser un número entero positivo' });
                    return;
                }
            }

            if (!status || typeof status !== 'string') {
                res.status(400).json({ error: 'El estado de la orden es requerido' });
                return;
            }

            const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
            if (!validStatuses.includes(status.toLowerCase())) {
                res.status(400).json({ error: `Estado inválido. Estados permitidos: ${validStatuses.join(', ')}` });
                return;
            }

            for (const product of products) {
                if (!product.id || !product.name) {
                    res.status(400).json({ error: 'Cada producto debe tener id y name' });
                    return;
                }
            }

            const orderDTO: OrderDTO = {
                id: '',
                products,
                quantities,
                status: status.toLowerCase()
            };

            const createdOrder: Order = await this.orderService.createOrder(orderDTO);
            const responseDTO: OrderDTO = createdOrder.toDTO();

            res.status(201).json(responseDTO);
        } catch (error) {
            next(error);
        }
    }

    public async getOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            if (!id || typeof id !== 'string' || id.trim().length === 0) {
                res.status(400).json({ error: 'El ID de la orden es requerido' });
                return;
            }

            const order: Order | null = await this.orderService.getOrderById(id);

            if (!order) {
                res.status(404).json({ error: `Orden con ID ${id} no encontrada` });
                return;
            }

            res.status(200).json(order.toDTO());
        } catch (error) {
            next(error);
        }
    }

    public async updateOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            if (!id || typeof id !== 'string' || id.trim().length === 0) {
                res.status(400).json({ error: 'El ID de la orden es requerido' });
                return;
            }

            const existingOrder: Order | null = await this.orderService.getOrderById(id);
            if (!existingOrder) {
                res.status(404).json({ error: `Orden con ID ${id} no encontrada` });
                return;
            }

            const updateData = req.body as Partial<OrderDTO>;

            if (updateData.status !== undefined) {
                const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
                if (!validStatuses.includes(updateData.status.toLowerCase())) {
                    res.status(400).json({ error: `Estado inválido. Estados permitidos: ${validStatuses.join(', ')}` });
                    return;
                }
                updateData.status = updateData.status.toLowerCase();
            }

            if (updateData.quantities !== undefined) {
                if (!Array.isArray(updateData.quantities)) {
                    res.status(400).json({ error: 'Las cantidades deben ser un arreglo' });
                    return;
                }
                for (const qty of updateData.quantities) {
                    if (typeof qty !== 'number' || qty <= 0 || !Number.isInteger(qty)) {
                        res.status(400).json({ error: 'Cada cantidad debe ser un número entero positivo' });
                        return;
                    }
                }
            }

            if (updateData.products !== undefined) {
                if (!Array.isArray(updateData.products) || updateData.products.length === 0) {
                    res.status(400).json({ error: 'La orden debe contener al menos un producto' });
                    return;
                }
                for (const product of updateData.products) {
                    if (!product.id || !product.name) {
                        res.status(400).json({ error: 'Cada producto debe tener id y name' });
                        return;
                    }
                }
            }

            const updatedOrder: Order = await this.orderService.updateOrder(id, updateData);
            res.status(200).json(updatedOrder.toDTO());
        } catch (error) {
            next(error);
        }
    }

    public async deleteOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            if (!id || typeof id !== 'string' || id.trim().length === 0) {
                res.status(400).json({ error: 'El ID de la orden es requerido' });
                return;
            }

            const existingOrder: Order | null = await this.orderService.getOrderById(id);
            if (!existingOrder) {
                res.status(404).json({ error: `Orden con ID ${id} no encontrada` });
                return;
            }

            await this.orderService.deleteOrder(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}