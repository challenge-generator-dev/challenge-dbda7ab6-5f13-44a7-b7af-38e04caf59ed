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