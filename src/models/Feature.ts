import { Schema, model, Document } from 'mongoose'

export interface FeatureAttributes {
  name: string
  qty: number
  imageUrl: string
  createdAt?: Date
  updatedAt?: Date
}

interface FeatureCreationAttributes extends FeatureAttributes, Document {}

const FeatureSchema = new Schema(
  {
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
)

const Feature = model<FeatureCreationAttributes>('Categories', FeatureSchema)

export default Feature
