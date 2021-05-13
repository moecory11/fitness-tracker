const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
  },

  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "Exercise",
    },
  ],
  workouts: [
      {
          type: Schema.Types.ObjectId,
          ref: "Workouts",
      }
  ]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
