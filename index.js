const contacts = require("./contacts");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "./.env") });
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const {userRouter} = require("./src/users/users.router")

class CRUDServer {
  constructor() {
    this.app = null;
  }

  start() {
    this.initserver();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
    this.startListening();
  }

  initserver() {
    this.app = express();
  }

  initMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    // this.app.use(morgan());
  }

  initRoutes() {
    this.app.use("/", userRouter);
  }
  initErrorHandling() {
    this.app.use((err, req, res, next) => {
      const status = err.status || 500;
      return res.status(status).send(err.message);
    });
  }

  startListening() {
    this.app.listen(process.env.PORT, () => {
      console.log("Started listening on port", process.env.PORT);
    });
  }
}

new CRUDServer().start();