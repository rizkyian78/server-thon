import { Schema, model, Document, Types } from 'mongoose'

export interface ItemAttributes {
  title: string
  price: number
  country: string
  city: string
  isPopular: boolean
  description: string
  categoryId: string
  images: Types.ObjectId[]
  featureId: []
  activityId: []
  createdAt?: Date
  updatedAt?: Date
}

interface ItemCreationAttributes extends ItemAttributes, Document {}

const ItemSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    country: { type: String, required: true, default: 'Indonesia' },
    city: { type: String, required: true },
    isPopular: { type: Boolean, required: true, default: false },
    description: { type: String, required: true },
    images: [{ type: Schema.Types.ObjectId, required: true, ref: 'Images' }],
    featureId: [{ type: Schema.Types.ObjectId, ref: 'Features' }],
    activityId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Activities',
      },
    ],
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
  },
  { timestamps: true }
)

const Item = model<ItemCreationAttributes>('Items', ItemSchema)

export default Item
