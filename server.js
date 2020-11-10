const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/WorkoutTracker',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);
const db = mongoose.connection; //create db variable
db.on("error", console.error.bind(console, "Connection error:")); //if any error occurs


// routes
app.use(require("./routes/apiRoutes.js"));
app.use(require("./routes/htmlRoutes.js"));

db.once("open", function () {
  console.log("Connected to MongoDB");
  app.listen(PORT, function () {
    console.log(`App running on port http://localhost:${PORT}`);
  });
})
