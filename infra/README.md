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