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