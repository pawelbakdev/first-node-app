require("dotenv").config();
const debug = require("debug")("app:startup");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("./middleware/logger");
const authenticator = require("./middleware/authenticator");
const express = require("express");
const app = express();
// Routes
const courses = require("./routes/courses");
const home = require("./routes/home");

// Middleware
app.use(express.json());
app.use(express.static("public"));
app.use(helmet());
app.use(logger);
app.use(authenticator);
// Routes
app.use("/api/courses", courses);
app.use("/", home);

app.set("view engine", "pug");
if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled...");
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
