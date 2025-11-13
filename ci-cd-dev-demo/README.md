# CI/CD Pipeline Demo

Complete CI/CD pipeline using Jenkins, Docker, and Docker Compose.

## Architecture

```
Code Push → Jenkins Pipeline → Build → Test → Docker Image → Deploy → Health Check
```

## Components

- **Demo App**: Simple Node.js/Express web server
- **Jenkins**: CI/CD orchestration with declarative pipeline
- **Docker**: Container packaging
- **Docker Compose**: Local deployment

## Quick Start

### Option 1: Run with Jenkins (Full CI/CD)

```bash
# Start Jenkins in Docker
docker run -d -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --name jenkins \
  jenkins/jenkins:lts

# Get admin password
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword

# Access Jenkins at http://localhost:8080
# Create pipeline job pointing to this repo
# Run the pipeline
```

### Option 2: Run Manually (Without Jenkins)

```bash
# Install dependencies
cd app && npm install

# Run tests
npm test

# Build and deploy
docker-compose up -d

# Check health
./healthcheck.sh
```

## Endpoints

- **Home**: http://localhost:3000/
- **Health**: http://localhost:3000/health
- **Info**: http://localhost:3000/api/info

## Pipeline Stages

1. **Checkout** - Get code from repository
2. **Build** - Install npm dependencies
3. **Test** - Run Jest unit tests
4. **Package** - Build Docker image
5. **Deploy** - Start container with docker-compose
6. **Health Check** - Verify app is running

## Files

- `Jenkinsfile` - Declarative pipeline definition
- `Dockerfile` - Container image specification
- `docker-compose.yml` - Deployment configuration
- `app/server.js` - Demo application code
- `app/server.test.js` - Unit tests
- `healthcheck.sh` - Health verification script

## Testing

```bash
# Run unit tests
cd app && npm test

# Manual health check
curl http://localhost:3000/health

# View logs
docker-compose logs -f
```

## Cleanup

```bash
docker-compose down
docker rmi ci-cd-demo-app:latest
```