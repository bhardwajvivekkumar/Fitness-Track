import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "../error.js";
import User from "../models/UserModel.js";
import Workout from "../models/Workout.js";

dotenv.config();

export const UserRegister = async (req, res, next) => {
  try {
    const { email, password, name, img } = req.body;

    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return next(createError(409, "Email is already in use"));
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      img,
    });
    const createdUser = await user.save();
    const token = jwt.sign({ id: createdUser._id }, process.env.JWT, {
      expiresIn: "999 years",
    });
    return res.status(200).json({ token, user });
  } catch (err) {
    next(err);
  }
};

export const UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const isPasswordCorrect = await bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return next(createError(403, "Incorrect password"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "999 years",
    });
    return res.status(200).json({ token, user });
  } catch (err) {
    next(err);
  }
};

export const getUserDashboard = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const currentDateFormatted = new Date();
    const startToday = new Date(
      currentDateFormatted.getFullYear(),
      currentDateFormatted.getMonth(),
      currentDateFormatted.getDate()
    );
    const endToday = new Date(
      currentDateFormatted.getFullYear(),
      currentDateFormatted.getMonth(),
      currentDateFormatted.getDate() + 1
    );

    //calculte total calories burnt
    const totalCaloriesBurnt = await Workout.aggregate([
      { $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
      {
        $group: {
          _id: null,
          totalCaloriesBurnt: { $sum: "$caloriesBurned" },
        },
      },
    ]);

    //Calculate total no of workouts
    const totalWorkouts = await Workout.countDocuments({
      user: userId,
      date: { $gte: startToday, $lt: endToday },
    });

    //Calculate average calories burnt per workout
    const avgCaloriesBurntPerWorkout =
      totalCaloriesBurnt.length > 0
        ? totalCaloriesBurnt[0].totalCaloriesBurnt / totalWorkouts
        : 0;

    // Fetch category of workouts
    const categoryCalories = await Workout.aggregate([
      { $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
      {
        $group: {
          _id: "$category",
          totalCaloriesBurnt: { $sum: "$caloriesBurned" },
        },
      },
    ]);

    //Format category data for pie chart

    const pieChartData = categoryCalories.map((category, index) => ({
      id: index,
      value: category.totalCaloriesBurnt,
      label: category._id,
    }));

    const weeks = [];
    const caloriesBurnt = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(
        currentDateFormatted.getTime() - i * 24 * 60 * 60 * 1000
      );
      weeks.push(`${date.getDate()}th`);

      const startOfDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      const endOfDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1
      );

      const weekData = await Workout.aggregate([
        {
          $match: {
            user: user._id,
            date: { $gte: startOfDay, $lt: endOfDay },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            totalCaloriesBurnt: { $sum: "$caloriesBurned" },
          },
        },
        {
          $sort: { _id: 1 }, // Sort by date in ascending order
        },
      ]);

      caloriesBurnt.push(
        weekData[0]?.totalCaloriesBurnt ? weekData[0]?.totalCaloriesBurnt : 0
      );
    }

    return res.status(200).json({
      totalCaloriesBurnt:
        totalCaloriesBurnt.length > 0
          ? totalCaloriesBurnt[0].totalCaloriesBurnt
          : 0,
      totalWorkouts: totalWorkouts,
      avgCaloriesBurntPerWorkout: avgCaloriesBurntPerWorkout,
      totalWeeksCaloriesBurnt: {
        weeks: weeks,
        caloriesBurned: caloriesBurnt,
      },
      pieChartData: pieChartData,
    });
  } catch (err) {
    next(err);
  }
};

export const getWorkoutsByDate = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);
    let date = req.query.date ? new Date(req.query.date) : new Date();
    if (!user) {
      return next(createError(404, "User not found"));
    }
    const startOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const endOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );

    const todaysWorkouts = await Workout.find({
      user: userId,
      date: { $gte: startOfDay, $lt: endOfDay },
    });
    const totalCaloriesBurnt = todaysWorkouts.reduce(
      (total, workout) => total + workout.caloriesBurned,
      0
    );

    return res.status(200).json({ todaysWorkouts, totalCaloriesBurnt });
  } catch (err) {
    next(err);
  }
};

