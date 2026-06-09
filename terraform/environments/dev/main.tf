provider "aws" {
  region = "us-east-1"
}

module "network" {
  source = "../../modules/network"

  cidr            = "10.0.0.0/16"
  public_subnets  = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnets = ["10.0.11.0/24", "10.0.12.0/24"]
}

module "security" {
  source = "../../modules/security"
  vpc_id = module.network.vpc_id
}

module "eks" {
  source = "../../modules/eks"

  cluster_name = "dev-eks"
  role_arn     = "arn:aws:iam::763054201983:role/eks-cluster-admin-role"

  subnet_ids = module.network.private_subnet_ids
}

module "loadbalancer" {
  source     = "../../modules/loadbalancer"
  subnet_ids = module.network.public_subnet_ids
  sg_id      = module.security.sg_id
}

module "database" {
  source = "../../modules/database"

  db_name  = "appdb"
  username = "admin"
  password = "password123"

  subnet_ids = module.network.private_subnet_ids
}

module "frontend" {
  source      = "../../modules/frontend"
  bucket_name = "dev-frontend-bucket"
}

module "backend" {
  source = "../../modules/backend"

  name  = "backend-api"
  image = "nginx:latest"
}