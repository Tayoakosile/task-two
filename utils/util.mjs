import randomatic from "randomatic";
import User from "../schema/PersonSchema.mjs";

export const uniqueID = () => {
  return `HNG-${randomatic("0", "2")}`;
};

export const validateBodyRequestNameIsValid = async (
  request,
  reply,
  shouldCheckIfNameExistInDb = false,
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
  }

  const searchForUserInDb = await User.findOne({ name });
  if (shouldCheckIfNameExistInDb && searchForUserInDb) {
    return reply.code(400).send({
      message: `User with the name "${name}" already Exists,Please use a different name`,
    });
  }
  await callback(request, reply);
};

export const getUserList = async (request, reply) => {
  const persons = (await User.find()) ?? [];

  const filteredList = persons?.map((person) => filterResByNameAndId(person));

return  reply.code(200).send(filteredList);
};

export const filterResByNameAndId = (person) => {
  return { id: person?.id, name: person?.name };
};
