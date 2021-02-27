/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import { Request } from 'express'
import models, { FilterQueryAttributes } from 'models'
import { filterQueryObject } from 'helpers/Common'
import ResponseError from 'modules/Response/ResponseError'
import useValidation from 'helpers/useValidation'
import { BankAttributes } from 'models/Bank'

const { Bank } = models

interface IBankAttributes extends BankAttributes {
  image: {
    path: string
  }
}

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

    const data = await Bank.find(filterObject)
      .limit(Number(pageSize))
      .skip(Number(pageSize) * Number(page))
      .sort({ createdAt: 'asc' })

    const total = await Bank.countDocuments(filterObject)

    return { message: `${total} data has been received.`, data, total }
  }

  /**
   *
   * @param id
   */
  public static async getOne(id: string) {
    const data = await Bank.findById(id)

    if (!data) {
      throw new ResponseError.NotFound(
        'Bank data not found or has been deleted'
      )
    }

    return data
  }

  /**
   *
   * @param formData
   */
  public static async create(formData: IBankAttributes) {
    // const value = useValidation(schema.create, formData)
    console.log(formData.image)
    const data = await Bank.create({
      ...formData,
      imageUrl: formData.image.path.replace('public', ''),
    })

    return data
  }

  /**
   *
   * @param id
   * @param formData
   */
  public static async update(id: string, formData: IBankAttributes) {
    const data = await this.getOne(id)

    // const value = useValidation(schema.create, {
    //   ...data.toJSON(),
    //   ...formData,
    // })

    await data.updateOne({
      ...formData,
      imageUrl: formData.image.path.replace('public', ''),
    })

    return data
  }

  /**
   *
   * @param id
   */
  public static async delete(id: string) {
    await Bank.findByIdAndRemove(id)
  }
}

export default CategoryService
