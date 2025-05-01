import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

 const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //    console.log("Decoded token:", decoded);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      res.status(400);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(400);
    throw new Error("Not authorized, no token");
  }
});

export default protect;