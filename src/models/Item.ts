import { Schema, model, Document } from 'mongoose'

export interface ItemAttributes {
  title: string
  price: number
  country: string
  city: string
  isPopular: boolean
  description: string
  imageId: any
  featureId: any
  activityId: any
  createdAt?: Date
  updatedAt?: Date
}

interface ItemCreationAttributes extends ItemAttributes, Document {}

const ItemSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true, default: 'Indonesia' },
    isPopular: { type: Boolean, required: true, default: false },
    description: { type: String, required: true },
    imageId: { type: Schema.Types.ObjectId, required: true, ref: 'Images' },
    featureId: { type: Schema.Types.ObjectId, required: true, ref: 'Features' },
    activityId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Activities',
    },
  },
  { timestamps: true }
)

const Item = model<ItemCreationAttributes>('Items', ItemSchema)

export default Item
