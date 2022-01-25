import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  socialOnly: { type: Boolean, default: true },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  location: String,
})

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

const user = mongoose.model("User", userSchema);
export default user;