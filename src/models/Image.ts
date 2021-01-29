import { Schema, model, Document } from 'mongoose'

export interface ImageAttributes {
  imageUrl: string
  createdAt?: Date
  updatedAt?: Date
}

interface ImageCreationAttributes extends ImageAttributes, Document {}

const ImageSchema = new Schema(
  {
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
)

const Image = model<ImageCreationAttributes>('Images', ImageSchema)

export default Image
