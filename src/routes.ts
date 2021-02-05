import express from "express";
import BooksController from "./controllers/BooksController";
const routes = express.Router();
const books = new BooksController();

routes.post("/obras", books.create);
routes.get("/obras", books.index);
routes.put("/obras/:id", books.update);
routes.delete("/obras/:id", books.remove);
export default routes;
