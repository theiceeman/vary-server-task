import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Book from 'App/Models/Book';
import Order from 'App/Models/Order';
import User from 'App/Models/User';
import { formatErrorMessage } from 'App/helpers/utils';

export default class OrderService {
  public async create({ request, response }: HttpContextContract) {
    try {
      const data = request.body();

      let user = await User
        .query()
        .where('unique_id', data.user_id).firstOrFail()

      let book = await Book
        .query()
        .where('unique_id', data.book_id).firstOrFail()

      await User
        .query()
        .where('unique_id', user.uniqueId)
        .update(
          {
            point: user.point - Number(book.price),
          }
        )

      let result = await Order.create({
        book_id: data.book_id,
        user_id: data.user_id,
        status: 'pending',
      });
      if (result !== null) {
        response.status(200).json({ data: "Order created." });
      } else {
        response.status(400).json({ data: "Action failed!" });
      }

    } catch (error) {
      response.status(400).json({ data: await formatErrorMessage(error) })
    }
  }
  public async complete({ request, response }: HttpContextContract) {
    try {
      const data = request.body();

      await User
        .query()
        .where('unique_id', data.user_id).firstOrFail()

      await Book
        .query()
        .where('unique_id', data.book_id).firstOrFail()


      let order = await Order
        .query()
        .where('unique_id', data.book_id).firstOrFail()

      if (order.status !== 'pending') {
        throw new Error('Order already completed or cancelled!')
      }

      let result = await Order
        .query()
        .where('unique_id', order.uniqueId)
        .update(
          {
            status: 'completed',
          }
        )

      if (result !== null) {
        response.status(200).json({ data: "Order completed." });
      } else {
        response.status(400).json({ data: "Action failed!" });
      }

    } catch (error) {
      response.status(400).json({ data: await formatErrorMessage(error) })
    }
  }

  public async cancel({ request, response }: HttpContextContract) {
    try {
      const data = request.body();

      let user = await User
        .query()
        .where('unique_id', data.user_id).firstOrFail()

      let book = await Book
        .query()
        .where('unique_id', data.book_id).firstOrFail()

      let order = await Order
        .query()
        .where('unique_id', data.book_id).firstOrFail()

      if (order.status !== 'pending') {
        throw new Error('Order already completed or cancelled!')
      }

      await User
        .query()
        .where('unique_id', user.uniqueId)
        .update(
          {
            point: user.point + Number(book.price),
          }
        )

      let result = await Order
        .query()
        .where('unique_id', order.uniqueId)
        .update(
          {
            status: 'cancelled',
          }
        )


      if (result !== null) {
        response.status(200).json({ data: "Order cancelled." });
      } else {
        response.status(400).json({ data: "Action failed!" });
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
      let data = await Database.from("orders")
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
