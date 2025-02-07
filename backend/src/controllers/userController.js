import User from "../models/User.js";
import Trainee from "../models/Trainee.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import csv from "csv-parser";
import fs from "fs";
import multer from "multer";
import redis from "../config/redis.js";

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "text/csv") {
      cb(null, true);
    } else {
      cb(
        new AppError("Not a CSV file! Please upload only CSV files.", 400),
        false
      );
    }
  },
});

export const uploadUserFile = upload.single("file");

// Create a single user (coach or trainee)
export const createUser = catchAsync(async (req, res, next) => {
  const { email, firstName, lastName, role, trainingSite, participantNumber } =
    req.body;

  // Generate a default password
  const defaultPassword = `${firstName.toLowerCase()}${Math.floor(
    Math.random() * 10000
  )}`;

  // 1. Create the user using the User model
  const user = await User.create({
    email,
    password: defaultPassword,
    firstName,
    lastName,
    role,
  });

  // 2. If role is trainee, create trainee profile
  if (role === "trainee") {
    const trainee = await Trainee.create({
      userId: user._id,
      trainingSite,
      participantNumber,
      status: "active",
    });

    return res.status(201).json({
      status: "success",
      data: {
        user,
        trainee,
        defaultPassword, // send via email
      },
    });
  }

  res.status(201).json({
    status: "success",
    data: {
      user,
      defaultPassword, // send via email
    },
  });
});

// Bulk create users from CSV file
export const bulkCreateUsers = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError("Please upload a file", 400));
  }

  const results = [];
  const errors = [];

  const processFile = async () => {
    return new Promise((resolve, reject) => {
      fs.createReadStream(req.file.path)
        .pipe(csv())
        .on("data", async (row) => {
          try {
            // Validate required fields
            if (!row.email || !row.firstName || !row.lastName || !row.role) {
              errors.push(
                `Missing required fields for row: ${JSON.stringify(row)}`
              );
              return;
            }

            // Generate default password
            const defaultPassword = `${row.firstName.toLowerCase()}${Math.floor(
              Math.random() * 1000
            )}`;

            // Create user
            const user = await User.create({
              email: row.email,
              password: defaultPassword,
              firstName: row.firstName,
              lastName: row.lastName,
              role: row.role,
            });

            // If trainee, create trainee profile
            if (row.role === "trainee") {
              const trainee = await Trainee.create({
                userId: user._id,
                trainingSite: row.trainingSite,
                participantNumber: row.participantNumber,
                status: "active",
              });

              results.push({
                user,
                trainee,
                defaultPassword,
              });
            } else {
              results.push({
                user,
                defaultPassword,
              });
            }
          } catch (error) {
            errors.push(
              `Error processing row ${JSON.stringify(row)}: ${error.message}`
            );
          }
        })
        .on("end", () => {
          // Clean up uploaded file
          fs.unlink(req.file.path, (err) => {
            if (err) console.error("Error deleting file:", err);
          });
          resolve();
        })
        .on("error", reject);
    });
  };

  await processFile();

  res.status(201).json({
    status: "success",
    data: {
      created: results,
      errors: errors.length ? errors : undefined,
    },
  });
});

// Get all users (with filters)
export const getUsers = catchAsync(async (req, res, next) => {
  const filter = {};
  if (req.query.role) filter.role = req.query.role;
  if (req.query.active !== undefined) filter.active = req.query.active;

  const users = await User.find(filter).select("-password");

  res.status(200).json({
    status: "success",
    results: users.length,
    data: { users },
  });
});

// Get single user
export const getUser = catchAsync(async (req, res, next) => {
  const cachedUser = await redis.get(`user:${req?.user?._id}`);
  if (cachedUser)
    return res.status(200).json({
      status: "success",
      data: { user: JSON.parse(cachedUser) },
    });

  // if user not in cache, we get them from DB
  const user = await User.findById(req.params.id)
    .select("firstName lastName email role active profilePicture")
    .lean();

  if (!user) return next(new AppError("No user found with that ID", 404));

  // cache the result for future requests
  await redis.setEx(`user:${req?.user?._id}`, 3600, JSON.stringify(user));

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

// Update user
export const updateUser = catchAsync(async (req, res, next) => {
  // Remove password field if it exists in request
  const { password, role, ...updateData } = req.body;

  const user = await User.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!user) return next(new AppError("No user found with that ID", 404));

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

// Deactivate user
export const deactivateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { active: false },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!user) return next(new AppError("No user found with that ID", 404));

  res.status(200).json({
    status: "success",
    data: null,
  });
});
