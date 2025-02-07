import redis from "../config/redis.js";
import Trainee from "../models/Trainee";

export const getAllTrainees = async (_, res) => {
  try {
    const trainees = await Trainee.find();
    return res.status(200).json({ success: true, data: trainees });
  } catch (error) {
    console.error("An error occurred in getAllTrainees controller", error);
    return res
      .status(500)
      .json({ message: `An internal server occurred, ${error.message}` });
  }
};

export const getTraineeById = async (req, res) => {
  try {
    const { id } = req.body.id;
    const cachedTrainee = await redis.get(`user:${id}`);
    if (cachedUser)
      return res.status(200).json({
        status: "success",
        data: { trainee: JSON.parse(cachedTrainee) },
      });

    // if trainee not in cache, we get them from DB
    const user = await Trainee.findById(id).lean();

    return res.status(200).json({ success: true, data: user });

    if (!user) {
      return next(new AppError("No user found with that ID", 404));
    }
  } catch (error) {
    console.error("An error occurred in getTraineeById controller", error);
    return res
      .status(500)
      .json({ message: `An internal server occurred, ${error.message}` });
  }
};

export const editTraineeInformation = async (req, res) => {
  try {
    // Remove userId from request data
    const { userId, ...updateData } = req.body;

    const user = await Trainee.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({ status: "success", data: user });
  } catch (error) {
    console.error(
      "An error occurred in editTraineeInformation controller",
      error
    );
    return res
      .status(500)
      .json({ message: `An internal server occurred, ${error.message}` });
  }
};
