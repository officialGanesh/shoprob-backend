import express from "express";
import {
  getUser,
  loginUser,
  registerUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser).post("/register", registerUser);
userRouter.get("/getuser", getUser);

export default userRouter;
