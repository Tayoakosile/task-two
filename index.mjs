import app, { PORT } from "./config.mjs";
import User from "./schema/PersonSchema.mjs";
import { uniqueID, validateRequest } from "./utils/util.mjs";

app.get("/", (request, reply) =>
  reply.code(200).send({ message: "Hello world" })
);

app.get("/api", async (request, reply) => {
  const persons = (await User.find()) ?? [];

  reply.code(200).send(persons);
});

app.get("/api/:id", async (request, reply) => {
  const id = `${request.params?.id}`;
  const person = await User.findOne({ id });

  if (person) return reply.code(200).send(person);

  return reply.code(404).send({ message: `User with ID '${id}' not found!` });
});

app.put("/api/:id", (request, reply) =>
  validateRequest(request, reply, async (request, reply) => {
    const id = `${request.params?.id}`;
    const name = request.body?.name;
    const person = await User.findOneAndUpdate({ id }, { name, id });

    if (person) {
      return reply.code(200).send({
        message: `User with ID '${id}' details updated successfully!`,
      });
    }
    return reply.code(404).send({ message: `User with ID '${id}' not found!` });
  })
);

app.patch("/api/:id", async (request, reply) =>
  validateRequest(request, reply, async () => {
    const id = `${request.params?.id}`;
    const name = request.body?.name;

    const person = await User.findOneAndUpdate({ id }, { name, id });

    if (person) {
      return reply.code(200).send({
        message: `User with ID '${id}' details updated successfully!`,
      });
    }
    return reply.code(404).send({ message: `User with ID '${id}' not found!` });
  })
);

app.post("/api", async (request, reply) =>
  validateRequest(request, reply, async () => {
    const name = request.body?.name;

    if (!(await User.findOne({ name }))) {
      const persons = await User.create({ name, id: uniqueID() });
      return reply.code(200).send({ message: "User Created Succesfully" });
    }
    return reply
      .code(400)
      .send({ message: `User with the name "${name}" already Exists` });
  })
);

app.delete("/api", async (request, reply) =>
  validateRequest(request, reply, async () => {
    const name = request.body?.name;

    if (!name) {
      return reply
        .code(400)
        .send({ message: "Attach name to the request body" });
    }
    const deleteUser = await User.deleteOne({ name });

    if (deleteUser) {
      return reply
        .code(200)
        .send({ message: `User Details Deleted Successfully!` });
    }
  })
);

app.delete("/api/:id", async (request, reply) => {
  const id = `${request.params?.id}`;
  const deleteSingleUser = await User.deleteOne({ id }, { new: true });
  return reply.code(200).send({ message: `Deleted` });
});

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
