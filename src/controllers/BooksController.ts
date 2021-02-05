import { Request, Response } from "express";
import db from "../database/connection";

export default class BooksController {
  async index(req: Request, res: Response) {
    const books = await db("books").select("*");
    return res.status(200).json(books);
  }
  async create(req: Request, res: Response) {
    const { title, publisher, photo, authors } = req.body;
    const trx = await db.transaction();
    const createBookRegister = { title, publisher, photo, authors };
    try {
      await trx("books").insert(createBookRegister);
      await trx.commit();
      return res.status(200).json(createBookRegister).send();
    } catch (err) {
      console.log(err);
      await trx.rollback();
      return res.status(500).json({
        message: "Error while creating",
      });
    }
  }
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { title, publisher, photo, authors } = req.body;
    const updatedBook = { title, publisher, photo, authors };

    try {
      await db("books").update(updatedBook).where("id", "=", id);
      return res.json(updatedBook);
    } catch (err) {
      return res.status(500).json({
        message: "Couldn't update",
      });
    }
  }
  async remove(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await db("books").delete().where("id", "=", id);
      return res.status(200).json({
        message: "Removed succesfully",
      });
    } catch (err) {
      return res.status(500).json({
        message: "Unable to remove",
      });
    }
  }
}
