import Fastify, { PORT } from "./config.mjs";

Fastify.get("/", (request, reply) => {
  return reply.code(200).send({ message: "Hello world" });
});

Fastify.get("/api", async (request, reply) => {
  const persons = await Fastify.mongo.client
    .db("hng")
    .collection("person")
    .find({});

  console.log(persons, "persons");
  persons.close();
  return;
  try {
    const allPersons = await persons.find({});

    console.log(allPersons, "allPersons");
  } catch (error) {}
});

const start = async () => {
  try {
    await Fastify.listen({ port: PORT });
    Fastify.log.info(`server listening on ${Fastify.server.address().port}`);
  } catch (err) {
    Fastify.log.error(err);
    
    process.exit(1);
  }
};

start();
