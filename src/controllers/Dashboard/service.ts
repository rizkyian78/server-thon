/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import { Request } from 'express'
import models, { FilterQueryAttributes } from 'models'
import { filterQueryObject } from 'helpers/Common'
import moment from 'moment'

const { Member, Item, Booking } = models

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

    const totalMember = await Member.countDocuments(filterObject)
    const totalHouse = await Item.countDocuments(filterObject)
    const totalBooking = await Booking.countDocuments(filterObject)

    return { totalHouse, totalMember, totalBooking }
  }

  public static async getDataPerMonth(req: Request) {
    let {
      page,
      pageSize,
      filtered,
      sorted,
    }: FilterQueryAttributes = req.getQuery()
    if (!page) page = 0
    if (!pageSize) pageSize = 999

    const data = await Booking.find()

    return data
  }
}

export default CategoryService
