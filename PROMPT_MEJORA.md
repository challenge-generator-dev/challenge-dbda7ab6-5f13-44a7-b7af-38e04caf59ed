# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `app/test/unit/OrderService.test.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.
- `app/test/integration/OrderController.test.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `app` | `app/` | practice, chapter | server | Node | Express, DynamoDB |
| `infra` | `infra/` | support | infra | Terraform (AWS) | Terraform |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate` — componente `infra` (support).
3. `cd app && npm install && npm run build` — componente `app` (practice, chapter).

### Contratos entre componentes

- `app` expone http (api: http://localhost:3000):
  - `POST /orders`
  - `GET /orders/:id`
  - `PUT /orders/:id`
  - `DELETE /orders/:id`

## Herramientas

- **Terraform**: Herramienta de trabajo del candidato: usala en la fase donde se depura o se prueba la solucion (no es una dependencia del proyecto).

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Boilerplate del stack que falta

Sin esto no compila ni arranca. Es andamiaje, no toca nada de lo pedagogico:

- **app/src/app.module.ts** — Sin el modulo raiz, Nest no tiene arbol de dependencias que resolver y el bootstrap falla.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `app/src/interfaces/controllers/OrderController.ts` — `Order.toDTO`: Se invoca `toDTO` sobre `Order`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `app/src/interfaces/controllers/OrderController.ts` — `OrderService.getOrderById`: Se invoca `getOrderById` sobre `OrderService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
(cd app && npm install && npm run build) && (cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced L2

### Brecha de conocimiento
CRUD de ordenes en DynamoDB expuesto por una API REST (corrida e2e 20261106212220607), Implementa operaciones CRUD de ordenes sobre una tabla DynamoDB expuestas por una API REST

### Misión / candidato
Persistir y consultar ordenes

### Reto
- Tema: CRUD de ordenes sobre DynamoDB
- Seniority: advanced-l2
- Tipo: practical
- Título: Implementación de operaciones CRUD en DynamoDB
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración y creación de la tabla DynamoDB — objetivo: Configurar DynamoDB y crear la tabla de órdenes. — entregable (NO resolver): Tabla DynamoDB creada y configurada con los atributos necesarios.
- Fase 2: Implementación de operaciones CRUD — objetivo: Implementar las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en la API REST. — entregable (NO resolver): API REST con operaciones CRUD implementadas y funcionales.
- Fase 3: Pruebas y optimización — objetivo: Realizar pruebas unitarias y de integración para validar las operaciones CRUD y optimizar el rendimiento de la API. — entregable (NO resolver): API REST con pruebas unitarias y de integración realizadas y rendimiento optimizado.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: app/package.json ===
{
  "name": "order-management-api",
  "version": "1.0.0",
  "description": "API REST para gestión de órdenes en DynamoDB",
  "main": "dist/main.js",
  "scripts": {
    "build": "tsc",
    "start": "ts-node src/main.ts",
    "dev": "ts-node src/main.ts",
    "test": "jest",
    "test:unit": "jest --testPathPattern=unit",
    "test:integration": "jest --testPathPattern=integration"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.19.2",
    "aws-sdk": "^2.1691.0",
    "dotenv": "^16.4.5"
  },
  "devDependencies": {
    "typescript": "5.7.0-dev.20241007",
    "ts-node": "^10.9.2",
    "@types/node": "^22.5.0",
    "@types/express": "^4.17.21",
    "jest": "^29.7.0",
    "@types/jest": "^29.5.12",
    "supertest": "^7.0.0",
    "@types/supertest": "^6.0.2",
    "ts-jest": "^29.2.4"
  },
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node",
    "moduleFileExtensions": ["ts", "js"],
    "transform": {
      "^.+\\.ts$": "ts-jest"
    },
    "testMatch": ["**/*.test.ts"]
  }
}

// === ARCHIVO: app/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "baseUrl": ".",
    "paths": {
      "*": ["node_modules/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.test.ts"]
}

// === ARCHIVO: app/src/main.ts ===
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

// === ARCHIVO: app/src/domain/models/Order.ts ===
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

// === ARCHIVO: app/src/domain/repositories/OrderRepository.ts ===
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

// === ARCHIVO: app/src/infrastructure/dynamodb/DynamoDBOrderRepository.ts ===
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

// === ARCHIVO: app/src/interfaces/controllers/OrderController.ts ===
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

// === ARCHIVO: app/src/interfaces/routes/orderRoutes.ts ===
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

// === ARCHIVO: app/src/interfaces/middlewares/errorHandler.ts ===
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export interface AppError extends Error {
    statusCode?: number;
    isOperational?: boolean;
}

export class ValidationError extends Error implements AppError {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = 400;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundError extends Error implements AppError {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ConflictError extends Error implements AppError {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string) {
        super(message);
        this.name = 'ConflictError';
        this.statusCode = 409;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class InternalServerError extends Error implements AppError {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string = 'Error interno del servidor') {
        super(message);
        this.name = 'InternalServerError';
        this.statusCode = 500;
        this.isOperational = false;
        Error.captureStackTrace(this, this.constructor);
    }
}

export const errorHandler: ErrorRequestHandler = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (res.headersSent) {
        return next(err);
    }

    const statusCode = err.statusCode || 500;
    const message = err.isOperational ? err.message : 'Error interno del servidor';

    console.error(`[${new Date().toISOString()}] Error ${statusCode}:`, {
        name: err.name,
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
        body: req.body,
        params: req.params,
        query: req.query
    });

    res.status(statusCode).json({
        error: {
            name: err.name,
            message: message,
            statusCode: statusCode,
            timestamp: new Date().toISOString(),
            path: req.path,
            method: req.method
        }
    });
};

export const notFoundHandler = (req: Request, res: Response): void => {
    res.status(404).json({
        error: {
            name: 'NotFoundError',
            message: `Ruta ${req.method} ${req.path} no encontrada`,
            statusCode: 404,
            timestamp: new Date().toISOString(),
            path: req.path,
            method: req.method
        }
    });
};

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} ${res.statusCode} - ${duration}ms`);
    });

    next();
};

export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

// === ARCHIVO: app/src/application/services/OrderService.ts ===
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

// === ARCHIVO: app/src/infrastructure/config/awsConfig.ts ===
import AWS from 'aws-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

const configureAWS = (): void => {
    const region = process.env.AWS_REGION || 'us-east-1';
    const endpoint = process.env.DYNAMODB_ENDPOINT;
    
    const config: AWS.ConfigurationOptions = {
        region: region,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    };

    if (endpoint) {
        config.endpoint = endpoint;
    }

    AWS.config.update(config);
};

configureAWS();

export const getDynamoDBDocumentClient = (): AWS.DynamoDB.DocumentClient => {
    return new AWS.DynamoDB.DocumentClient();
};

export const getDynamoDBClient = (): AWS.DynamoDB => {
    return new AWS.DynamoDB();
};

