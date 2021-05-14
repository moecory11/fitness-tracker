const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutsSchema = new Schema({
  day: { 
    type: Date, 
    default: Date.now
  },
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "Exercise",
    },
  ],
  totalDuration: {
    type: Number,
    default: 0,
  }
});

const Workouts = mongoose.model("Workouts", WorkoutsSchema);

module.exports = Workouts;