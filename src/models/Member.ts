import { Schema, model, Document } from 'mongoose'

export interface ActivityAttributes {
  name: string
  type: string
  imageUrl: string
  isPopular: boolean
  createdAt?: Date
  updatedAt?: Date
}

interface ActivityCreationAttributes extends ActivityAttributes, Document {}

const ActivitySchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    imageUrl: { type: String, required: true },
    isPopular: { type: Boolean, required: true },
  },
  { timestamps: true }
)

const Activity = model<ActivityCreationAttributes>('Activities', ActivitySchema)

export default Activity
