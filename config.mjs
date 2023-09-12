import fastify from "fastify";

// import FastOpenAPI from "fastify-openapi-docs";

import fastifyEnv from "@fastify/env";
import mongoose from "mongoose";
import fastifyFormbody from "@fastify/formbody";

export const PORT = process.env.PORT || 4000;

const app = fastify({ logger: true });
app.register(fastifyFormbody);

// await app.register(FastOpenAPI, {
//   openapi: {
//     openapi: "3.0.3",
//     info: {
//       title: "PERSON API",
//       description: "Hello world",
//       version: "1.0.0",
//       license: "MIT",
//     },
//     contact: {
//       name: "Tayo Akosile",
//       url: "https://github.com/tayoakosile",
//       email: "tayoakosile@gmail.com",
//     },
//     host: "vercel",
//     schemes: ["https"],

//     servers: [{ url: "https://example.com", description: "Production Server" }],

//     // tags: [
//     //   { name: "Default", description: "Default" },
//     //   { name: "Fetch All Users", description: "userss" },
//     // ],
//   },

//   definitions: {
//     Person: {
//       type: "object",
//       required: ["name"],
//       properties: {
//         id: { type: "string" },
//         name: { type: "string" },
//       },
//     },
//   },
// });

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
// app.addSchema({
//   type: "object",
//   $id: "request",
//   description: "The request payload",
//   properties: {
//     id: {
//       type: "string",
//       description: "The operation id",
//       pattern: "^.+$",
//     },
//   },
//   required: ["id"],
//   additionalProperties: false,
// });

// app.addSchema({
//   type: "object",
//   $id: "response",
//   description: "The response payload",
//   properties: {
//     ok: {
//       type: "boolean",
//       description: "The operation response",
//     },
//   },
//   required: ["ok"],
//   additionalProperties: false,
// });

export default app;
