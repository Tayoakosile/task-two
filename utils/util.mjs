import randomatic from "randomatic";

export const uniqueID = () => {
  return `HNG-${randomatic("0A", "3")}`;
};
