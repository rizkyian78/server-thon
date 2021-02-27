import { Schema, model, Document } from 'mongoose'

export interface CategoryAttributes {
  name: string
  itemId: string
  createdAt?: Date
  updatedAt?: Date
}

interface CategoryCreationAttributes extends CategoryAttributes, Document {}

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    itemId: { type: Schema.Types.ObjectId, ref: 'Item' },
  },
  { timestamps: true }
)

const Category = model<CategoryCreationAttributes>('Category', CategorySchema)

export default Category
