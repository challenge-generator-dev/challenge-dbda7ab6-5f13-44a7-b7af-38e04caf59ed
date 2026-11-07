import { Router, Request, Response } from 'express';
import { OrderController } from '../controllers/OrderController';

export class OrderRoutes {
    private readonly router: Router;
    private readonly orderController: OrderController;

    constructor(orderController: OrderController) {
        if (!orderController) {
            throw new Error('OrderController es requerido para inicializar las rutas de órdenes');
        }
        this.router = Router();
        this.orderController = orderController;
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.post('/', this.wrapAsync(this.orderController.createOrder.bind(this.orderController)));
        this.router.get('/:id', this.wrapAsync(this.orderController.getOrder.bind(this.orderController)));
        this.router.put('/:id', this.wrapAsync(this.orderController.updateOrder.bind(this.orderController)));
        this.router.delete('/:id', this.wrapAsync(this.wrapAsync(this.orderController.deleteOrder.bind(this.orderController))));
    }

    private wrapAsync(fn: (req: Request, res: Response, next: any) => Promise<void>): (req: Request, res: Response, next: any) => void {
        return (req: Request, res: Response, next: any) => {
            Promise.resolve(fn(req, res, next)).catch(next);
        };
    }

    public getRouter(): Router {
        return this.router;
    }

    public getPath(): string {
        return '/orders';
    }

    public getRouterWithPath(): { path: string; router: Router } {
        return {
            path: this.getPath(),
            router: this.getRouter()
        };
    }
}