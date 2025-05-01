import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getUser,
  loginUser,
  registerUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser).post("/register", registerUser);
userRouter.get("/getuser", protect,getUser);

export default userRouter;
