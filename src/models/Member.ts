import { Schema, model, Document } from 'mongoose'

export interface MemberAttributes {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  createdAt?: Date
  updatedAt?: Date
}
interface MemberCreationAttributes extends MemberAttributes, Document {}

const MemberSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
  },
  { timestamps: true }
)

const Member = model<MemberCreationAttributes>('Member', MemberSchema)

export default Member
