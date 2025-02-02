import jwt from "jsonwebtoken";
import User from "../models/User.js";
import AppError from "../utils/appError.js";
import { createSendToken } from "../utils/jwt.js";
import catchAsync from "../utils/catchAsync.js";

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password)))
    return next(new AppError("Incorrect email or password", 401));

  createSendToken(user, 200, res);
});

export const protect = catchAsync(async (req, res, next) => {
  // 1) Getting token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    token = req.headers.authorization.split(" ")[1];

  if (!token)
    return next(new AppError("Please log in to access this resource", 401));

  // 2) Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const user = await User.findById(decoded.id);
  if (!user) return next(new AppError("User no longer exists", 401));

  // 4) Check if user changed password after token was issued
  if (user.changedPasswordAfter(decoded.iat))
    return next(
      new AppError("User recently changed password. Please log in again", 401)
    );

  // Grant access to protected route
  req.user = user;
  next();
});

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );

    next();
  };
};

export const forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return next(new AppError("There is no user with that email address", 404));

  // 2) Generate random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    // 3) Send it to user's email
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/resetPassword/${resetToken}`;

    res.status(200).json({
      status: "success",
      message: "Token sent to email",
      resetURL,
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        "There was an error sending the email. Try again later!",
        500
      )
    );
  }
});

export const resetPassword = catchAsync(async (req, res, next) => {
  // Implementation for password reset
});

export const updatePassword = catchAsync(async (req, res, next) => {
  // Implementation for password update
});
