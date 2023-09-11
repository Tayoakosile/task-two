import mongoose from "mongoose";
const { Schema } = mongoose;

const PersonSchema = new Schema({
  name: String,
  id: String  ,
});

const Person = mongoose.model("people", PersonSchema);

export default Person;
