const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./db");
const path = require("path");
const cors = require("cors");
const jobsRoute = require("./routes/jobsRoutes");
const userRoute = require("./routes/usersRoutes");

app.use(express.json());
app.use(
  cors({
    origin: "https://ijobclient.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use("/api/jobs", jobsRoute);

app.use("/api/users", userRoute);
app.get("/", (req, res) => {
  res.send("hello world");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Node JS Server Started on port${port}`));
