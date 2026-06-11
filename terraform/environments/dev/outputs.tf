output "vpc_id" {
  value = module.network.vpc_id
}

output "alb_dns" {
  value = module.loadbalancer.dns
}

output "db_endpoint" {
  value = module.database.endpoint
}

output "eks_cluster_name" {
  value = module.eks.cluster_name
}

output "ecr_repository_url" {
  value = module.ecr.repository_url
}