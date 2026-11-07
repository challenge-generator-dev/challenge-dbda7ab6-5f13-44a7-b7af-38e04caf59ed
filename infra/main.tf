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