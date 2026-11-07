export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface Order {
  id: string;
  products: Product[];
  quantities: number[];
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class OrderModel {
  private readonly _id: string;
  private readonly _products: Product[];
  private readonly _quantities: number[];
  private _status: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(data: Order) {
    this._id = data.id;
    this._products = data.products || [];
    this._quantities = data.quantities || [];
    this._status = data.status || 'pending';
    this._createdAt = data.createdAt || new Date();
    this._updatedAt = data.updatedAt || new Date();
  }

  get id(): string {
    return this._id;
  }

  get products(): Product[] {
    return [...this._products];
  }

  get quantities(): number[] {
    return [...this._quantities];
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
    this._updatedAt = new Date();
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  toPlainObject(): Order {
    return {
      id: this._id,
      products: [...this._products],
      quantities: [...this._quantities],
      status: this._status,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt
    };
  }

  static fromPlainObject(data: Order): OrderModel {
    return new OrderModel(data);
  }

  validate(): boolean {
    if (!this._id || this._id.trim() === '') {
      throw new Error('El ID de la orden es requerido');
    }
    if (!Array.isArray(this._products) || this._products.length === 0) {
      throw new Error('La orden debe contener al menos un producto');
    }
    if (!Array.isArray(this._quantities) || this._quantities.length !== this._products.length) {
      throw new Error('La cantidad de productos debe coincidir con la cantidad de elementos');
    }
    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(this._status)) {
      throw new Error(`Estado inválido. Estados permitidos: ${validStatuses.join(', ')}`);
    }
    return true;
  }
}