export const getTableName = (): string => {
    return process.env.DYNAMODB_TABLE_NAME || 'orders';
};

export const getAWSRegion = (): string => {
    return process.env.AWS_REGION || 'us-east-1';
};

// === ARCHIVO: app/test/unit/OrderService.test.ts ===
import { OrderService } from '../../src/application/services/OrderService';
import { OrderRepository } from '../../src/domain/repositories/OrderRepository';
import { Order } from '../../src/domain/models/Order';

describe('OrderService', () => {
    let orderService: OrderService;
    let mockOrderRepository: jest.Mocked<OrderRepository>;

    beforeEach(() => {
        mockOrderRepository = {
            create: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
        } as unknown as jest.Mocked<OrderRepository>;
        
        orderService = new OrderService(mockOrderRepository);
    });

    describe('createOrder', () => {
        it('should create an order successfully', async () => {
            // TODO: Implementar test
        });

        it('should handle errors when creating an order', async () => {
            // TODO: Implementar test
        });
    });

    describe('getOrder', () => {
        it('should return an order by id', async () => {
            // TODO: Implementar test
        });

        it('should return null when order not found', async () => {
            // TODO: Implementar test
        });
    });

    describe('updateOrder', () => {
        it('should update an existing order', async () => {
            // TODO: Implementar test
        });

        it('should return null when updating non-existent order', async () => {
            // TODO: Implementar test
        });
    });

    describe('deleteOrder', () => {
        it('should delete an order successfully', async () => {
            // TODO: Implementar test
        });

        it('should return false when deleting non-existent order', async () => {
            // TODO: Implementar test
        });
    });
});

// === ARCHIVO: app/test/integration/OrderController.test.ts ===
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

// === ARCHIVO: app/.env.example ===
# ============================================
# Configuración del Servidor
# ============================================
# Puerto donde escuchará el servidor Express
PORT=3000

# Entorno de ejecución (development, staging, production)
NODE_ENV=development

# ============================================
# Configuración de AWS DynamoDB
# ============================================
# Región de AWS donde está ubicada la tabla DynamoDB
AWS_REGION=us-east-1

# Endpoint de DynamoDB (para desarrollo local usar http://localhost:8000)
# En producción eliminar esta variable o dejarla vacía para usar AWS estándar
DYNAMODB_ENDPOINT=http://localhost:8000

# Nombre de la tabla de órdenes en DynamoDB
DYNAMODB_TABLE_ORDERS=orders

# ============================================
# Credenciales de AWS (NO incluir en código fuente)
# ============================================
# Clave de acceso de AWS IAM (usar en entorno local únicamente)
AWS_ACCESS_KEY_ID=your-access-key-id-here

# Clave secreta de AWS IAM (usar en entorno local únicamente)
AWS_SECRET_ACCESS_KEY=your-secret-access-key-here

# ============================================
# Configuración de Logging
# ============================================
# Nivel de logging (debug, info, warn, error)
LOG_LEVEL=info

# Habilitar logs detallados de AWS SDK
AWS_DEBUG=false

# ============================================
# Configuración de CORS
# ============================================
# Lista de orígenes permitidos separados por coma
CORS_ORIGINS=http://localhost:3000,http://localhost:8080

# ============================================
# Timeouts y Límites
# ============================================
# Timeout de requests en milisegundos
REQUEST_TIMEOUT=30000

# Límite de tamaño de payload en MB
PAYLOAD_LIMIT=10

# ============================================
# Retry y Tolerancia a Fallos
# ============================================
# Número máximo de reintentos para operaciones DynamoDB
DYNAMODB_MAX_RETRIES=3

# Timeout de reintento en milisegundos
DYNAMODB_RETRY_TIMEOUT=1000

# ============================================
# Notas de Configuración
# ============================================
# Copia este archivo a .env y completa los valores correspondientes
# Las credenciales de AWS NUNCA deben incluirse en el código fuente
# Para producción usar IAM roles en lugar de claves de acceso
# El endpoint de DynamoDB local requiere AWS CLI o Docker con DynamoDB Local

// === ARCHIVO: app/README.md ===
# Order Management API

API REST para gestión de órdenes en DynamoDB con operaciones CRUD completas.

## Descripción

Este proyecto implementa una API RESTful para la gestión de órdenes de compra en una plataforma de comercio electrónico. Utiliza DynamoDB como almacenamiento subyacente y expone endpoints para crear, leer, actualizar y eliminar órdenes.

## Requisitos Previos

- Node.js 22.x
- npm 10.x
- AWS CLI (para configuración local de DynamoDB)
- Docker (opcional, para DynamoDB Local)

## Instalación

```bash
npm install
```

## Configuración

1. Copia el archivo de ejemplo de variables de entorno:

```bash
cp .env.example .env
```

2. Edita `.env` con tu configuración. Para desarrollo local con DynamoDB Local:

```env
PORT=3000
NODE_ENV=development
AWS_REGION=us-east-1
DYNAMODB_ENDPOINT=http://localhost:8000
DYNAMODB_TABLE_ORDERS=orders
AWS_ACCESS_KEY_ID=local
AWS_SECRET_ACCESS_KEY=local
```

3. Si usas DynamoDB Local con Docker:

```bash
docker run -p 8000:8000 amazon/dynamodb-local
```

## Ejecución

### Desarrollo

```bash
npm run dev
```

El servidor arrancará en `http://localhost:3000`

### Producción

```bash
npm run build
npm start
```

## Endpoints de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | /orders | Crear una nueva orden |
| GET | /orders/:id | Obtener una orden por ID |
| PUT | /orders/:id | Actualizar una orden existente |
| DELETE | /orders/:id | Eliminar una orden |

### Ejemplos de Uso

#### Crear Orden

```bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{
    "products": [
      { "id": "prod-001", "name": "Laptop", "price": 999.99 }
    ],
    "quantities": [1],
    "status": "pending"
  }'
```

#### Obtener Orden

```bash
curl http://localhost:3000/orders/{order-id}
```

#### Actualizar Orden

```bash
curl -X PUT http://localhost:3000/orders/{order-id} \
  -H "Content-Type: application/json" \
  -d '{
    "status": "confirmed"
  }'
```

#### Eliminar Orden

```bash
curl -X DELETE http://localhost:3000/orders/{order-id}
```

## Pruebas

### Ejecutar todas las pruebas

```bash
npm test
```

### Pruebas unitarias

```bash
npm run test:unit
```

### Pruebas de integración

```bash
npm run test:integration
```

## Estructura del Proyecto

