import { Schema, model, Document } from 'mongoose'

export interface BankAttributes {
  nameBank: string
  nomorRekening: string
  name: string
  imageUrl: string
  createdAt?: Date
  updatedAt?: Date
}

interface BankCreationAttributes extends BankAttributes, Document {}

const BankSchema = new Schema(
  {
    nameBank: { type: String, required: true },
    nomorRekening: { type: String, required: true },
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
)

const Bank = model<BankCreationAttributes>('Banks', BankSchema)

export default Bank
