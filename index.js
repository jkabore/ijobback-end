const express = require("express");
const app = express();

const db = require("./db");
const path = require("path");
const cors = require("cors");
const jobsRoute = require("./routes/jobsRoutes");
const userRoute = require("./routes/usersRoutes");
require("dotenv").config();
app.use(express.json());
app.use(cors());
app.use("/api/jobs", jobsRoute);

app.use("/api/users", userRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Node JS Server Started on port${port}`));
