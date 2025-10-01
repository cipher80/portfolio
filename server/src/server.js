// import { createServer } from 'http';
// import app from './app.js';
// import { env } from './config/env.js';
// import { verifyTransporter } from './config/mailer.js';
// import { log } from './config/logger.js';

// const server = createServer(app);
// const port = env.PORT;

// server.listen(port, async () => {
//   log.info(`API listening on http://localhost:${port}`);
//   try {
//     await verifyTransporter();
//     log.info('SMTP transporter verified.');
//   } catch (err) {
//     log.error('SMTP verify failed:', err?.message || err);
//   }
// });

// // Graceful shutdown
// const shutdown = () => {
//   log.info('Shutting down...');
//   server.close(() => {
//     log.info('HTTP server closed.');
//     process.exit(0);
//   });
//   setTimeout(() => process.exit(1), 10000).unref();
// };
// process.on('SIGTERM', shutdown);
// process.on('SIGINT', shutdown);

// server/src/server.js
import { createServer } from 'http';
import app from './app.js';
import { env } from './config/env.js';
import { verifyTransporter } from './config/mailer.js';
import { log } from './config/logger.js';

const port = Number(env.PORT || 5000); // <-- default to 5000 if not set
const server = createServer(app);

server.on('error', (err) => {
  log.error(`HTTP server error: ${err?.message || err}`);
});

server.listen(port, async () => {
  log.info(`API listening on http://localhost:${port}`);
  try {
    await verifyTransporter();
    log.info('SMTP transporter verified.');
  } catch (err) {
    log.error(`SMTP verify failed: ${err?.message || err}`);
  }
});

// Graceful shutdown
const shutdown = () => {
  log.info('Shutting down...');
  server.close(() => {
    log.info('HTTP server closed.');
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10000).unref();
};
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