// export const addWorkout = async (req, res, next) => {
//   try {
//     const userId = req.user?.id;
//     const { workoutString } = req.body;
//     if (!workoutString) {
//       return next(createError(400, "Workout string is missing"));
//     }
//     // Split workoutString into lines
//     const eachworkout = workoutString
//       .split("\n")
//       .map((line) => line.trim())
//       .filter(Boolean);
//     // Check if any workouts start with "#" to indicate categories
//     const categories = eachworkout.filter((line) => line.startsWith("#"));
//     if (categories.length === 0) {
//       return next(createError(400, "No categories found in workout string"));
//     }

//     const parsedWorkouts = [];
//     let currentCategory = "";
//     let count = 0;

//     // Loop through each line to parse workout details
//     await eachworkout.forEach((line) => {
//       count++;
//       if (line.startsWith("#")) {
//         const parts = line?.split("\n").map((part) => part.trim());
//         // console.log(parts);
//         if (parts.length < 5) {
//           return next(
//             createError(400, `Workout string is missing for ${count}th workout`)
//           );
//         }

//         // Update current category
//         currentCategory = parts[0].substring(1).trim();
//         // Extract workout details
//         const workoutDetails = parseWorkoutLine(parts);
//         if (workoutDetails == null) {
//           return next(createError(400, "Please enter in proper format "));
//         }

//         if (workoutDetails) {
//           // Add category to workout details
//           workoutDetails.category = currentCategory;
//           parsedWorkouts.push(workoutDetails);
//         }
//       } else {
//         return next(
//           createError(400, `Workout string is missing for ${count}th workout`)
//         );
//       }
//     });

//     // Calculate calories burnt for each workout
//     await Promise.all(
//       parsedWorkouts.map(async (workout) => {
//         workout.caloriesBurned = parseFloat(calculateCaloriesBurnt(workout));
//         await Workout.create({ ...workout, user: userId });
//       })
//     );

//     return res.status(201).json({
//       message: "Workouts added successfully",
//       workouts: parsedWorkouts,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

export const addWorkout = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { workoutString } = req.body;

    if (!workoutString) {
      return next(createError(400, "Workout string is missing"));
    }

    // Normalize date to midnight (12:00 AM) of today
    const now = new Date();
    const normalizedDate = new Date(
      Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
    );

    // Split workout string by newline, trim each line, and filter out empties
    const eachworkout = workoutString
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const parsedWorkouts = [];
    let currentCategory = "";

    // Parsing logic: Assuming the input is structured with a category line (starting with '#')
    // followed by 4 detail lines, then repeated.
    for (let i = 0; i < eachworkout.length; ) {
      // If a line starts with '#', treat it as category.
      if (eachworkout[i].startsWith("#")) {
        currentCategory = eachworkout[i].substring(1).trim();
        // Ensure there are at least 4 more lines after the category.
        if (i + 4 >= eachworkout.length) {
          return next(createError(400, "Incomplete workout data"));
        }

        // The next 4 lines are details for this workout.
        const workoutNameLine = eachworkout[i + 1];
        const setsRepsLine = eachworkout[i + 2];
        const weightLine = eachworkout[i + 3];
        const durationLine = eachworkout[i + 4];

        // Here, create a workout object.
        const workoutDetails = {
          category: currentCategory,
          workoutName: workoutNameLine.substring(1).trim(), // remove leading '-' if present
          sets: parseInt(setsRepsLine.split("sets")[0].substring(1).trim()),
          reps: parseInt(
            setsRepsLine.split("sets")[1].split("reps")[0].substring(1).trim()
          ),
          weight: parseFloat(weightLine.split("kg")[0].substring(1).trim()),
          duration: parseFloat(
            durationLine.split("min")[0].substring(1).trim()
          ),
        };

        parsedWorkouts.push(workoutDetails);
        i += 5; // move to the next workout block
      } else {
        // If the line does not start with a category marker, something is wrong.
        return next(createError(400, `Invalid format at line ${i + 1}`));
      }
    }

    // Extra check: Ensure there are no duplicates within the same request.
    const duplicateNames = new Set();
    for (const workout of parsedWorkouts) {
      const trimmedName = workout.workoutName.trim();
      if (duplicateNames.has(trimmedName)) {
        return next(
          createError(
            409,
            `Duplicate workout "${trimmedName}" found in request.`
          )
        );
      }
      duplicateNames.add(trimmedName);
    }

    // Save workouts one at a time.
    for (const workout of parsedWorkouts) {
      // Always trim the workoutName to avoid accidental duplicates due to whitespace.
      workout.workoutName = workout.workoutName.trim();

      // Check if a workout with the same name already exists for this user on this day
      const exists = await Workout.findOne({
        user: userId,
        workoutName: workout.workoutName,
        date: normalizedDate,
      });

      if (exists) {
        return next(
          createError(
            409,
            `Workout "${workout.workoutName}" already exists for today.`
          )
        );
      }

      // Calculate calories
      workout.caloriesBurned = parseFloat(calculateCaloriesBurnt(workout));
      // Save with normalized date
      await Workout.create({ ...workout, user: userId, date: normalizedDate });
    }

    return res.status(201).json({
      message: "Workouts added successfully",
      workouts: parsedWorkouts,
    });
  } catch (err) {
    next(err);
  }
};

