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