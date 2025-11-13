const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    service: 'demo-app'
  });
});

// Home endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Hello World! CI/CD Pipeline Demo',
    version: '1.0.0',
    endpoints: {
      '/': 'Home',
      '/health': 'Health check',
      '/api/info': 'App info'
    }
  });
});

// Info endpoint
app.get('/api/info', (req, res) => {
  res.json({
    name: 'CI/CD Demo App',
    version: '1.0.0',
    description: 'Simple Node.js app with Jenkins CI/CD pipeline',
    nodeVersion: process.version
  });
});

// Only start server if not in test mode
if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Demo app running on port ${PORT}`);
    console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  });
}

module.exports = app;