import jwt from "jsonwebtoken";
import { promisify } from "util";
import User from "../models/User";

export const protect = async (req, res, next) => {
  try {
    // get token from the headers
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized, login to access this resource",
      });

    // verify the token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    // check if user still exists
    const user = await User.findById(decoded.id);
    if (!user)
      return res
        .status(401)
        .json({ status: "fail", message: "User don't no longer exists" });

    // grant access
    req.user = user;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ status: "fail", message: "Unauthorized, invalid token" });
  }
};
