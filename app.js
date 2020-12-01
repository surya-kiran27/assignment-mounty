const express = require("express");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();
const db = require("./models/db");
const port = process.env.PORT || "3000";
app.listen(port, () => {
  console.log(`express server started on ${port}`);
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//index route
app.use("/", indexRouter);
//users route
app.use("/users", usersRouter);

module.exports = app;
