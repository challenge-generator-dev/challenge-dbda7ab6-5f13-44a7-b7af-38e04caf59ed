# Implementación de operaciones CRUD en DynamoDB

El sistema de gestión de órdenes de una plataforma de comercio electrónico requiere la implementación de operaciones CRUD sobre una tabla DynamoDB. La tabla almacenará información sobre órdenes de compra, incluyendo ID de orden, productos, cantidades y estado de la orden. El objetivo es exponer estas operaciones a través de una API REST para que otros sistemas puedan interactuar con la base de datos de órdenes.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | CRUD de ordenes sobre DynamoDB |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Configuración y creación de la tabla DynamoDB

**Objetivo:** Configurar DynamoDB y crear la tabla de órdenes.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Configura DynamoDB para que esté disponible para el desarrollo de la API REST.
- Crea una tabla en DynamoDB con los atributos necesarios para almacenar información de las órdenes (ID de orden, productos, cantidades, estado).

**Entregable:** Tabla DynamoDB creada y configurada con los atributos necesarios.

<details>
<summary>Pistas de conocimiento</summary>

- Considera las claves primarias y secundarias necesarias para la tabla.
- Piensa en la estructura de datos que mejor se adapte a las operaciones CRUD.

</details>

### Fase 2: Implementación de operaciones CRUD

**Objetivo:** Implementar las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en la API REST.

**Tiempo estimado:** 4 horas

**Instrucciones:**

- Implementa las operaciones CRUD en la API REST para interactuar con la tabla DynamoDB.
- Asegúrate de que las operaciones sean idempotentes y manejen correctamente los errores.

**Entregable:** API REST con operaciones CRUD implementadas y funcionales.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza el marco de trabajo del lenguaje principal para implementar las operaciones.
- Considera el manejo de errores y la idempotencia en las operaciones CRUD.

</details>

### Fase 3: Pruebas y optimización

**Objetivo:** Realizar pruebas unitarias y de integración para validar las operaciones CRUD y optimizar el rendimiento de la API.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Realiza pruebas unitarias y de integración para validar las operaciones CRUD implementadas.
- Optimiza el rendimiento de la API, considerando la estructura de datos y las operaciones realizadas en DynamoDB.

**Entregable:** API REST con pruebas unitarias y de integración realizadas y rendimiento optimizado.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza las herramientas de trabajo del candidato para depurar y probar la API.
- Considera la estructura de datos y las operaciones realizadas en DynamoDB para optimizar el rendimiento.
- Terraform: Herramienta de trabajo del candidato: usala en la fase donde se depura o se prueba la solucion (no es una dependencia del proyecto).

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es una operación CRUD y cómo se implementa en una API REST?
- **paraQueSirve**: ¿Para qué sirve cada operación CRUD en el contexto de una tabla DynamoDB?
- **comoSeUsa**: ¿Cómo se usa DynamoDB para almacenar y recuperar información de órdenes en una API REST?
- **erroresComunes**: ¿Cuáles son los errores comunes al implementar operaciones CRUD en una API REST y cómo se manejan?
- **queDecisionesImplica**: ¿Qué decisiones implica la implementación de operaciones CRUD en una API REST expuesta por DynamoDB?

## Criterios de Evaluacion

- Configuración y creación de la tabla DynamoDB.
- Implementación de operaciones CRUD en la API REST.
- Pruebas unitarias y de integración realizadas.
- Rendimiento de la API optimizado.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

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

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
(cd app && npm install && npm run build) && (cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate) && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