```
src/
├── main.ts                          # Punto de entrada del servidor
├── domain/
│   ├── models/
│   │   └── Order.ts                 # Modelo de dominio y DTOs
│   └── repositories/
│       └── OrderRepository.ts       # Interfaz del repositorio
├── application/
│   └── services/
│       └── OrderService.ts          # Lógica de negocio
├── infrastructure/
│   ├── config/
│   │   └── awsConfig.ts             # Configuración de AWS
│   └── dynamodb/
│       └── DynamoDBOrderRepository.ts  # Implementación DynamoDB
└── interfaces/
    ├── controllers/
    │   └── OrderController.ts       # Controlador HTTP
    ├── routes/
    │   └── orderRoutes.ts           # Definición de rutas
    └── middlewares/
        └── errorHandler.ts          # Manejo de errores
```

## Tecnologías

- **Runtime**: Node.js 22
- **Lenguaje**: TypeScript 5.7
- **Framework**: Express 4.19
- **Base de datos**: AWS DynamoDB
- **Testing**: Jest + Supertest

## Licencia

ISC

// === ARCHIVO: infra/environments/dev/terraform.tfvars ===
# Terraform variables for development environment
# These values will override the defaults defined in variables.tf

# AWS Configuration
region = "us-east-1"
profile = "default"

# DynamoDB Configuration
dynamodb_table_name = "dev-application-table"
dynamodb_billing_mode = "PAY_PER_REQUEST"
dynamodb_hash_key = "id"
dynamodb_range_key = "sort_key"

# Tags
environment = "dev"
project = "backend-service"
owner = "backend-team"

# Additional settings
enable_streams = true
enable_encryption = true

// === ARCHIVO: infra/providers.tf ===
# Providers de Terraform para el despliegue en AWS
# Configura el provider AWS con la versión especificada y la región por defecto

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.51.1"
    }
  }
  required_version = ">= 1.7.0"
}

provider "aws" {
  region = var.aws_region
  # Las credenciales se configuran mediante variables de entorno o AWS CLI
  # No se hardcodean en el código por seguridad
  default_tags {
    tags = {
      Environment = var.environment
      Terraform   = "true"
      Project     = var.project_name
    }
  }
}

# Variables utilizadas en el provider
variable "aws_region" {
  description = "Región de AWS donde se desplegarán los recursos"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Entorno de despliegue (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "project_name" {
  description = "Nombre del proyecto para etiquetar recursos"
  type        = string
  default     = "order-management"
}

// === ARCHIVO: infra/variables.tf ===
# Variables globales para la configuración de la infraestructura
# Estas variables se utilizan en los módulos y recursos de Terraform

variable "aws_region" {
  description = "Región de AWS donde se desplegarán los recursos"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Entorno de despliegue (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "project_name" {
  description = "Nombre del proyecto para etiquetar recursos"
  type        = string
  default     = "order-management"
}

variable "dynamodb_table_name" {
  description = "Nombre de la tabla DynamoDB para órdenes"
  type        = string
  default     = "orders"
}

variable "dynamodb_billing_mode" {
  description = "Modo de facturación para la tabla DynamoDB (PROVISIONED o PAY_PER_REQUEST)"
  type        = string
  default     = "PAY_PER_REQUEST"
}

variable "dynamodb_read_capacity" {
  description = "Capacidad de lectura provisionada (solo aplica si billing_mode es PROVISIONED)"
  type        = number
  default     = 5
}

variable "dynamodb_write_capacity" {
  description = "Capacidad de escritura provisionada (solo aplica si billing_mode es PROVISIONED)"
  type        = number
  default     = 5
}

variable "dynamodb_hash_key" {
  description = "Clave hash (partition key) para la tabla DynamoDB"
  type        = string
  default     = "order_id"
}

variable "dynamodb_range_key" {
  description = "Clave de rango (sort key) para la tabla DynamoDB (opcional)"
  type        = string
  default     = null
}

variable "dynamodb_attributes" {
  description = "Lista de atributos para la tabla DynamoDB"
  type = list(object({
    name = string
    type = string
  }))
  default = [
    {
      name = "order_id"
      type = "S"
    },
    {
      name = "customer_id"
      type = "S"
    },
    {
      name = "order_date"
      type = "S"
    },
    {
      name = "status"
      type = "S"
    }
  ]
}

variable "dynamodb_global_secondary_indexes" {
  description = "Lista de índices secundarios globales para la tabla DynamoDB"
  type = list(object({
    name            = string
    hash_key       = string
    range_key      = string
    projection_type = string
    read_capacity  = number
    write_capacity = number
  }))
  default = [
    {
      name            = "customer_id-index"
      hash_key       = "customer_id"
      range_key      = "order_date"
      projection_type = "ALL"
      read_capacity  = 5
      write_capacity = 5
    }
  ]
}

variable "dynamodb_ttl_attribute" {
  description = "Atributo para Time To Live (TTL) en DynamoDB (opcional)"
  type        = string
  default     = null
}

// === ARCHIVO: infra/modules/dynamodb/variables.tf ===
# Variables del módulo DynamoDB
# Estas variables parametrizan la creación y configuración de la tabla DynamoDB

variable "table_name" {
  description = "Nombre de la tabla DynamoDB"
  type        = string
}

variable "billing_mode" {
  description = "Modo de facturación para la tabla DynamoDB (PROVISIONED o PAY_PER_REQUEST)"
  type        = string
  default     = "PAY_PER_REQUEST"
}

variable "read_capacity" {
  description = "Capacidad de lectura provisionada (solo aplica si billing_mode es PROVISIONED)"
  type        = number
  default     = 5
}

variable "write_capacity" {
  description = "Capacidad de escritura provisionada (solo aplica si billing_mode es PROVISIONED)"
  type        = number
  default     = 5
}

variable "hash_key" {
  description = "Clave hash (partition key) para la tabla DynamoDB"
  type        = string
}

variable "range_key" {
  description = "Clave de rango (sort key) para la tabla DynamoDB (opcional)"
  type        = string
  default     = null
}

variable "attributes" {
  description = "Lista de atributos para la tabla DynamoDB"
  type = list(object({
    name = string
    type = string
  }))
}

variable "global_secondary_indexes" {
  description = "Lista de índices secundarios globales para la tabla DynamoDB"
  type = list(object({
    name            = string
    hash_key       = string
    range_key      = string
    projection_type = string
    read_capacity  = number
    write_capacity = number
  }))
  default = []
}

variable "ttl_attribute" {
  description = "Atributo para Time To Live (TTL) en DynamoDB (opcional)"
  type        = string
  default     = null
}

variable "tags" {
  description = "Tags para la tabla DynamoDB"
  type        = map(string)
  default     = {}
}

variable "enable_stream" {
  description = "Habilitar stream para la tabla DynamoDB"
  type        = bool
  default     = false
}

variable "stream_view_type" {
  description = "Tipo de vista del stream (KEYS_ONLY, NEW_IMAGE, OLD_IMAGE, NEW_AND_OLD_IMAGES)"
  type        = string
  default     = null
}

// === ARCHIVO: infra/versions.tf ===
terraform {
  required_version = "~> 1.7.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.51.1"
    }
  }
}

# Configuración del provider AWS
# Se asume que las credenciales y región se proporcionan
# a través de variables de entorno, archivo de configuración
# o argumentos del comando terraform
provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Environment = var.environment
      ManagedBy   = "Terraform"
      Project     = "ecommerce-orders"
      Component   = "dynamodb"
    }
  }
}

