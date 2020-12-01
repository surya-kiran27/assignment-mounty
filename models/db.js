const mongoose = require("mongoose");
//establish connection to mongoDB
mongoose.connect(
  "mongodb+srv://surya1423:xAnzmDB3ruNycDx9@cluster0.0q1mx.mongodb.net/assignment?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection : " + err);
    }
  }
);
