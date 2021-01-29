/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import { Request } from 'express'
import models, { FilterQueryAttributes } from 'models'
import { filterQueryObject } from 'helpers/Common'
import ResponseError from 'modules/Response/ResponseError'
import useValidation from 'helpers/useValidation'
import { CategoryAttributes } from 'models/Category'

const { Category } = models

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
    if (!pageSize) pageSize = 10
    const filterObject = filtered ? filterQueryObject(JSON.parse(filtered)) : {}

    const data = await Category.find(filterObject)
      .limit(Number(pageSize))
      .skip(Number(pageSize) * Number(page))
      .sort({ createdAt: 'asc' })

    const total = await Category.countDocuments(filterObject)

    return { message: `${total} data has been received.`, data, total }
  }

  /**
   *
   * @param id
   */
  public static async getOne(id: string) {
    const data = await Category.findById(id)

    if (!data) {
      throw new ResponseError.NotFound(
        'Category data not found or has been deleted'
      )
    }

    return data
  }

  /**
   *
   * @param formData
   */
  public static async create(formData: CategoryAttributes) {
    // const value = useValidation(schema.create, formData)
    const data = await Category.create({ name: formData.name })

    return data
  }

  /**
   *
   * @param id
   * @param formData
   */
  public static async update(id: string, formData: CategoryAttributes) {
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
    await Category.findByIdAndRemove(id)
  }
}

export default CategoryService
