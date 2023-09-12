import mongoose from "mongoose";
const { Schema } = mongoose;

const PersonSchema = new Schema({
  name: String,
  id: String  ,
});

const User = mongoose.model("people", PersonSchema);

export default User;
