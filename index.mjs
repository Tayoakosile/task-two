import app, { PORT } from "./config.mjs";
import Person from "./schema/PersonSchema.mjs";
import { uniqueID } from "./utils/util.mjs";

app.get("/", (request, reply) => {
  return reply.code(200).send({ message: "Hello world" });
});

app.get("/api", async (request, reply) => {
  try {
    const persons = await Person.find();

    reply.code(200).send(persons);
  } catch (error) {}
});

app.get("/api/:id", async (request, reply) => {
  const id = request.params?.id;

  try {
    const person = await Person.findOne({ id });

    console.log(person, "person");
    if (person) {
      return reply.code(200).send(person);
    }
    return reply
      .code(404)
      .send({ message: `Person with ID '${id}' not found!` });
  } catch (error) {}
});

app.post(
  "/api",
  {
    schema: {
      body: { $ref: "request#" },
      response: {
        200: { $ref: "response#" },
      },
      config: {
        openapi: {
          description: "Makes a request",
          summary: "Main route",
          tags: ["service"],
          security: [{ jwtBearer: [] }],
        },
      },
    },
  },
  async (request, reply) => {
    try {
      const name = request.body.name;

      if (!(await Person.findOne({ name }))) {
        const persons = await Person.create({ name, id: uniqueID() });
        return reply.code(200).send({ message: "Person Created Succesfully" });
      }
      return reply
        .code(400)
        .send({ message: `User with the name "${name}" already Exists` });
    } catch (error) {
      console.log(error);
    }
  }
);

// put
app.delete("/api", async (request, reply) => {
  const name = request.body.name;

  await Person.deleteOne({ name });
  return reply.code(200).send({ message: `Deleted` });
});

app.delete("/api/:id", async (request, reply) => {
  const id = request.params?.id;

  await Person.deleteOne({ id }, { new: true });
  console.log(Person, "Person");
  return reply.code(200).send({ message: `Deleted` });
});

// put
const start = async () => {
  try {
    await app.listen({ port: PORT });
    app.log.info(`server listening on ${app.server.address().port}`);
  } catch (err) {
    app.log.error(err);

    process.exit(1);
  }
};

start();
