# Providers de Terraform para el despliegue en AWS
# Configura el provider AWS con la versión especificada y la región por defecto

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.51.1"
    }
  }
  required_version = ">= 1.7.0"
}

provider "aws" {
  region = var.aws_region
  # Las credenciales se configuran mediante variables de entorno o AWS CLI
  # No se hardcodean en el código por seguridad
  default_tags {
    tags = {
      Environment = var.environment
      Terraform   = "true"
      Project     = var.project_name
    }
  }
}

# Variables utilizadas en el provider
variable "aws_region" {
  description = "Región de AWS donde se desplegarán los recursos"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Entorno de despliegue (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "project_name" {
  description = "Nombre del proyecto para etiquetar recursos"
  type        = string
  default     = "order-management"
}