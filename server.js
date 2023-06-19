const express = require("express");
const connectDB = require("./config/dbConnection");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.port || 3000;

connectDB();
app.use(express.json());
app.use("/api/contacts", require("./routes/ContactRoutes"));
app.use("/api/users", require("./routes/UserRoutes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
