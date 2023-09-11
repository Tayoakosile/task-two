import fastify from "fastify";
import fastifyEnv from "@fastify/env";
import MONGOPLUGIN from "@fastify/mongodb";

export const PORT = process.env.port || 4000;

const Fastify = fastify({ logger: true });

const initializeDb = async () => {
  // inject environmental variables (.env)
  await Fastify.register(fastifyEnv, {
    dotenv: true,
    data: process.env,
    schema: {
      type: "object",
      required: ["MONGODB_CONNECTION_STRING"],
      properties: {
        MONGODB_CONNECTION_STRING: {
          type: "string",
        },
      },
    },
  });

  //   Connect NoSql Database

  await Fastify.register(MONGOPLUGIN, {
    url: Fastify.config.MONGODB_CONNECTION_STRING,
    forceClose: true,
  });
  await Fastify.ready();
};

initializeDb();

export default Fastify;
