const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { userRouter } = require("./users/users.router");
const mongoose = require("mongoose");
const { contactRouter } = require("./contacts/contact.router");

module.exports = class CRUDServer {
  constructor() {
    this.app = null;
  }

  async start() {
    this.initserver();
    this.initMiddlewares();
    this.initRoutes();
    await this.initDataBase();
    this.initErrorHandling();
    this.startListening();
  }

  initserver() {
    this.app = express();
  }

  initMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(morgan("combined"));
  }
  initRoutes() {
    this.app.use("/src/contacts", contactRouter);
    this.app.use("/auth", userRouter);
    this.app.use("/users", userRouter);
  }
  async initDataBase() {
    try {
      await mongoose.connect(process.env.MONGODB_URL, {
        userNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  initErrorHandling() {
    this.app.use((err, req, res, next) => {
      const status = err.status || 500;
      return res.status(status).send(err.message);
    });
  }

  startListening() {
    this.app.listen(process.env.PORT, () => {
      console.log("Database connection successful");
    });
  }
};