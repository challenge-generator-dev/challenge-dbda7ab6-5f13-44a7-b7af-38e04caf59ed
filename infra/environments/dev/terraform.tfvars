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