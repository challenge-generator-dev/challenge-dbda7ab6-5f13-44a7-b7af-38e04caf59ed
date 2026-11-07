import { Order } from '../models/Order';

/**
 * Interfaz del repositorio para operaciones CRUD de órdenes.
 * Define los contratos que la capa de infraestructura debe implementar.
 */
export interface OrderRepository {
    /**
     * Crea una nueva orden en la base de datos.
     * @param order Orden a crear.
     * @returns Promise con la orden creada.
     */
    create(order: Order): Promise<Order>;

    /**
     * Obtiene una orden por su ID.
     * @param id ID de la orden.
     * @returns Promise con la orden encontrada o null si no existe.
     */
    findById(id: string): Promise<Order | null>;

    /**
     * Actualiza una orden existente.
     * @param order Orden con los datos actualizados.
     * @returns Promise con la orden actualizada.
     */
    update(order: Order): Promise<Order>;

    /**
     * Elimina una orden por su ID.
     * @param id ID de la orden a eliminar.
     * @returns Promise que se resuelve cuando la orden es eliminada.
     */
    delete(id: string): Promise<void>;
}