import randomatic from "randomatic";

export const uniqueID = () => {
  return `HNG-${randomatic(0, "2")}`;
};

export const validateRequest = async (request, reply, callback) => {
  const name = request.body?.name;
  

  if (typeof !name || Number(name)) {
    return reply.code(400).send({ error: `'name' must be a valid string, ` });
  } else {
    await callback(request, reply);
  }
};
