# Frontend Microservice CI Pipeline Setup Guide

## 📋 Prerequisites

1. **GitHub Account** with a repository for your Vite frontend project
2. **DockerHub Account** - Sign up at [hub.docker.com](https://hub.docker.com)
3. **Vite Application** with `package.json` and proper build scripts

## 🔧 Step-by-Step Setup Instructions

### Step 1: Create DockerHub Access Token

1. Go to [DockerHub](https://hub.docker.com)
2. Click on your **profile** → **Account Settings**
3. Navigate to **Security** → **New Access Token**
4. Name it: `github-actions-token`
5. **Access Permissions:** Select **Read, Write, Delete** (or **Read & Write** if available)
   - This allows the CI pipeline to push (write) images to your repositories
   - Read permission is needed to check existing images
6. Copy the generated token (you won't see it again!)

### Step 2: Add GitHub Secrets

1. Go to your GitHub repository (e.g., `github.com/yourusername/your-repo`)
2. Click on the **Settings** tab (top navigation bar, near the right side)
   - ⚠️ **Note:** You need admin/write access to the repository to see this tab
3. In the left sidebar, scroll down to the **Security** section
4. Click on **Secrets and variables** → then click **Actions**
5. Click the green **New repository secret** button
6. Add these two secrets:

   **Secret 1:**
   - Name: `DOCKERHUB_USERNAME`
   - Value: Your DockerHub username (e.g., `johndoe`)

   **Secret 2:**
   - Name: `DOCKERHUB_TOKEN`
   - Value: The access token you copied from Step 1

### Step 3: Update the Workflow File

Edit `.github/workflows/docker-build-push.yml` and replace:

```yaml
DOCKER_IMAGE_NAME: your-dockerhub-username/vite-frontend
```

With your actual DockerHub username:

```yaml
DOCKER_IMAGE_NAME: johndoe/vite-frontend
```

### Step 4: Verify Your Project Structure

Make sure your project has:

```
your-repo/
├── .github/
│   └── workflows/
│       └── docker-build-push.yml
├── src/
├── public/
├── package.json
├── Dockerfile
├── nginx.conf
├── .dockerignore
└── vite.config.js (or .ts)
```

### Step 5: Ensure package.json Has Build Script

Your `package.json` should include:

```json
{
  "scripts": {
    "build": "vite build"
  }
}
```

### Step 6: Push to GitHub

```bash
git add .
git commit -m "Add Docker and GitHub Actions CI pipeline"
git push origin main
```

## 🚀 How It Works

### Automatic Triggers

The pipeline runs automatically when:
- ✅ You push to `main` or `develop` branches
- ✅ You create a pull request to `main`
- ✅ You push a tag starting with `v` (e.g., `v1.0.0`)
- ✅ You manually trigger it from GitHub Actions tab

### Docker Image Tags

The workflow automatically creates multiple tags:

| Trigger | Tags Generated |
|---------|----------------|
| Push to `main` | `latest`, `main`, `main-<sha>` |
| Push to `develop` | `develop`, `develop-<sha>` |
| Tag `v1.2.3` | `1.2.3`, `1.2`, `v1.2.3` |
| PR #42 | `pr-42` |

### Environment Variable

The `VITE_API_URL` is set to `https://api.prod.example.com` by default.

To change it:
1. Edit the workflow file's `env` section, OR
2. Add it as a GitHub secret and reference it as `${{ secrets.VITE_API_URL }}`

## 🧪 Testing Locally

### Build the Docker image locally:

```bash
docker build \
  --build-arg VITE_API_URL=https://api.prod.example.com \
  -t vite-frontend:local .
```

### Run the container:

```bash
docker run -p 8080:80 vite-frontend:local
```

Visit: http://localhost:8080

## 🔍 Monitoring the Pipeline

1. Go to your GitHub repository
2. Click on the **Actions** tab
3. Click on the latest workflow run
4. Monitor each step's progress and logs

## 📦 Pulling Your Image

Once pushed, anyone can pull your image:

```bash
docker pull your-dockerhub-username/vite-frontend:latest
```

## 🛠️ Troubleshooting

### Build Fails - "npm run build not found"
- Ensure `package.json` has a `build` script
- Check that all dependencies are listed in `package.json`

### Authentication Failed
- Verify `DOCKERHUB_USERNAME` is correct (case-sensitive)
- Regenerate DockerHub token if needed
- Check secrets are added to the correct repository

### Image Not Updating
- Check the workflow run completed successfully
- Verify you're pulling the correct tag
- Try pulling with the SHA tag to get the latest build

### Vite Build Errors
- Ensure `VITE_API_URL` is properly set
- Check your Vite config doesn't have conflicting settings
- Review build logs in GitHub Actions

## 🎯 Different Environments

To support multiple environments (dev, staging, prod):

**Option 1: Use separate workflows**
```yaml
# .github/workflows/deploy-production.yml
env:
  VITE_API_URL: https://api.prod.example.com

# .github/workflows/deploy-staging.yml
env:
  VITE_API_URL: https://api.staging.example.com
```

**Option 2: Use GitHub Environments**
1. Settings → Environments → New environment
2. Add environment-specific secrets
3. Update workflow to use environment

## ✅ Success Indicators

You'll know everything works when:
- ✅ GitHub Actions workflow shows green checkmark
- ✅ Your image appears on DockerHub
- ✅ You can pull and run the image locally
- ✅ The app loads and connects to the correct API URL

## 📝 Next Steps

Consider adding:
- [ ] Vulnerability scanning (Trivy, Snyk)
- [ ] Image signing (Docker Content Trust)
- [ ] Deploy to Kubernetes/Cloud Run
- [ ] Automated testing before build
- [ ] Slack/Discord notifications

---

**Need help?** Check the GitHub Actions logs for detailed error messages.
