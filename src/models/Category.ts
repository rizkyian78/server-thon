import { Schema, model, Document } from 'mongoose'

export interface CategoryAttributes {
  name: string
  createdAt?: Date
  updatedAt?: Date
}

interface CategoryCreationAttributes extends CategoryAttributes, Document {}

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
)

const Category = model<CategoryCreationAttributes>('Category', CategorySchema)

export default Category