# Configuración de endpoints para DynamoDB
# Permite usar DynamoDB local para desarrollo/testing
provider "aws" {
  alias  = "local"
  region = "us-east-1"

  endpoints {
    dynamodb = var.dynamodb_endpoint
  }

  skip_credentials_validation = var.dynamodb_endpoint != null
  skip_requesting_account_id  = var.dynamodb_endpoint != null
  skip_metadata_api_check     = var.dynamodb_endpoint != null

  default_tags {
    tags = {
      Environment = var.environment
      ManagedBy   = "Terraform"
      Project     = "ecommerce-orders"
      Component   = "dynamodb-local"
    }
  }
}

// === ARCHIVO: infra/main.tf ===
# =============================================================================
# CONFIGURACIÓN PRINCIPAL DE TERRAFORM PARA AWS
# =============================================================================
# Este archivo contiene la definición de los recursos de infraestructura
# necesarios para el sistema de gestión de órdenes de la plataforma
# de comercio electrónico, incluyendo la tabla DynamoDB principal.
# =============================================================================

# Recurso: Tabla DynamoDB para almacenar órdenes
# La tabla está diseñada para soportar operaciones CRUD completas
# con patrones de acceso comunes en un sistema de e-commerce.
# Se utiliza una clave compuesta (partition key + sort key) para
# permitir consultas eficientes por cliente y por estado.
resource "aws_dynamodb_table" "orders" {
  name           = var.table_name
  billing_mode   = var.billing_mode
  hash_key       = "order_id"
  range_key      = "customer_id"

  # Definición de atributos de la tabla
  # Cada atributo debe declararse antes de usarse como clave
  attribute {
    name = "order_id"
    type = "S"
  }

  attribute {
    name = "customer_id"
    type = "S"
  }

  attribute {
    name = "status"
    type = "S"
  }

  attribute {
    name = "created_at"
    type = "N"
  }

  attribute {
    name = "updated_at"
    type = "N"
  }

  # Índices secundarios globales para consultas eficientes
  # GSI1: Permite consultar órdenes por cliente con ordenamiento por fecha
  global_secondary_index {
    name            = "idx_customer_created"
    hash_key        = "customer_id"
    range_key       = "created_at"
    projection_type = "ALL"
    read_capacity   = var.gsi_read_capacity
    write_capacity  = var.gsi_write_capacity
  }

  # GSI2: Permite consultar órdenes por estado para filtros comunes
  global_secondary_index {
    name            = "idx_status_created"
    hash_key        = "status"
    range_key       = "created_at"
    projection_type = "ALL"
    read_capacity   = var.gsi_read_capacity
    write_capacity  = var.gsi_write_capacity
  }

  # GSI3: Permite consultar órdenes por cliente filtradas por estado
  global_secondary_index {
    name            = "idx_customer_status"
    hash_key        = "customer_id"
    range_key       = "status"
    projection_type = "KEYS_ONLY"
    read_capacity   = var.gsi_read_capacity
    write_capacity  = var.gsi_write_capacity
  }

  # Configuración de capacidad
  # Modo bajo demanda (PAY_PER_REQUEST) para escalar automáticamente
  # Modo aprovisionado (PROVISIONED) para costos predecibles
  dynamic "capacity" {
    for_each = var.billing_mode == "PROVISIONED" ? [1] : []
    content {
      read_capacity  = var.dynamodb_read_capacity
      write_capacity = var.dynamodb_write_capacity
    }
  }

  # Configuración de Time To Live (TTL)
  # Permite eliminar automáticamente órdenes antiguas según política
  ttl {
    attribute_name = "ttl"
    enabled        = var.ttl_enabled
  }

  # Configuración de servidor-side encryption
  # Por defecto usa AWS managed KMS key
  server_side_encryption {
    enabled     = var.server_side_encryption
    kms_key_arn = var.kms_key_arn
  }

  # Configuración de punto de restauración y backup
  point_in_time_recovery {
    enabled = var.point_in_time_recovery
  }

  # Tags adicionales específicos del recurso
  tags = merge(
    var.common_tags,
    {
      Name        = "${var.table_name}-dynamodb-table"
      Description = "Tabla DynamoDB para almacenar órdenes del sistema de e-commerce"
      TableType   = "Orders"
    }
  )
}

# Recurso: Tabla DynamoDB para tracking de eventos de órdenes
# Almacena el historial de cambios de estado de cada orden
# para auditoría y trazabilidad del sistema.
resource "aws_dynamodb_table" "order_events" {
  name           = "${var.table_name}_events"
  billing_mode   = var.billing_mode
  hash_key       = "order_id"
  range_key      = "event_timestamp"

  attribute {
    name = "order_id"
    type = "S"
  }

  attribute {
    name = "event_timestamp"
    type = "N"
  }

  attribute {
    name = "event_type"
    type = "S"
  }

  # GSI para consultas por tipo de evento
  global_secondary_index {
    name            = "idx_event_type_timestamp"
    hash_key        = "event_type"
    range_key       = "event_timestamp"
    projection_type = "ALL"
    read_capacity   = var.gsi_read_capacity
    write_capacity  = var.gsi_write_capacity
  }

  dynamic "capacity" {
    for_each = var.billing_mode == "PROVISIONED" ? [1] : []
    content {
      read_capacity  = var.dynamodb_read_capacity
      write_capacity = var.dynamodb_write_capacity
    }
  }

  server_side_encryption {
    enabled     = var.server_side_encryption
    kms_key_arn = var.kms_key_arn
  }

  ttl {
    attribute_name = "ttl"
    enabled        = var.ttl_enabled
  }

  tags = merge(
    var.common_tags,
    {
      Name        = "${var.table_name}_events-dynamodb-table"
      Description = "Tabla DynamoDB para eventos de auditoría de órdenes"
      TableType   = "OrderEvents"
    }
  )
}

# Recurso: Bucket S3 para backups de DynamoDB
# Almacena exportaciones periódicas de la tabla de órdenes
resource "aws_s3_bucket" "backups" {
  bucket = "${var.project_name}-${var.environment}-dynamodb-backups"

  tags = merge(
    var.common_tags,
    {
      Name        = "${var.project_name}-${var.environment}-dynamodb-backups"
      Description = "Bucket S3 para backups de DynamoDB"
      Purpose     = "DynamoDBBackup"
    }
  )
}

# Configuración de lifecycle para el bucket de backups
resource "aws_s3_bucket_lifecycle_configuration" "backups" {
  bucket = aws_s3_bucket.backups.id

  rule {
    id     = "expire-old-backups"
    status = "Enabled"

    expiration {
      days = var.backup_retention_days
    }
  }
}

