require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// api routes
app.use("/users", require("./api/controllers/users.controller"));

// swagger docs route
app.use("/api-docs", require("./helpers/swagger"));

// start server
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
