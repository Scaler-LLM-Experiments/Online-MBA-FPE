// ========================================
// LOCAL DEV: Proxy Configuration
// ========================================
// This proxies API requests from frontend (localhost:3000)
// to backend (localhost:8000) during local development

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy all API requests to the backend
  app.use(
    '/career-profile-tool/api',
    createProxyMiddleware({
      target: 'http://localhost:8000',
      changeOrigin: true,
      logLevel: 'debug',
    })
  );
};
