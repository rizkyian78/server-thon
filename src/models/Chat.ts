import { Schema, model, Document } from 'mongoose'

export interface ChatAttributes {
  body: string
  createdAt?: Date
  updatedAt?: Date
}

interface ChatCreationAttributes extends ChatAttributes, Document {}

const CategorySchema = new Schema(
  {
    body: { type: String, required: true },
  },
  { timestamps: true }
)

const Chat = model<ChatCreationAttributes>('Chat', CategorySchema)

export default Chat
