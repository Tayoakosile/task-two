import fastify from "fastify";

const PORT = process.env.port || 4000;

const Fastify = fastify({ logger: true });


Fastify.get("/", () => {
  console.log("hello world");
});

Fastify.listen({ port: PORT }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
