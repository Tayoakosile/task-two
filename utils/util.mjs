import randomatic from "randomatic";
import User from "../schema/PersonSchema.mjs";

export const uniqueID = () => {
  return `HNG-${randomatic("0", "2")}`;
};

export const validateBodyRequestNameIsValid = async (
  request,
  reply,
  callback
) => {
  const name = request.body?.name;

  if (
    Number(name) == NaN ||
    name?.toLowerCase() == "true" ||
    name?.toLowerCase() == "false" ||
    !name
  ) {
    return reply.code(400).send({ error: `'name' must be a valid string, ` });
  } else {
    await callback(request, reply);
  }
};

export const getUserList = async (request, reply) => {
  const persons = (await User.find()) ?? [];

  reply.code(200).send(persons);
};