# Recurso: KMS Key para cifrado de datos en reposo
# Proporciona control sobre las claves de cifrado utilizadas
# por DynamoDB y S3 para proteger datos sensibles de órdenes.
resource "aws_kms_key" "dynamodb" {
  description             = "KMS Key para cifrado de datos de órdenes"
  deletion_window_in_days = 10
  enable_key_rotation     = var.kms_enable_key_rotation

  tags = merge(
    var.common_tags,
    {
      Name        = "${var.table_name}-kms-key"
      Description = "Clave KMS para cifrado de tabla DynamoDB"
      Purpose     = "DataEncryption"
    }
  )
}

# Recurso: Alias de KMS para referencia amigable
resource "aws_kms_alias" "dynamodb" {
  name          = "alias/${var.project_name}-${var.environment}-orders"
  target_key_id = aws_kms_key.dynamodb.key_id
}

// === ARCHIVO: infra/outputs.tf ===
# =============================================================================
# SALIDAS DE TERRAFORM PARA RECURSOS CREADOS
# =============================================================================
# Este archivo expone la información relevante de los recursos
# creados por Terraform, permitiendo que otros módulos o
# configuraciones consuman estos valores de forma controlada.
# =============================================================================

# Salidas de la tabla principal de órdenes
output "orders_table_name" {
  description = "Nombre de la tabla DynamoDB de órdenes"
  value       = aws_dynamodb_table.orders.name
}

output "orders_table_arn" {
  description = "ARN de la tabla DynamoDB de órdenes"
  value       = aws_dynamodb_table.orders.arn
}

output "orders_table_id" {
  description = "ID de la tabla DynamoDB de órdenes"
  value       = aws_dynamodb_table.orders.id
}

output "orders_table_stream_arn" {
  description = "ARN del stream de la tabla DynamoDB de órdenes"
  value       = aws_dynamodb_table.orders.stream_arn
  sensitive   = false
}

# Salidas de la tabla de eventos de órdenes
output "order_events_table_name" {
  description = "Nombre de la tabla DynamoDB de eventos de órdenes"
  value       = aws_dynamodb_table.order_events.name
}

output "order_events_table_arn" {
  description = "ARN de la tabla DynamoDB de eventos de órdenes"
  value       = aws_dynamodb_table.order_events.arn
}

output "order_events_table_id" {
  description = "ID de la tabla DynamoDB de eventos de órdenes"
  value       = aws_dynamodb_table.order_events.id
}

# Salidas del bucket S3 de backups
output "backups_bucket_name" {
  description = "Nombre del bucket S3 para backups"
  value       = aws_s3_bucket.backups.id
}

output "backups_bucket_arn" {
  description = "ARN del bucket S3 para backups"
  value       = aws_s3_bucket.backups.arn
}

output "backups_bucket_region" {
  description = "Región del bucket S3 para backups"
  value       = aws_s3_bucket.backups.region
}

# Salidas de la clave KMS
output "kms_key_id" {
  description = "ID de la clave KMS"
  value       = aws_kms_key.dynamodb.key_id
  sensitive   = true
}

output "kms_key_arn" {
  description = "ARN de la clave KMS"
  value       = aws_kms_key.dynamodb.arn
}

output "kms_alias_name" {
  description = "Nombre del alias de la clave KMS"
  value       = aws_kms_alias.dynamodb.name
}

# Información de configuración de la tabla
output "table_configuration" {
  description = "Configuración de la tabla de órdenes"
  value = {
    name               = aws_dynamodb_table.orders.name
    billing_mode       = aws_dynamodb_table.orders.billing_mode
    hash_key           = aws_dynamodb_table.orders.hash_key
    range_key          = aws_dynamodb_table.orders.range_key
    server_encryption  = aws_dynamodb_table.orders.server_side_encryption[0].enabled
    point_in_time_recovery = aws_dynamodb_table.orders.point_in_time_recovery[0].enabled
    gsi_count          = length(aws_dynamodb_table.orders.global_secondary_index)
  }
}

# Índices secundarios globales disponibles
output "global_secondary_indexes" {
  description = "Lista de índices secundarios globales configurados"
  value = [for gsi in aws_dynamodb_table.orders.global_secondary_index : {
    name       = gsi.name
    hash_key   = gsi.hash_key
    range_key  = gsi.range_key
    read_cap   = gsi.read_capacity
    write_cap  = gsi.write_capacity
  }]
}

# Atributos de la tabla
output "table_attributes" {
  description = "Atributos definidos en la tabla de órdenes"
  value = [for attr in aws_dynamodb_table.orders.attribute : {
    name = attr.name
    type = attr.type
  }]
}

# Información de conexión para aplicaciones
output "connection_info" {
  description = "Información de conexión para la aplicación"
  value = {
    region     = var.aws_region
    table_name = aws_dynamodb_table.orders.name
    endpoint   = "https://dynamodb.${var.aws_region}.amazonaws.com"
    arn        = aws_dynamodb_table.orders.arn
  }
  sensitive = false
}

// === ARCHIVO: infra/terraform.tfvars.example ===
# =============================================================================
# Variables de configuración para Terraform - E-commerce Orders API
# =============================================================================
# Este archivo contiene las variables de configuración necesarias para
# aprovisionar la infraestructura de la aplicación de gestión de órdenes.
# Copia este archivo a terraform.tfvars y ajusta los valores según tu entorno.
#
# Uso: cp terraform.tfvars.example terraform.tfvars
# =============================================================================

# -----------------------------------------------------------------------------
# Configuración de AWS
# -----------------------------------------------------------------------------

# Región de AWS donde se crearán los recursos
aws_region = "us-east-1"

# Perfil de AWS credentials a utilizar (opcional, si no se usa default)
# aws_profile = "mi-perfil-aws"

# -----------------------------------------------------------------------------
# Configuración de DynamoDB - Tabla de Órdenes
# -----------------------------------------------------------------------------

# Nombre de la tabla DynamoDB para almacenar las órdenes
dynamodb_table_name = "ecommerce-orders"

# Modo de facturación: PAY_PER_REQUEST o PROVISIONED
dynamodb_billing_mode = "PAY_PER_REQUEST"

# Capacidad de lectura para modo aprovisionado (si aplica)
dynamodb_read_capacity = 5

# Capacidad de escritura para modo aprovisionado (si aplica)
dynamodb_write_capacity = 5

# Habilitar point-in-time recovery para la tabla
dynamodb_pit_recovery_enabled = true

# TTL (Time-To-Live) para expire orders - campo en segundos desde epoch
dynamodb_ttl_attribute = "expiration_time"

# -----------------------------------------------------------------------------
# Configuración de etiquetas (tags) para recursos
# -----------------------------------------------------------------------------

# Entorno dónde se despliega la infraestructura
environment = "dev"

# Nombre del proyecto o aplicación
project_name = "ecommerce-orders-api"

# Propietario del proyecto
project_owner = "platform-team"

# Costo center para facturación
cost_center = "ecommerce-platform"

