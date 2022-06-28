import express from "express";
import cors from "cors";

export class AppServer {
  readonly #app;

  constructor() {
    this.#app = express();

    this.routes();
  }

  routes() {
    this.#app.use("/api", require("./routes/product.routes"));
  }

  get app() {
    return this.#app;
  }
}
