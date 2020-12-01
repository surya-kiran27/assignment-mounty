var express = require("express");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
const port = process.env.PORT || "3000";
app.listen(port, () => {
  console.log(`express server started on ${port}`);
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
