import Fastify from 'fastify';
import cors from '@fastify/cors';
import { petRoutes } from './routes/pets.js';

const fastify = Fastify({
    logger: true
});

await fastify.register(cors, {
    origin: true // Allow all for dev
});

// Register routes
await fastify.register(petRoutes);

// Run the server
try {
    await fastify.listen({ port: 3000 });
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
}
