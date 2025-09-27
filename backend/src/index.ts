// SECTION - THIS CODE IS WRITTEN FOR SERVER ENTRY POINT

import app from './app.js';
import { connectDB } from './config/database.js';

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running in ${NODE_ENV} mode on port ${PORT}`);
      console.log(`📱 Health check: http://localhost:${PORT}/health`);
      console.log(`🌤️ API endpoint: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    throw error;
  }
}

startServer().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
