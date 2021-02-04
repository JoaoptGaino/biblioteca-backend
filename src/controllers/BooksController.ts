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
}
