# Portfolio: Cloud-Native Infrastructure & CI/CD Automation

## Project 2: Automated CI/CD for Frontend (S3 + CloudFront)

### Project Summary

Designed and implemented a production-grade CI/CD pipeline to automate the deployment of a React-based frontend application. By integrating **GitHub Actions** with **AWS S3** and **CloudFront**, I replaced manual deployment processes with an automated workflow, ensuring rapid, secure, and globally consistent content delivery.

### Why This Project Matters

In modern engineering, manual deployments are slow, error-prone, and a security risk. This project demonstrates:

* **Operational Excellence:** Changes are live within minutes of being pushed, significantly reducing time-to-market.
* **Global Performance:** Using CloudFront ensures that the application is served from edge locations, minimizing latency for end-users.
* **Security-First Mindset:** By leveraging GitHub Repository Secrets, I ensured that sensitive AWS credentials and resource IDs are never exposed in the source code.

### Technical Architecture

* **Frontend:** React (Vite-based build process).
* **Hosting:** AWS S3 (Static Website Hosting).
* **Content Delivery:** Amazon CloudFront (Global CDN for HTTPS and caching).
* **CI/CD Engine:** GitHub Actions (YAML-defined automation workflow).
* **Security:** AWS IAM (Least-Privilege model) & GitHub Repository Secrets.

### Key Implementation Steps

1. **IAM Configuration:** Created a dedicated AWS IAM user with specific, restricted permissions for S3 bucket synchronization and CloudFront invalidation.
2. **Secret Management:** Configured GitHub Repository Secrets to securely handle `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and deployment identifiers.
3. **Workflow Automation:** Engineered a `.github/workflows/deploy-frontend.yml` file to handle the entire lifecycle:
* **Checkout:** Pulls the latest code from the repository.
* **Build:** Executes `npm run build` to generate optimized production artifacts.
* **Sync:** Automatically pushes the generated `dist/` directory to the S3 bucket.
* **Invalidation:** Triggers a CloudFront cache invalidation, ensuring immediate global propagation of updates.


4. **Troubleshooting:** Resolved environmental mismatches (e.g., pathing discrepancies between `dist` and `build` folders) and authentication errors, resulting in a stable, reproducible deployment pipeline.

### Visual Proof
To make your **Visual Proof** section look like a professional case study, use these descriptive captions. They focus on **business value** and **technical competence**, which is what hiring managers look for.

---

### Visual Proof Section

**[Screenshot 1: The CI/CD "Green" Light]**
> ![GitHub Actions Dashboard](https://github.com/pitalsmith/aws-cloud-native-platform/blob/f94a8c00bbab1e484c5ba32d99e760f0ac4bbb20/docs/assets/CI_1_.jpg)

> **Caption:** "GitHub Actions Workflow Execution: A successful CI/CD pipeline run. This demonstrates the automation of build, test, and deployment processes, resulting in a 'green' status after every code commit."

**[Screenshot 2: AWS Resource Management]**
> ![GitHub Actions Dashboard](https://github.com/pitalsmith/aws-cloud-native-platform/blob/f94a8c00bbab1e484c5ba32d99e760f0ac4bbb20/docs/assets/S3_2_.jpg)
> > ![GitHub Actions Dashboard](https://github.com/pitalsmith/aws-cloud-native-platform/blob/f94a8c00bbab1e484c5ba32d99e760f0ac4bbb20/docs/assets/Cloudfront_2_.jpg)

> **Caption:** "AWS Infrastructure Configuration: A snapshot of the S3 bucket and CloudFront distribution settings. This highlights the architectural setup of static asset hosting combined with a Global CDN for low-latency delivery."

**[Screenshot 3: The Live Production Environment]**
> ![GitHub Actions Dashboard](https://github.com/pitalsmith/aws-cloud-native-platform/blob/f94a8c00bbab1e484c5ba32d99e760f0ac4bbb20/docs/assets/FrontendUI_3_.jpg)

> **Caption:** "Live Production Deployment: The final application running via the CloudFront distribution domain (`*.cloudfront.net`). This validates that the deployment pipeline successfully pushed the latest build and that global edge locations are serving the application."

**[Screenshot 4: Secure Secret Management]**
> ![GitHub Actions Dashboard](https://github.com/pitalsmith/aws-cloud-native-platform/blob/f94a8c00bbab1e484c5ba32d99e760f0ac4bbb20/docs/assets/Git_Secret_4_.jpg)

> **Caption:** "Infrastructure Security: A view of the GitHub Repository Secrets settings. This provides visual proof of security-first engineering, demonstrating that sensitive AWS credentials and IDs are encrypted and managed outside of the source code."



---

### Challenges Faced & Solutions

Every production-level deployment involves troubleshooting. These were the primary technical hurdles encountered during the development of this pipeline:

* **Authentication & Secrets Access:**
* *Challenge:* The pipeline initially failed with `null` values when accessing AWS credentials, caused by environment-specific scoping in GitHub Actions.
* *Solution:* Refactored the repository secrets to ensure they were correctly scoped at the environment level and verified the IAM user permissions followed the principle of least privilege.


* **Build Artifact Pathing:**
* *Challenge:* The deployment failed because the pipeline was hardcoded to look for a `/build` folder, but the project’s build tool (Vite) generated a `/dist` folder.
* *Solution:* Standardized the build process and updated the workflow YAML to dynamically sync the correct directory, improving the robustness of the CI/CD script.


* **CloudFront Distribution Resolution:**
* *Challenge:* The `NoSuchDistribution` error occurred because of a mismatch between the environment secret and the actual AWS CloudFront ID.
* *Solution:* Validated the CloudFront configuration in the AWS Console and sanitized the secret to ensure no trailing whitespaces were causing connectivity failures.



---

### Summary

This project represents a successful implementation of modern **DevOps principles**. By automating the deployment process, I transformed a manual, error-prone task into a streamlined, one-click (or zero-click) workflow.

This architecture not only ensures that the frontend application is **highly available and globally accessible** via CloudFront, but it also adheres to **industry-standard security practices** by keeping sensitive infrastructure credentials entirely out of the codebase. This foundation of automated infrastructure provides a reliable base upon which the backend and database components can be integrated, forming a fully cohesive, scalable 3-tier cloud application.

---
