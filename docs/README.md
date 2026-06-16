# Ledger: Secure 3-Tier Financial Web Application

## Overview

**Ledger** is a production-grade, 3-tier financial web application designed to demonstrate secure transaction management in a cloud-native AWS environment. The application enables users to manage account balances with real-time accuracy, ensuring strict data integrity through ACID-compliant database transactions.

---

## Why This Project Matters

In modern cloud engineering, connecting services securely is as critical as the application logic. **Ledger** addresses enterprise-level challenges:

* **Securing Distributed Traffic:** Engineered a private-to-public architecture where the backend is shielded from the internet, accessible only via a hardened CloudFront/Load Balancer proxy.
* **Solving Caching Complexities:** Implemented custom CloudFront `CachingDisabled` policies to ensure real-time data consistency, preventing "stale data" common in distributed systems.
* **Enterprise-Grade Consistency:** Utilized PostgreSQL transaction management (`BEGIN/COMMIT`) to ensure financial data remains consistent during concurrent operations.
* **DevOps Automation:** Automated the full lifecycle via CI/CD, reducing human error and deployment downtime.

---

## Technical Stack

* **Frontend:** React (TypeScript), Amazon S3, Amazon CloudFront.
* **Backend:** Node.js, Express, Docker.
* **Infrastructure:** Amazon EKS (Kubernetes), AWS EC2 (Worker Nodes), AWS RDS (PostgreSQL).
* **Registry:** Amazon ECR (Elastic Container Registry).
* **CI/CD:** GitHub Actions.

---

## 📸 Project Screenshots

### Infrastructure & Deployment

* **GitHub Actions (CI/CD)**
* *Caption:* Automated pipeline showing successful build and push to ECR.


* **Amazon ECR (Container Registry)**
* *Caption:* Repository view showing versioned Docker images.


* **Amazon EKS (Kubernetes)**
* *Caption:* `kubectl get pods -o wide` showing containers running across worker nodes.


* **EC2 Nodes (Worker Nodes)**
* *Caption:* EC2 console showing instances powering the EKS cluster.


* **Amazon CloudFront**
* *Caption:* Behavior settings showing the `/api/*` path with `CachingDisabled`.


* **Amazon S3**
* *Caption:* S3 bucket contents hosting the React production build.



### Application & Data

* **Ledger Dashboard**
* *Caption:* The production UI showing real-time account balance and transaction status.


* **Database Verification**
* *Caption:* Terminal output of a custom Node.js script querying the RDS PostgreSQL instance directly from the backend pod.



---

## Architecture Highlights

* **Reverse Proxying:** Configured CloudFront to proxy `/api/*` requests directly to the Load Balancer, eliminating "Mixed Content" security errors.
* **Cache Strategy:** Implemented `CachingDisabled` policies on API routes to ensure real-time integrity while maintaining CDN performance for static assets.
* **Network Security:** Utilized AWS IAM roles and Security Groups to restrict database access, ensuring the RDS instance is never publicly reachable from the internet.

---

## 🛠 Challenges & Solutions
* **Challenge: API Cache Stale Data** *

* **Problem:** * CloudFront was caching the /api/balance responses, causing users to see old account balances even after a successful transaction.

* **Solution:** * I configured a custom CloudFront Cache Policy with CachingDisabled specifically for the /api/* path. This forced the CDN to pass requests directly to the origin, ensuring 100% data freshness for all transactions.



* **Challenge:** * Missing Database CLI Tools

* **Problem:**  My container image was "slim" (for security), meaning psql was not available to verify production data.

* **Solution:**  Instead of bloating the image, I utilized a Node.js runtime script executed within the Kubernetes pod (kubectl exec) to query the database using the internal application environment variables. This allowed for secure data verification without compromising container security.

* **Challenge:**  Managing Database Connectivity

* **Problem:**  Initial connection failures between the EKS pods and RDS due to VPC Security Group restrictions.

* **Solution:**  I reconfigured the RDS Inbound Rules to explicitly allow traffic from the Security Group ID assigned to the EKS worker nodes, creating a secure, isolated communication path within the private subnet.


---

## How to Run This Project

### Prerequisites

* **AWS CLI** configured with appropriate permissions.
* **`kubectl`** installed and configured to point to your EKS cluster.
* **Node.js (v18+)** for local development.

### 1. Clone the Repository

```bash
git clone https://github.com/pitalsmith/aws-cloud-native-platform.git
cd aws-cloud-native-platform/app

```

### 2. Environment Configuration

Create a `.env` file in the `app/` directory with the following variables:

```bash
DB_HOST=<your-rds-endpoint>
DB_USER=<your-db-username>
DB_PASSWORD=<your-db-password>
DB_NAME=<your-db-name>
PORT=5000

```

### 3. Deploy to Kubernetes

Ensure your `kubectl` context is set to your EKS cluster, then apply the manifests:

```bash
# Apply the Secret (ensure you have created this in K8s first)
kubectl apply -f k8s/secrets.yaml

# Apply the Deployment
kubectl apply -f k8s/deployment.yaml

# Apply the Service
kubectl apply -f k8s/service.yaml

```

### 4. Verify Deployment

Monitor the rollout status of your backend:

```bash
# Watch pods transition to 'Running'
kubectl get pods -w

# Verify the deployment rollout
kubectl rollout status deployment/nodejs-backend

```

### 5. Access the Application

Retrieve your Load Balancer URL:

```bash
kubectl get svc nodejs-backend

```

Copy the `EXTERNAL-IP` and navigate to `http://<EXTERNAL-IP>:80` in your browser.

---


## Future Enhancements

* **Authentication:** Integration with Amazon Cognito for secure User Login and JWT-based session management.
* **Monitoring:** Adding Prometheus and Grafana for real-time observability of pod health and transaction latency.

---
