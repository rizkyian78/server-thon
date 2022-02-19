/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import { Request } from 'express'
import models, { FilterQueryAttributes } from 'models'
import { filterQueryObject } from 'helpers/Common'
import ResponseError from 'modules/Response/ResponseError'
import useValidation from 'helpers/useValidation'
import { ChatAttributes } from 'models/Chat'
import { Socket } from 'socket.io'

const { Chat } = models

class CategoryService {
  /**
   *
   * @param req - Request
   */
  public static async getAll(req: Request) {
    let {
      page,
      pageSize,
      filtered,
      sorted,
    }: FilterQueryAttributes = req.getQuery()
    if (!page) page = 0
    if (!pageSize) pageSize = 999
    const filterObject = filtered ? filterQueryObject(JSON.parse(filtered)) : {}

    const data = await Chat.find(filterObject)
      .limit(Number(pageSize))
      .skip(Number(pageSize) * Number(page))
      .sort({ createdAt: 'asc' })

    const total = await Chat.countDocuments(filterObject)

    return { message: `${total} data has been received.`, data, total }
  }

  /**
   *
   * @param id
   */
  public static async getOne(id: string) {
    const data = await Chat.findById(id)

    if (!data) {
      throw new ResponseError.NotFound(
        'Chat data not found or has been deleted'
      )
    }

    return data
  }

  /**
   *
   * @param formData
   */
  public static async create(socket: Socket, formData: ChatAttributes) {
    // const value = useValidation(schema.create, formData)

    const data = await Chat.create({ body: formData.context })
    socket.emit('message', {
      context: formData.context,
    })
    return data
  }

  /**
   *
   * @param id
   * @param formData
   */
  public static async update(id: string, formData: ChatAttributes) {
    const data = await this.getOne(id)

    // const value = useValidation(schema.create, {
    //   ...data.toJSON(),
    //   ...formData,
    // })

    await data.updateOne(formData || {})

    return data
  }

  /**
   *
   * @param id
   */
  public static async delete(id: string) {
    await Chat.findByIdAndRemove(id)
  }
}

export default CategoryService
