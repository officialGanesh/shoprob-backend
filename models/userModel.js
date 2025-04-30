import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please add username"],
    minlength: [3, "Username must be at least 3 characters"],
    maxlength: [20, "Username must be at most 20 characters"],
  },
  email: {
    type: String,
    required: [true, "Please add email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please add password"],
 
  },
});

const User = mongoose.model("User", userSchema);
export default User;
