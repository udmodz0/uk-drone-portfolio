import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Backend API plugin to serve Firebase configuration securely without hardcoding in frontend bundles
function firebaseConfigBackendPlugin() {
  return {
    name: 'firebase-config-backend',
    configureServer(server) {
      server.middlewares.use('/api/firebase-config', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
          apiKey: "AIzaSyCJdashCu7Lddn2bmXExCq_u-FQA1IomH0",
          authDomain: "airvibeuk-db.firebaseapp.com",
          projectId: "airvibeuk-db",
          storageBucket: "airvibeuk-db.firebasestorage.app",
          messagingSenderId: "752474421961",
          appId: "1:752474421961:web:cfe9d65735a598ffad6b18",
          measurementId: "G-L4DJ1QKQPZ"
        }));
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/firebase-config', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
          apiKey: "AIzaSyCJdashCu7Lddn2bmXExCq_u-FQA1IomH0",
          authDomain: "airvibeuk-db.firebaseapp.com",
          projectId: "airvibeuk-db",
          storageBucket: "airvibeuk-db.firebasestorage.app",
          messagingSenderId: "752474421961",
          appId: "1:752474421961:web:cfe9d65735a598ffad6b18",
          measurementId: "G-L4DJ1QKQPZ"
        }));
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), firebaseConfigBackendPlugin()],
  server: {
    port: 3000,
    host: true
  }
})

