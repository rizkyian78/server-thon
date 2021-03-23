import { Schema, model, Document } from 'mongoose'

export interface BookingAttributes {
  bookingStartDate: Date
  bookingEndDate: Date
  night: number
  invoice: string
  itemId: {
    _id: string
    title: string
    price: number
    duration: number
  }
  total: number
  memberId: string
  bankId: string
  payment: {
    proofPayment: string
    bankFrom: String
    accountHolder: string
    status: string
  }
  createdAt?: Date
  updatedAt?: Date
}

interface BookingCreationAttributes extends BookingAttributes, Document {}

const BookingSchema = new Schema(
  {
    bookingStartDate: { type: Date, required: true },
    bookingEndDate: { type: Date, required: true },
    night: { type: Number, required: true },
    invoice: { type: String, required: true },
    itemId: {
      _id: { type: Schema.Types.ObjectId, ref: 'Items', required: true },
      title: { type: String, required: true },
      price: { type: Number, required: true },
      duration: { type: Number, required: true },
    },
    total: { type: Number, required: true },
    memberId: { type: Schema.Types.ObjectId, required: true, ref: 'Member' },
    bankId: { type: Schema.Types.ObjectId, required: true, ref: 'Banks' },
    payment: {
      proofPayment: { type: String, required: true },
      bankFrom: { type: String, required: true },
      accountHolder: { type: String, required: true },
      status: { type: String, required: true },
    },
  },
  { timestamps: true }
)

const Booking = model<BookingCreationAttributes>('Bookings', BookingSchema)

export default Booking