# -----------------------------------------------------------------------------
# Configuración de red (VPC - opcional)
# -----------------------------------------------------------------------------

# ID de VPC existente donde desplegar recursos (dejar vacío para crear nueva)
# vpc_id = "vpc-0123456789abcdef0"

# Subnets IDs para la tabla DynamoDB con DynamoDB Accelerator (opcional)
# dynamodb_subnet_ids = ["subnet-0123456789abcdef0", "subnet-0123456789abcdef1"]

# -----------------------------------------------------------------------------
# Configuración de seguridad
# -----------------------------------------------------------------------------

# Habilitar cifrado en reposo para la tabla DynamoDB
enable_dynamodb_encryption = true

# KMS key ID para cifrado personalizado (opcional)
# kms_key_id = "alias/aws/dynamodb"

# -----------------------------------------------------------------------------
# Configuración de logging
# -----------------------------------------------------------------------------

# Habilitar CloudWatch Logs para auditoría
enable_logging = true

# Nivel de logging: ERROR, INFO, DEBUG
log_level = "INFO"

# Retención de logs en días
log_retention_days = 30

// === ARCHIVO: infra/README.md ===
# Módulo de Infraestructura - E-commerce Orders API

## Descripción

Este módulo de Terraform proporciona la infraestructura necesaria para una API de gestión de órdenes de comercio electrónico. La implementación utiliza AWS DynamoDB como almacenamiento principal y sigue las mejores prácticas de Infrastructure as Code (IaC).

## Componentes de Infraestructura

### DynamoDB - Tabla de Órdenes

La tabla de DynamoDB está diseñada para soportar operaciones CRUD completas sobre órdenes de compra:

| Atributo | Tipo | Descripción |
|----------|------|-------------|
| order_id | String | Identificador único de la orden (PK) |
| customer_id | String | ID del cliente que realizó la orden |
| products | List | Lista de productos en la orden |
| quantities | Map | Cantidades por producto |
| total_amount | Number | Monto total de la orden |
| status | String | Estado de la orden (pending, confirmed, shipped, delivered, cancelled) |
| created_at | String | Timestamp de creación (ISO 8601) |
| updated_at | String | Timestamp de última actualización (ISO 8601) |

### Claves y Patrones de Acceso

- **Primary Key**: `order_id` - Identificador único de cada orden
- **Secondary Index**: `customer_id` - Para consultas por cliente
- **GSI**: `status` + `created_at` - Para consultas por estado y fecha

### Características de Seguridad

- Cifrado en reposo con AWS managed keys (AES-256)
- Point-in-time recovery habilitado por defecto
- TTL configurable para limpieza automática de datos antiguos
- Logging detallado de operaciones vía CloudWatch

## Estructura del Módulo

```
infra/
├── terraform.tfvars.example    # Plantilla de variables
├── environments/
│   └── dev/
│       └── terraform.tfvars   # Variables del entorno dev
├── modules/
│   └── dynamodb/
│       ├── main.tf            # Recursos de DynamoDB
│       ├── variables.tf       # Variables del módulo
│       └── outputs.tf         # Outputs del módulo
├── providers.tf               # Configuración de providers
├── versions.tf                # Versiones de Terraform y providers
├── variables.tf               # Variables raíz del proyecto
├── main.tf                    # Orchestración de módulos
└── outputs.tf                 # Outputs del proyecto
```

## Uso del Módulo

### Requisitos Previos

- Terraform >= 1.7.0
- AWS CLI configurado con credenciales válidas
- Permisos para crear recursos de DynamoDB

### Inicialización

```bash
# Navegar al directorio de infraestructura
cd infra

# Inicializar Terraform
terraform init

# Validar configuración
terraform validate

# Ver plan de ejecución
terraform plan
```

### Aplicar Infraestructura

```bash
# Aplicar los cambios
terraform apply
```

### Variables Obligatorias

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| aws_region | Región de AWS | us-east-1 |
| dynamodb_table_name | Nombre de la tabla | ecommerce-orders |
| environment | Entorno de despliegue | dev |
| project_name | Nombre del proyecto | ecommerce-orders-api |

### Variables Opcionales

| Variable | Default | Descripción |
|----------|---------|-------------|
| dynamodb_billing_mode | PAY_PER_REQUEST | Modo de facturación |
| dynamodb_pit_recovery_enabled | true | Habilitar PITR |
| enable_dynamodb_encryption | true | Cifrado en reposo |
| enable_logging | true | Habilitar CloudWatch Logs |

## Outputs

El módulo provee los siguientes outputs:

- `dynamodb_table_name`: Nombre de la tabla creada
- `dynamodb_table_arn`: ARN de la tabla para referencias
- `dynamodb_table_id`: ID único de la tabla
- `dynamodb_table_status`: Estado actual de la tabla

## Limpieza

Para destruir la infraestructura creada:

```bash
terraform destroy
```

**Nota**: Antes de destruir, asegúrate de que no hay datos importantes en la tabla. La destrucción es irreversible.

## Consideraciones de Producción

Para entornos de producción considera:

1. **Modo de facturación**: Cambiar a PROVISIONED con capacidad adecuada
2. **Backups**: Configurar políticas de backup automatizadas
3. **Alertas**: Configurar CloudWatch alarms para métricas críticas
4. **VPC Endpoint**: Usar VPC endpoint para acceso privado
5. **Replication**: Habilitar global tables para alta disponibilidad

## Troubleshooting

### Error: "Table already exists"

Si la tabla ya existe, Terraform intentará recrearla. Soluciones:

1. Importar la tabla existente: `terraform import aws_dynamodb_table.main <table-name>`
2. Usar `terraform state mv` para reasignar el estado

### Error: "Access denied"

Verificar que las credenciales de AWS tienen permisos:

- dynamodb:CreateTable
- dynamodb:DescribeTable
- dynamodb:UpdateTable
- dynamodb:DeleteTable
- dynamodb:ListTables

## Referencias

- [Documentación de Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/dynamodb_table)
- [Patrones de diseño de DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-design.html)
- [Mejores prácticas de seguridad](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/security.html)

// === ARCHIVO: infra/environments/dev/terraform.tfvars.example ===
# =============================================================================
# Variables de configuración para el entorno de DESARROLLO
# E-commerce Orders API - DynamoDB CRUD
# =============================================================================
# Este archivo define los valores específicos para el entorno de desarrollo.
# NO committing este archivo al repositorio si contiene valores sensibles.
# Copia terraform.tfvars.example a este archivo y personaliza.
# =============================================================================

# -----------------------------------------------------------------------------
# Configuración de AWS - Entorno de Desarrollo
# -----------------------------------------------------------------------------

# Región de AWS para desarrollo (us-east-1 es la más común para demos)
aws_region = "us-east-1"

