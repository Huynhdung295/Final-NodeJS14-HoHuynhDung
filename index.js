const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();
const usersRoutes = require("./routes/user-router");
const movieRoutes = require("./routes/movie-routes");
const path = require("path")

const app = express();
app.use(bodyParser.json());


const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connect MongoDB");
  });
mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

app.use("/api/users", usersRoutes);
app.use("/api/movie", movieRoutes);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});