// Function to parse workout details from a line
const parseWorkoutLine = (parts) => {
  const details = {};
  // console.log(parts);
  if (parts.length >= 5) {
    details.workoutName = parts[1].substring(1).trim();
    details.sets = parseInt(parts[2].split("sets")[0].substring(1).trim());
    details.reps = parseInt(
      parts[2].split("sets")[1].split("reps")[0].substring(1).trim()
    );
    details.weight = parseFloat(parts[3].split("kg")[0].substring(1).trim());
    details.duration = parseFloat(parts[4].split("min")[0].substring(1).trim());
    // console.log(details);
    return details;
  }
  return null;
};

// Function to calculate calories burnt for a workout
// const calculateCaloriesBurnt = (workoutDetails) => {
//   const durationInMinutes = parseInt(workoutDetails.duration);
//   const weightInKg = parseInt(workoutDetails.weight);
//   const caloriesBurntPerMinute = 5; // Sample value, actual calculation may vary
//   return durationInMinutes * caloriesBurntPerMinute * weightInKg;
// };

const calculateCaloriesBurnt = (workoutDetails) => {
  const duration = parseInt(workoutDetails.duration) || 0;
  const sets = parseInt(workoutDetails.sets) || 0;
  const reps = parseInt(workoutDetails.reps) || 0;
  const weight = parseInt(workoutDetails.weight) || 0;

  // Total repetitions
  const totalReps = sets * reps;

  // Base calories burned per minute
  const baseCaloriesPerMinute = 5;

  // Multiplier for effort: sets × reps
  const effortFactor = totalReps / 10; // Normalize reps into a smaller factor

  // Additional intensity from lifted weight (0.1 cal per kg per rep/min)
  const weightFactor = weight * 0.05;

  // Total calories = (base + effort + weight impact) × duration
  const caloriesBurned =
    (baseCaloriesPerMinute + effortFactor + weightFactor) * duration;

  return Math.round(caloriesBurned);
};

export const deleteWorkout = async (req, res, next) => {
  try {
    const workoutId = req.params.id;
    const userId = req.user?.id;

    const deleted = await Workout.findOneAndDelete({
      _id: workoutId,
      user: userId,
    });
    if (!deleted) {
      return next(createError(404, "Workout not found"));
    }

    return res.status(200).json({ message: "Workout deleted successfully" });
  } catch (err) {
    next(err);
  }
};
