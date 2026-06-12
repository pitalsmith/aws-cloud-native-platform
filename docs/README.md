# AWS Cloud-Native Platform 2

## **Scalable 3-Tier Infrastructure using Terraform, AWS EKS, and PostgreSQL**

---

# Project Overview

This project demonstrates the design and deployment of a **production-grade AWS cloud-native infrastructure** using **Terraform (Infrastructure as Code)**.

It implements a fully functional **3-tier architecture**:

* **Frontend Layer** (future: React app on S3 + CloudFront)
* **Backend Layer** (Node.js API running on AWS EKS)
* **Database Layer** (Multi AZ Amazon RDS PostgreSQL)
* **Networking Layer** (Custom VPC with public and private subnets)

The goal is to simulate a real-world **scalable cloud-native system** used in modern DevOps environments.

---

# Architecture Overview

## System Architecture


> ![GitHub Actions Dashboard](https://github.com/pitalsmith/aws-cloud-native-platform/blob/66cbf7d4e60620fd61f5ecc6f7080f9361302e29/docs/assets/AWS%20Native%20Cloud1.drawio.svg)

---

## Network Architecture

```text id="r4x0b3"
VPC (10.0.0.0/16)
│
├── Public Subnets
│   ├── Application Load Balancer
│   ├── NAT Gateway
│
├── Private Subnets
│   ├── EKS Worker Nodes
│   ├── RDS Database
```

---

# Tech Stack

* Terraform (Infrastructure as Code)
* AWS EKS (Kubernetes)
* AWS RDS (PostgreSQL)
* AWS VPC Networking
* AWS ALB (Load Balancer)
* IAM (Identity & Access Management)
* Kubernetes (Container Orchestration)

---

# Infrastructure Components

## 1. Networking Layer

* Custom VPC (10.0.0.0/16)
* Public and Private Subnets across multiple AZs
* Internet Gateway for public access
* NAT Gateway for private subnet outbound traffic
* Route Tables for traffic control

---

## 2. Kubernetes Layer (EKS)

* Managed Kubernetes Cluster
* EC2 Worker Node Group (Auto Scaling)
* Core system pods (CoreDNS, kube-proxy, AWS CNI)
* IAM role-based node authentication
* Multi-AZ deployment for high availability

---

## 3. Backend Layer

* Node.js API deployed on Kubernetes
* Managed via Terraform Kubernetes provider
* Exposed via AWS Application Load Balancer
* Multiple pods for scalability and fault tolerance

---

## 4. Database Layer

* Amazon RDS PostgreSQL instance
* Deployed inside private subnet
* No public internet access
* Secure backend-to-database communication

---

# Visual Proof of Deployment

## EKS Cluster

### Cluster Overview (AWS Console)

> The EKS cluster is successfully deployed and in ACTIVE state, confirming the managed Kubernetes control plane is operational.
> ![GitHub Actions Dashboard](https://github.com/pitalsmith/aws-cloud-native-platform/blob/a40d4b243ad49ddd4da594caa73808787b6f1c36/docs/assets/eks_cluster.JPG)

---

### Worker Nodes

> Two worker nodes are successfully registered and connected to the Kubernetes cluster, confirming proper IAM configuration and cluster-node communication.
> ![GitHub Actions Dashboard](https://github.com/pitalsmith/aws-cloud-native-platform/blob/a40d4b243ad49ddd4da594caa73808787b6f1c36/docs/assets/Nodes_2.JPG)

---

## Kubernetes Workloads

### Pods Running

```bash id="p7lj2z"
kubectl get pods -A
```

> All Kubernetes system and application pods are running successfully, including backend API pods and core system services (CoreDNS, kube-proxy, AWS CNI).
> ![GitHub Actions Dashboard](https://github.com/pitalsmith/aws-cloud-native-platform/blob/a40d4b243ad49ddd4da594caa73808787b6f1c36/docs/assets/Nodes_1.JPG)

---

### Nodes Status

```bash id="4s5m0x"
kubectl get nodes
```

> Kubernetes worker nodes are fully operational and in Ready state.
> ![GitHub Actions Dashboard](https://github.com/pitalsmith/aws-cloud-native-platform/blob/a40d4b243ad49ddd4da594caa73808787b6f1c36/docs/assets/Nodes_1b.JPG)

---

## Load Balancer

### ALB Dashboard


> Application Load Balancer routes traffic to backend services running in EKS.
> ![GitHub Actions Dashboard](https://github.com/pitalsmith/aws-cloud-native-platform/blob/a40d4b243ad49ddd4da594caa73808787b6f1c36/docs/assets/ALB.JPG)

---

## Multi AZ Database (RDS PostgreSQL)

### RDS Instance


> PostgreSQL database is deployed in a private subnet and securely accessed by backend services.
> ![GitHub Actions Dashboard](https://github.com/pitalsmith/aws-cloud-native-platform/blob/eb8bb3faa4b2f161a3e86f162297ffe4b324dfbf/docs/assets/a2.JPG)
>  ![GitHub Actions Dashboard](https://github.com/pitalsmith/aws-cloud-native-platform/blob/eb8bb3faa4b2f161a3e86f162297ffe4b324dfbf/docs/assets/a1.JPG)
> > Instance endpoint
> ![GitHub Actions Dashboard](https://github.com/pitalsmith/aws-cloud-native-platform/blob/4781a6c9579916f305708e9c30f1fe699d638d0c/docs/assets/RDS_endpoint.JPG)

---

## Network Infrastructure

### VPC Layout

> > ![GitHub Actions Dashboard](https://github.com/pitalsmith/aws-cloud-native-platform/blob/62c3445692a85cabf992ab9cefb3726b9f07274e/docs/assets/vpc_1.JPG)

---

# How to Run This Project

## 1. Clone Repository

```bash id="z8q2v1"
git clone https://github.com/pitalsmith/aws-cloud-native-platform.git
cd aws-cloud-native-platform/terraform/environments/dev
```

---

## 2. Configure AWS Credentials

```bash id="a1b2c3"
aws configure
```

---

## 3. Initialize Terraform

```bash id="t4r5f6"
terraform init
```

---

## 4. Validate Configuration

```bash id="v7w8x9"
terraform validate
```

---

## 5. Preview Deployment

```bash id="p0q1r2"
terraform plan
```

---

## 6. Deploy Infrastructure

```bash id="d3e4f5"
terraform apply -auto-approve
```

---

## 7. Verify Kubernetes Cluster

```bash id="k8s123"
kubectl get nodes
kubectl get pods -A
```

---

## 8. Destroy Infrastructure (Optional)

```bash id="destroy1"
terraform destroy -auto-approve
```

---

# Final Outcome

✔ Fully deployed AWS cloud-native infrastructure
✔ Working Kubernetes cluster with active nodes
✔ Backend API successfully running on EKS
✔ PostgreSQL database deployed in private subnet
✔ Application Load Balancer routing traffic externally
✔ Secure multi-tier AWS architecture implemented

---

# Key Learnings

* AWS EKS cluster design and deployment
* Kubernetes workload management
* Infrastructure as Code with Terraform
* IAM roles and security policies
* VPC networking (public/private architecture)
* Debugging real-world cloud infrastructure issues

---

# Key Engineering Challenges

## 1. EKS Node Group Registration Failure

Worker nodes initially failed to join the Kubernetes cluster.

**Solution:** Correct IAM roles and AWS EKS policies fixed authentication issues.

---

## 2. Terraform State Drift & Conflicts

Infrastructure mismatches caused deployment inconsistencies.

**Solution:** Resolved state alignment issues with AWS resources.

---

## 3. AWS Service Constraints (RDS & Networking)

Issues with PostgreSQL versions, reserved usernames, and NAT route conflicts.

**Solution:** Adjusted configuration to comply with AWS service limitations.

---

## 4. Kubernetes Authentication Issue

Initial restricted access to cluster resources.

**Solution:** Configured `aws-auth` ConfigMap for IAM-to-Kubernetes mapping.

---

# Summary

This project demonstrates a complete **end-to-end cloud-native AWS architecture**, built using Terraform and modern DevOps practices.

It simulates real production infrastructure used in scalable applications and distributed systems.

---
