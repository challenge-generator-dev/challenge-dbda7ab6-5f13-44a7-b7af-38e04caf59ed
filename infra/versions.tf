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