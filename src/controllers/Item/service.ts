/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-const */
import { Request } from 'express'
import models, { FilterQueryAttributes } from 'models'
import { filterQueryObject } from 'helpers/Common'
import ResponseError from 'modules/Response/ResponseError'
import { ItemAttributes } from 'models/Item'

const { Item, Image, Category } = models

interface IItemAttributes extends ItemAttributes {
  images: [
    {
      path: string
    }
  ]
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

    const data = await Item.find(filterObject)
      .limit(Number(pageSize))
      .skip(Number(pageSize) * Number(page))
      .sort({ createdAt: 'desc' })
      .populate({
        path: 'categoryId',
        select: 'id name',
      })

    const total = await Item.countDocuments(filterObject)

    return { message: `${total} data has been received.`, data, total }
  }

  /**
   *
   * @param id
   */
  public static async getOne(id: string) {
    const data = await Item.findById(id).populate({
      path: 'images',
      select: 'id imageUrl',
    })
    if (!data) {
      throw new ResponseError.NotFound(
        'Item data not found or has been deleted'
      )
    }

    return data
  }

  /**
   *
   * @param formData
   */
  public static async create(formData: IItemAttributes) {
    const { images } = formData
    delete formData?.images
    // const value = useValidation(schema.create, formData)
    if (images.length > 0) {
      const category = await Category.findOne({ _id: formData.categoryId })
      const newItem = {
        ...formData,
        categoryId: category?.id,
      }
      const item = await Item.create(newItem)
      const findItem = await Item.findById(item.id)
      category?.update({ itemId: item.id })
      const imageIdList: any[] = []
      for (const item in images) {
        /* eslint-disable no-await-in-loop */
        const imageSave = await Image.create({
          imageUrl: images[item].path.replace('public', ''),
        })
        imageIdList.push(imageSave._id)
      }
      await findItem?.update({ images: imageIdList })
    }

    return 'Nice'
  }

  /**
   *
   * @param id
   * @param formData
   */
  public static async update(id: string, formData: ItemAttributes) {
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
    await Item.findByIdAndRemove(id)
  }
}

export default CategoryService
