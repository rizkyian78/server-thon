/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import { Request } from 'express'
import models, { FilterQueryAttributes } from 'models'
import { filterQueryObject, validateBoolean } from 'helpers/Common'
import ResponseError from 'modules/Response/ResponseError'
import { FeatureAttributes } from 'models/Feature'
import { isString } from 'lodash'

const { Feature } = models

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

    const data = await Feature.find(filterObject)
      .limit(Number(pageSize))
      .skip(Number(pageSize) * Number(page))
      .sort({ createdAt: 'desc' })

    const total = await Feature.countDocuments(filterObject)

    return { message: `${total} data has been received.`, data, total }
  }

  /**
   *
   * @param id
   */
  public static async getOne(id: string) {
    const data = await Feature.findById(id)

    if (!data) {
      throw new ResponseError.NotFound(
        'Feature data not found or has been deleted'
      )
    }

    return data
  }

  /**
   *
   * @param formData
   */
  public static async create(formData: FeatureAttributes) {
    // const value = useValidation(schema.create, formData)
    if (isString(formData.imageUrl)) {
      formData.imageUrl = false
    }
    console.log(formData)
    const data = await Feature.create({
      ...formData,
      imageUrl: formData.imageUrl
        ? formData.imageUrl.path.replace('public', '')
        : null,
    })

    return data
  }

  /**
   *
   * @param id
   * @param formData
   */
  public static async update(id: string, formData: FeatureAttributes) {
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
    await Feature.findByIdAndRemove(id)
  }
}

export default CategoryService
