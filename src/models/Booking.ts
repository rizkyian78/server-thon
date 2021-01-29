import { Schema, model, Document } from 'mongoose'

export interface BookingAttributes {
  bookingStartDate: Date
  bookingEndDate: Date
  night: number
  proofPayment: string
  bankFrom: string
  accountHolder: string
  itemId: any
  userId: string
  status: string
  createdAt?: Date
  updatedAt?: Date
}

interface BookingCreationAttributes extends BookingAttributes, Document {}

const BookingSchema = new Schema(
  {
    bookingStartDate: { type: Date, required: true },
    bookingEndDate: { type: Date, required: true },
    night: { type: Number, required: true },
    itemId: [
      {
        _id: { type: Schema.Types.ObjectId, ref: 'Items', required: true },
        price: { type: Number, required: true },
        night: {
          type: Number,
          required: true,
        },
      },
    ],
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
    proofPayment: { type: String, required: true },
    bankFrom: { type: String, required: true },
    accountHolder: { type: String, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
)

const Booking = model<BookingCreationAttributes>('Bookings', BookingSchema)

export default Booking
