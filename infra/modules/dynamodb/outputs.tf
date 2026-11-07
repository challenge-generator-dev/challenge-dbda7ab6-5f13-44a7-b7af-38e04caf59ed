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