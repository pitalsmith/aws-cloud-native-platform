# Cloud Infrastructure Portfolio (Terraform | AWS | DevOps)

This repository contains a collection of **real-world cloud infrastructure projects built using Terraform on AWS**.

Each project is isolated in its own **Git branch**, demonstrating Cloud DevOps engineering skills including networking, CI/CD automation, Kubernetes (EKS), frontend delivery, backend deployment, and database architecture.

---

# Available Projects

## Project 1: 3-Tier AWS Infrastructure (Dev Environment)

A modular **3-tier architecture on AWS** built with Terraform.

### Includes:

* VPC with public & private subnets (Multi-AZ design)
* Application Load Balancer (ALB)
* Backend-ready infrastructure layer
* Amazon RDS (PostgreSQL in private subnet)
* Security groups and IAM roles
* Modular Terraform design

### Architecture Focus:

* Infrastructure as Code (Terraform)
* Secure network segmentation
* Scalable system architecture
* Database isolation in private subnet

### 🔗 View Project

Branch:

```text id="p1"
project-1-3tier-aws-infrastructure
```

---

## Project 2: CI/CD for Frontend (S3 + CloudFront)

A fully automated **frontend deployment pipeline** using CI/CD with AWS S3 and CloudFront.

### Includes:

* CI/CD pipeline (GitHub Actions / Jenkins)
* Automated build & deployment of frontend assets
* Amazon S3 for frontend hosting
* CloudFront CDN for global distribution
* Cache invalidation automation
* Secure deployment workflow

### Architecture Focus:

* Continuous Integration & Deployment
* Automated frontend delivery pipeline
* Global content delivery via CDN
* Secure and repeatable deployments

### 🔗 View Project

Branch:

```text id="p2"
project-2-frontend-ci-cd-s3-cloudfront
```

---

## Project 3: EKS Backend Deployment + Database

A production-style **containerized backend system deployed on Kubernetes (EKS)** with a managed database layer.

### Includes:

* AWS EKS cluster (managed Kubernetes)
* Backend deployment (containerized services)
* Kubernetes deployments & services
* Auto-scaling configuration (HPA-ready)
* Amazon RDS database (PostgreSQL/MySQL)
* Private subnet database architecture
* IAM roles for service access (IRSA-ready)

### Architecture Focus:

* Kubernetes-based backend deployment
* Scalable microservices architecture
* Secure database integration
* Cloud-native application design

### 🔗 View Project

Branch:

```text id="p3"
project-3-eks-backend-database
```

---

## Project 4: Multi-Environment Infrastructure

Dev, staging, and production infrastructure management using Terraform.

### 🔧 Includes:

* Environment separation (dev/staging/prod)
* Remote Terraform state (S3 + DynamoDB locking)
* Infrastructure promotion workflow
* Reusable modular architecture

### 🔗 View Project

Branch:

```text id="p4"
project-4-multi-env-infra
```

---

## Project 5: Monitoring & Observability Stack

Infrastructure monitoring and logging system.

### 🔧 Includes:

* Prometheus monitoring
* Grafana dashboards
* AWS CloudWatch integration
* Centralized logging architecture

### 🔗 View Project

Branch:

```text id="p5"
project-5-monitoring-observability
```

---

# Architecture Principles Used

* Infrastructure as Code (Terraform)
* CI/CD automation workflows
* Cloud-native Kubernetes architecture
* Modular and reusable infrastructure design
* Security-first architecture (least privilege IAM)
* High availability and scalability principles

---

#  How to Navigate This Repo

Each project is isolated in its own branch:

```text id="nav1"
main → portfolio index (this README)
project-1-* → 3-tier infrastructure
project-2-* → frontend CI/CD (S3 + CloudFront)
project-3-* → EKS backend + database
project-4-* → multi-environment infra
project-5-* → monitoring & observability
```

---

#  Author

**Peter Atunde O**

Cloud DevOps Engineer | AWS | Terraform | Kubernetes

---

# 📌 Note

This repository is continuously evolving with production-grade cloud infrastructure projects designed to demonstrate real-world DevOps and Cloud Architecture expertise.

