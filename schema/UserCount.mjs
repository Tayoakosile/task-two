import mongoose from "mongoose";
const { Schema } = mongoose;

const UserCount = new Schema({
  id: { type: Number, default: 0 },
});

const UserCountSchema = mongoose.model("count", UserCount);

export default UserCountSchema;
