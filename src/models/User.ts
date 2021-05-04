import bcrypt from 'bcrypt'
import { Schema, model, Document } from 'mongoose'
import userSchema from 'controllers/User/schema'

export interface UserAttributes {
  firstName: string
  email: string
  password?: string | null
  phone: string
  active?: boolean | null
  tokenVerify?: string | null
  newPassword?: string
  confirmNewPassword?: string
  Role?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface TokenAttributes {
  data: UserAttributes
  message: string
}

export interface LoginAttributes {
  email: string
  password: string
}

export interface EmailAttributes {
  email: string | any
  firstName: string
}

export function setUserPassword(instance: UserAttributes) {
  const { newPassword, confirmNewPassword } = instance
  const fdPassword = { newPassword, confirmNewPassword }
  const validPassword = userSchema.createPassword.validateSyncAt(
    'confirmNewPassword',
    fdPassword
  )
  const saltRounds = 10
  const hash = bcrypt.hashSync(validPassword, saltRounds)
  const password = hash
  return password
}

interface UserCreationAttributes extends UserAttributes, Document {}

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    phone: { type: String, required: true },
    active: { type: Boolean, default: true, required: true },
    tokenVerify: { type: String, required: false },
    Role: { type: Schema.Types.ObjectId, required: false, ref: 'Roles' },
  },
  { timestamps: true }
)

UserSchema.methods.comparePassword = function (
  candidatePassword: string,
  password: string
) {
  console.log({ candidatePassword, password })
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, password, function (err, isMatch) {
      if (err) {
        reject(err)
      }

      resolve(isMatch)
    })
  })
}

const User = model<UserCreationAttributes>('Users', UserSchema)

export default User
