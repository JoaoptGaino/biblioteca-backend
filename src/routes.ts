import express from "express";
import BooksController from "./controllers/BooksController";
const routes = express.Router();
const books = new BooksController();

routes.post("/obras", books.create);
routes.get("/obras", books.index);
routes.get("/", (req, res) => {
  return res.json({
    message: "Hello",
  });
});

export default routes;
