import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  image: String,
});

const UserModel = mongoose.model("user", userSchema);
export default UserModel;
