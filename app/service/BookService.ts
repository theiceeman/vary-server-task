import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Book from 'App/Models/Book';
import { formatErrorMessage } from 'App/helpers/utils';

export default class BookService {
  public async create({ request, response }: HttpContextContract) {
    try {
      const data = request.body();

      let result = await Book.create({
        title: data.title,
        writer: data.writer,
        cover_image: data.cover_image,
        price: data.price,
        tags: data.tags,
      });
      if (result !== null) {
        response.status(200).json({ data: "Book created." });
      } else {
        response.status(400).json({ data: "Book creation failed!" });
      }

    } catch (error) {
      response.status(400).json({ data: await formatErrorMessage(error) })
    }
  }


  public async view({
    params,
    response,
  }: HttpContextContract) {
    try {
      let data = await Database.from("books")
        .paginate(
          params.page,
          params.limit
        );
      response.status(200).json({ data });
    } catch (error) {
      response.status(400).json({ data: error.message });
    }
  }


}
