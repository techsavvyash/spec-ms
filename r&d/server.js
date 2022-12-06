const fastify = require('fastify')({ logger: false });
const PORT = 5000;
fastify.register(require('./routes/impl'));

const start = async () => {
    try {
        await fastify.listen(PORT)
    }
    catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}

start()
