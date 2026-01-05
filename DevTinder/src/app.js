const express = require("express");
const app = express();
const databaseDb = require("../config/database");
const User = require("../modals/UserModal");
const signUpValidator = require("../Utils/signUpValidator");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const secretKey = "poda@1999";
const userAuth = require("../middleware/userAuth");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const connectionRouter = require("./routes/connectionRequestRouter");
const userRouter = require("./routes/userRouter");
const cors = require("cors");
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", connectionRouter);
app.use("/", userRouter);

databaseDb()
  .then(() => {
    console.log("DB Success");
    app.listen(7000, () => {
      console.log("Sever startup success");
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("Error");
  });
