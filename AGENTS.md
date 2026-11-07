# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Implementación de operaciones CRUD en DynamoDB**.

| | |
|---|---|
| Tema | CRUD de ordenes sobre DynamoDB |
| Nivel | advanced-l2 |
| Chapter | Backend |
| Especialidad | Node |
| Stack | TypeScript / Express 4.19.2 |
| Patron arquitectonico | capas estándar (dominio, aplicación, infraestructura) |
| Tiempo estimado | 8 horas |

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

## Receta del stack

Esqueleto obligatorio:

- `package.json y tsconfig.json en la raiz`
- `src/main.ts como bootstrap`
- `src/domain con entidades y puertos`
- `src/application con casos de uso`
- `src/infrastructure con repositorios y controller`
- `Express como framework (vinculante: no mezcles otro framework del mismo ecosistema)`

Trampas conocidas:

- No inventes versiones de npm. Usa rango con caret (`^5.7.2`) sobre una version que exista, o deja que el paquete la resuelva. Una version inexistente (ej. `@types/react-router-dom@6.19.0`) hace fallar `npm install` con ETARGET y el proyecto no instala.
- Los paquetes `@types/*` solo hacen falta para librerias que no traen sus propios tipos. React Router, NestJS y Prisma ya los traen: agregar `@types/` de esos rompe o sobra.
- El `tsconfig.json` es obligatorio: sin el, `tsc` no sabe que compilar.

Dependencias:

- express 4.19.2
- @types/express 4.17.21
- typescript 5.7.0-dev.20241007
- ts-node 10.9.2
- @types/node 22.5.0
- aws-sdk 2.1691.0
- dotenv 16.4.5
- jest 29.7.0
- @types/jest 29.5.12
- supertest 7.0.0
- @types/supertest 6.0.2
- ts-jest 29.2.4

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Segui el orden de arranque del mapa de componentes (infraestructura local primero) y corre `(cd app && npm install && npm run build) && (cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate) && docker compose config -q` desde la raiz: mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `(cd app && npm install && npm run build) && (cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate) && docker compose config -q` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Configuración y creación de la tabla DynamoDB**: Tabla DynamoDB creada y configurada con los atributos necesarios.
- **Fase 2 — Implementación de operaciones CRUD**: API REST con operaciones CRUD implementadas y funcionales.
- **Fase 3 — Pruebas y optimización**: API REST con pruebas unitarias y de integración realizadas y rendimiento optimizado.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Superficie de practica (NO completes)

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs. No toques la logica que el reto pide completar.

- [ ] `app/test/unit/OrderService.test.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.
- [ ] `app/test/integration/OrderController.test.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.

## Lo que falta y tenes que completar

### 1. Boilerplate del stack (1)

Sin esto el proyecto no compila ni arranca. **Es tu trabajo crearlo**, y no toca nada de lo pedagogico: es andamiaje del stack.

- [ ] **app/src/app.module.ts** — Sin el modulo raiz, Nest no tiene arbol de dependencias que resolver y el bootstrap falla.

### 2. Referencias colgando (2)

Salieron de un analisis estatico del codigo que SI esta en el repo. Cada una rompe la compilacion:

- [ ] `app/src/interfaces/controllers/OrderController.ts` — `Order.toDTO`
      Se invoca `toDTO` sobre `Order`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `app/src/interfaces/controllers/OrderController.ts` — `OrderService.getOrderById`
      Se invoca `getOrderById` sobre `OrderService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

### Presentes (30)

- `app/package.json`
- `app/tsconfig.json`
- `app/src/main.ts`
- `app/src/domain/models/Order.ts`
- `app/src/domain/repositories/OrderRepository.ts`
- `app/src/infrastructure/dynamodb/DynamoDBOrderRepository.ts`
- `app/src/interfaces/controllers/OrderController.ts`
- `app/src/interfaces/routes/orderRoutes.ts`
- `app/src/interfaces/middlewares/errorHandler.ts`
- `app/src/application/services/OrderService.ts`
- `app/src/infrastructure/config/awsConfig.ts`
- `app/test/unit/OrderService.test.ts`
- `app/test/integration/OrderController.test.ts`
- `app/.env.example`
- `app/README.md`
- `infra/environments/dev/terraform.tfvars`
- `infra/providers.tf`
- `infra/variables.tf`
- `infra/modules/dynamodb/variables.tf`
- `infra/versions.tf`
- `infra/main.tf`
- `infra/outputs.tf`
- `infra/terraform.tfvars.example`
- `infra/README.md`
- `infra/environments/dev/terraform.tfvars.example`
- `infra/modules/dynamodb/main.tf`
- `infra/modules/dynamodb/outputs.tf`
- `docker-compose.yml`
- `infra-local/README.md`
- `infra-local/dynamodb/create-tables.sh`

### Capas del patron declarado

Cada una tiene que existir como directorio real con al menos un archivo. Codigo plano en la raiz no satisface el patron.

- `app`
- `app/src/domain/models`
- `app/src/domain/repositories`
- `app/src/application/services`
- `app/src/infrastructure/dynamodb`
- `app/src/infrastructure/config`
- `app/src/interfaces/controllers`
- `app/src/interfaces/routes`
- `app/src/interfaces/middlewares`
- `app/test/unit`
- `app/test/integration`
- `infra`
- `infra/modules/dynamodb`

## Verificacion

```bash
(cd app && npm install && npm run build) && (cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate) && docker compose config -q
```

El comando tiene que pasar SIN implementar los archivos de la superficie de practica: solo andamiaje.

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- Cada componente vive en su carpeta: instala y compila dentro de ella, y no muevas archivos entre componentes.
- Respeta los contratos entre componentes (endpoints, topics) tal como estan declarados en el mapa de componentes.
- El patron es **capas estándar (dominio, aplicación, infraestructura)**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced L2
- Brecha que el reto ataca: CRUD de ordenes en DynamoDB expuesto por una API REST (corrida e2e 20261106212220607), Implementa operaciones CRUD de ordenes sobre una tabla DynamoDB expuestas por una API REST
- Mision: Persistir y consultar ordenes

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
