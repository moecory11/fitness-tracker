require('dotenv').config();
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 3000;
const db = require("./models");
const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/workout-tracker",
  { useNewUrlParser: true }
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/exercise.html"));
});
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/stats.html"));
}); 

//creates new workout
app.post('/api/workouts',(req,res)=>{
  console.log(req.body)
  db.Workouts.create({date: Date.now()}).then(newWorkout=>{
      res.json(newWorkout)
  }).catch(err=>{
      res.status(500).json(err);
  })
})

app.get("/api/workouts",(req,res)=>{
  db.Workouts.find().populate("exercises").then(allWorkouts=>{
      res.json(allWorkouts)
  }).catch(err=>{
      res.status(500).json(err);
  })
})

app.put("/api/workouts/:id",(req,res)=>{
  console.log(req.body)
  db.Exercises.create(req.body)
  .then((newExercise) => db.Workouts.findOneAndUpdate(
    {_id: req.params.id},
    { $push: {exercises: newExercise._id }},
    { new: true })
)
.then(dbWorkout => {
    res.json(dbWorkout)
})
.catch(err => {
    res.json(err)
})
})

app.get("/api/workouts/range", (req, res) => {
  db.Workouts.find({})
  .populate("exercises")
  .then(dbWorkout => {
      res.json(dbWorkout);
  })
  .catch(err => {
      res.json(err)
  })
})

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
