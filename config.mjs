import fastify from "fastify";
import fastifyEnv from "@fastify/env";
import mongoose from "mongoose";
import fastifyFormbody from "@fastify/formbody";

export const PORT = process.env.port || 4000;

const app = fastify({ logger: true });
app.register(fastifyFormbody);

(async () => {
  try {
    await app.register(fastifyEnv, {
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

    await mongoose.connect(app.config.MONGODB_CONNECTION_STRING);
  } catch (err) {
    app.log.error(err);
  }

})();
// app.register(fastifyMongooseAPI, options);

// initializeDb();

export default app;
