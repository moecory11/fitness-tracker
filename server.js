const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

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

//renders homepage/dashboard
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "./public/index.html"));
});

//gets all exercises
app.get("/exercises", (req, res) => {
  db.Exercises.find({})
    .then((dbExercises) => {
      res.json(dbExercises);
    })
    .catch((err) => {
      res.json(err);
    });
});

//gets all users
app.get("/user", (req, res) => {
  db.User.find({})
    .then((dbUser) => {
      res.json(dbUser);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/workouts", (req, res) => {
  db.User.findOne(
    {
    //   _id: mongojs.ObjectId(req.params.id),
    },
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    }
  );
});

//creates new exercises
app.post("/exercises", ({ body }, res) => {
  db.Exercises.create(body)
    .then(({ _id }) =>
      db.User.findOneAndUpdate({}, { $push: { exercises: _id } }, { new: true })
    )
    .then((dbUser) => {
      console.log(dbUser);
      res.json(dbUser);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