# Usar credenciales por defecto del perfil default de AWS CLI
# Para desarrollo local, asegúrate de tener AWS CLI configurado:
# aws configure
# O establece variables de entorno:
# export AWS_ACCESS_KEY_ID="tu-access-key"
# export AWS_SECRET_ACCESS_KEY="tu-secret-key"

# -----------------------------------------------------------------------------
# Configuración de DynamoDB - Tabla de Órdenes (DEV)
# -----------------------------------------------------------------------------

# Nombre de la tabla - sufjo -dev para distinguir de otros entornos
dynamodb_table_name = "ecommerce-orders-dev"

# Modo de facturación PAY_PER_REQUEST es ideal para desarrollo
# porque solo paga por las solicitudes realizadas sin costo mínimo
dynamodb_billing_mode = "PAY_PER_REQUEST"

# capacidades aprovisionadas (solo se usan si billing_mode = PROVISIONED)
dynamodb_read_capacity = 2
dynamodb_write_capacity = 2

# Point-in-time recovery es útil en dev para pruebas de restauración
dynamodb_pit_recovery_enabled = true

# TTL para órdenes expiradas - 30 días en segundos
# 30 días = 30 * 24 * 60 * 60 = 2592000 segundos
dynamodb_ttl_attribute = "expiration_time"

# -----------------------------------------------------------------------------
# Configuración de etiquetas (tags) - Desarrollo
# -----------------------------------------------------------------------------

# Entorno específico para desarrollo
environment = "dev"

# Nombre del proyecto
project_name = "ecommerce-orders-api"

# Propietario del módulo
project_owner = "platform-team"

# Centro de costos para tracking
cost_center = "ecommerce-platform-dev"

# -----------------------------------------------------------------------------
# Configuración de red - Desarrollo
# -----------------------------------------------------------------------------

# En desarrollo usamos acceso público a DynamoDB
# No se requiere VPC endpoint para desarrollo local
# vpc_id = "" (dejar vacío)

# -----------------------------------------------------------------------------
# Configuración de seguridad - Desarrollo
# -----------------------------------------------------------------------------

# Habilitar cifrado (recomendado incluso en dev)
enable_dynamodb_encryption = true

# Usar la clave gestionada por AWS por defecto
# Para desarrollo no necesitamos KMS personalizado
# kms_key_id = "alias/aws/dynamodb"

# -----------------------------------------------------------------------------
# Configuración de logging - Desarrollo
# -----------------------------------------------------------------------------

# Habilitar logging para monitoreo de queries
enable_logging = true

# Nivel de logging INFO para desarrollo (ERROR en producción)
log_level = "INFO"

# Menos días de retención en dev para ahorrar costos
log_retention_days = 7

# -----------------------------------------------------------------------------
# Notas de uso para desarrollo
# -----------------------------------------------------------------------------
#
# Este entorno está configurado para desarrollo rápido con:
# - PAY_PER_REQUEST: sin costo fijo, paga por uso
# - PITR habilitado: permite pruebas de restore
# - Logging activo: para debugging de queries
# - TTL configurado: limpieza automática de datos de prueba
#
# Para reiniciar la tabla de desarrollo:
#   terraform destroy -var-file=environments/dev/terraform.tfvars
#   terraform apply -var-file=environments/dev/terraform.tfvars
#
# Para verificar el estado de la tabla:
#   aws dynamodb describe-table --table-name ecommerce-orders-dev --region us-east-1
#
# Para listar tablas:
#   aws dynamodb list-tables --region us-east-1
#
# -----------------------------------------------------------------------------

// === ARCHIVO: infra/modules/dynamodb/main.tf ===
# Módulo de Terraform para crear la tabla DynamoDB de órdenes
# Este módulo provisiona la tabla de órdenes del sistema de e-commerce
# con los atributos necesarios para operaciones CRUD y consultas eficientes

resource "aws_dynamodb_table" "orders" {
  name           = var.table_name
  billing_mode   = var.billing_mode
  hash_key       = var.hash_key
  range_key      = var.range_key

  dynamic "attribute" {
    for_each = var.attributes
    content {
      name = attribute.value.name
      type = attribute.value.type
    }
  }

  dynamic "global_secondary_index" {
    for_each = var.global_secondary_indexes
    content {
      name            = global_secondary_index.value.name
      hash_key        = global_secondary_index.value.hash_key
      range_key       = lookup(global_secondary_index.value, "range_key", null)
      projection_type = global_secondary_index.value.projection_type
      read_capacity   = lookup(global_secondary_index.value, "read_capacity", null)
      write_capacity  = lookup(global_secondary_index.value, "write_capacity", null)
    }
  }

  dynamic "local_secondary_index" {
    for_each = var.local_secondary_indexes
    content {
      name       = local_secondary_index.value.name
      range_key  = local_secondary_index.value.range_key
      projection_type = local_secondary_index.value.projection_type
    }
  }

  server_side_encryption {
    enabled     = var.server_side_encryption
    kms_key_arn = var.kms_key_arn
  }

  point_in_time_recovery {
    enabled = var.point_in_time_recovery
  }

  ttl {
    enabled        = var.ttl_enabled
    attribute_name = var.ttl_attribute
  }

  tags = merge(
    var.tags,
    {
      "Name"        = var.table_name
      "Environment" = var.environment
      "ManagedBy"   = "Terraform"
      "Project"     = var.project_name
    }
  )

  lifecycle {
    ignore_changes = [tags["Environment"]]
  }
}

resource "aws_dynamodb_table_item" "orders_schema_validation" {
  count = var.enable_schema_validation ? 1 : 0

  table_name = aws_dynamodb_table.orders.name
  hash_key   = aws_dynamodb_table.orders.hash_key

  item = jsonencode({
    "order_id" = {
      S = "SCHEMA_VALIDATION"
    }
    "status" = {
      S = "PENDING"
    }
    "created_at" = {
      N = "0"
    }
    "products" = {
      L = []
    }
    "quantities" = {
      M = {}
    }
    "customer_id" = {
      S = "SYSTEM"
    }
    "total_amount" = {
      N = "0"
    }
    "updated_at" = {
      N = "0"
    }
  })

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_cloudwatch_metric_alarm" "dynamodb_throttled_requests" {
  count = var.enable_monitoring ? 1 : 0

  alarm_name          = "${var.table_name}-throttled-requests"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "ThrottledRequests"
  namespace           = "AWS/DynamoDB"
  period              = "300"
  statistic           = "Sum"
  threshold           = var.throttle_threshold
  alarm_description   = "This metric monitors DynamoDB throttled requests for ${var.table_name}"
  alarm_actions       = var.alarm_actions
  ok_actions          = var.alarm_actions

  dimensions = {
    TableName = aws_dynamodb_table.orders.name
  }

  tags = merge(
    var.tags,
    {
      "Name" = "${var.table_name}-throttled-requests"
    }
  )
}

