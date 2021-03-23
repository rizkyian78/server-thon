/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import { Request } from 'express'
import models, { FilterQueryAttributes } from 'models'
import { filterQueryObject } from 'helpers/Common'
import ResponseError from 'modules/Response/ResponseError'
import useValidation from 'helpers/useValidation'
import { BookingAttributes } from 'models/Booking'

const { Booking } = models

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

    const data = await Booking.find(filterObject)
      .limit(Number(pageSize))
      .skip(Number(pageSize) * Number(page))
      .sort({ createdAt: 'desc' })
      .populate('itemId._id')
      .populate('memberId')
      .populate('bankId')

    const total = await Booking.countDocuments(filterObject)

    return { message: `${total} data has been received.`, data, total }
  }

  /**
   *
   * @param id
   */
  public static async getOne(id: string) {
    const data = await Booking.findById(id)
      .populate('itemId._id')
      .populate('memberId')
      .populate('bankId')

    if (!data) {
      throw new ResponseError.NotFound(
        'Booking data not found or has been deleted'
      )
    }

    return data
  }

  /**
   *
   * @param formData
   */
  public static async create(formData: BookingAttributes) {
    // const value = useValidation(schema.create, formData)
    const data = await Booking.create(formData)

    return data
  }

  /**
   *
   * @param id
   * @param formData
   */
  public static async update(
    req: Request,
    id: string,
    formData: BookingAttributes
  ) {
    const data = await this.getOne(id)

    // const value = useValidation(schema.create, {
    //   ...data.toJSON(),
    //   ...formData,
    // })

    await data.updateOne(formData || {})
    req.io.sockets.emit('status', {
      status: formData.payment.status,
    })
    return data
  }

  /**
   *
   * @param id
   */
  public static async delete(id: string) {
    await Booking.findByIdAndRemove(id)
  }
}

export default CategoryService
