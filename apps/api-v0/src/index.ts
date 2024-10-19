import { config } from '@dotenvx/dotenvx';
import { log } from '@repo/logger';
import { createServer } from './server';

// Load environment variables
config();

const port = process.env.PORT || 5001;

const startServer = async () => {
  try {
    const server = await createServer(); // Await the server creation

    server.listen(port, () => {
      log(`API running on http://localhost:${port}`);
    });
  } catch (error) {
    log(`Failed to start server: ${error}`);
    process.exit(1); // Exit process with failure
  }
};

// Start the server
void startServer();