resource "aws_cloudwatch_metric_alarm" "dynamodb_consumed_read_capacity" {
  count = var.enable_monitoring && var.billing_mode == "PROVISIONED" ? 1 : 0

  alarm_name          = "${var.table_name}-consumed-read-capacity"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "ConsumedReadCapacityUnits"
  namespace           = "AWS/DynamoDB"
  period              = "300"
  statistic           = "Average"
  threshold           = var.read_capacity_alarm_threshold
  alarm_description   = "This metric monitors DynamoDB consumed read capacity for ${var.table_name}"
  alarm_actions       = var.alarm_actions
  ok_actions          = var.alarm_actions

  dimensions = {
    TableName = aws_dynamodb_table.orders.name
  }

  tags = merge(
    var.tags,
    {
      "Name" = "${var.table_name}-consumed-read-capacity"
    }
  )
}

resource "aws_cloudwatch_metric_alarm" "dynamodb_consumed_write_capacity" {
  count = var.enable_monitoring && var.billing_mode == "PROVISIONED" ? 1 : 0

  alarm_name          = "${var.table_name}-consumed-write-capacity"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "ConsumedWriteCapacityUnits"
  namespace           = "AWS/DynamoDB"
  period              = "300"
  statistic           = "Average"
  threshold           = var.write_capacity_alarm_threshold
  alarm_description   = "This metric monitors DynamoDB consumed write capacity for ${var.table_name}"
  alarm_actions       = var.alarm_actions
  ok_actions          = var.alarm_actions

  dimensions = {
    TableName = aws_dynamodb_table.orders.name
  }

  tags = merge(
    var.tags,
    {
      "Name" = "${var.table_name}-consumed-write-capacity"
    }
  )
}

resource "aws_ssm_parameter" "dynamodb_table_name" {
  count = var.store_table_name_in_ssm ? 1 : 0

  name        = "/${var.project_name}/${var.environment}/dynamodb/table_name"
  description = "Nombre de la tabla DynamoDB de órdenes"
  type        = "String"
  value       = aws_dynamodb_table.orders.name
  tier        = "Standard"

  tags = merge(
    var.tags,
    {
      "Name" = "dynamodb-table-name"
    }
  )
}

resource "aws_ssm_parameter" "dynamodb_table_arn" {
  count = var.store_table_name_in_ssm ? 1 : 0

  name        = "/${var.project_name}/${var.environment}/dynamodb/table_arn"
  description = "ARN de la tabla DynamoDB de órdenes"
  type        = "String"
  value       = aws_dynamodb_table.orders.arn
  tier        = "Standard"

  tags = merge(
    var.tags,
    {
      "Name" = "dynamodb-table-arn"
    }
  )
}

// === ARCHIVO: infra/modules/dynamodb/outputs.tf ===
# Outputs del módulo DynamoDB
# Expone la información necesaria para que otros componentes
# consuman la tabla de órdenes

output "table_name" {
  description = "Nombre de la tabla DynamoDB"
  value       = aws_dynamodb_table.orders.name
}

output "table_arn" {
  description = "ARN completo de la tabla DynamoDB"
  value       = aws_dynamodb_table.orders.arn
}

output "table_id" {
  description = "ID único de la tabla DynamoDB"
  value       = aws_dynamodb_table.orders.id
}

output "table_status" {
  description = "Estado actual de la tabla (ACTIVE, CREATING, DELETING, UPDATING)"
  value       = aws_dynamodb_table.orders.table_status
}

output "table_stream_arn" {
  description = "ARN del stream de DynamoDB si está habilitado"
  value       = lookup(aws_dynamodb_table.orders, "stream_arn", null)
  nullable    = true
}

output "table_stream_label" {
  description = "Etiqueta del stream de DynamoDB"
  value       = lookup(aws_dynamodb_table.orders, "stream_label", null)
  nullable    = true
}

output "table_endpoint" {
  description = "Endpoint de la tabla DynamoDB"
  value       = "https://dynamodb.${var.region}.amazonaws.com"
}

output "table_region" {
  description = "Región donde está desplegada la tabla"
  value       = var.region
}

output "hash_key_attribute_name" {
  description = "Nombre del atributo de clave primaria (hash)"
  value       = var.hash_key
}

output "range_key_attribute_name" {
  description = "Nombre del atributo de clave de ordenamiento (range)"
  value       = var.range_key
  nullable    = true
}

output "global_secondary_indexes" {
  description = "Lista de índices secundarios globales configurados"
  value       = [for idx in aws_dynamodb_table.orders.global_secondary_index : {
    name           = idx.name
    hash_key       = idx.hash_key
    range_key      = idx.range_key
    projection_type = idx.projection_type
    status         = idx.status
  }]
}

output "local_secondary_indexes" {
  description = "Lista de índices secundarios locales configurados"
  value       = [for idx in aws_dynamodb_table.orders.local_secondary_index : {
    name           = idx.name
    range_key      = idx.range_key
    projection_type = idx.projection_type
  }]
}

output "ssm_parameter_table_name" {
  description = "Nombre del parámetro SSM que contiene el nombre de la tabla"
  value       = try(aws_ssm_parameter.dynamodb_table_name[0].name, null)
  nullable    = true
}

output "ssm_parameter_table_arn" {
  description = "Nombre del parámetro SSM que contiene el ARN de la tabla"
  value       = try(aws_ssm_parameter.dynamodb_table_arn[0].name, null)
  nullable    = true
}

output "alarm_throttled_requests_arn" {
  description = "ARN del alarm de requests throttleados"
  value       = try(aws_cloudwatch_metric_alarm.dynamodb_throttled_requests[0].arn, null)
  nullable    = true
}

output "alarm_consumed_read_capacity_arn" {
  description = "ARN del alarm de capacidad de lectura consumida"
  value       = try(aws_cloudwatch_metric_alarm.dynamodb_consumed_read_capacity[0].arn, null)
  nullable    = true
}

output "alarm_consumed_write_capacity_arn" {
  description = "ARN del alarm de capacidad de escritura consumida"
  value       = try(aws_cloudwatch_metric_alarm.dynamodb_consumed_write_capacity[0].arn, null)
  nullable    = true
}

output "billing_mode" {
  description = "Modo de facturación de la tabla (PAY_PER_REQUEST o PROVISIONED)"
  value       = var.billing_mode
}

output "read_capacity" {
  description = "Capacidad de lectura aprovisionada (si aplica)"
  value       = lookup(aws_dynamodb_table.orders, "read_capacity", null)
  nullable    = true
}

output "write_capacity" {
  description = "Capacidad de escritura aprovisionada (si aplica)"
  value       = lookup(aws_dynamodb_table.orders, "write_capacity", null)
  nullable    = true
}

output "table_tags" {
  description = "Tags aplicados a la tabla"
  value       = aws_dynamodb_table.orders.tags
}

output "dynamodb_table_item_schema" {
  description = "Validación del esquema de la tabla mediante item de prueba"
  value       = var.enable_schema_validation == true ? "Schema validation item created successfully" : "Schema validation disabled"
}

// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "app-items" "id"

```
