/* eslint-disable no-undef */
// @ts-ignore
import mongoose from 'mongoose'
import AuthService from 'controllers/Auth/service'
import faker from 'faker'
import User from 'models/User'
import UserService from 'controllers/User/service'

require('dotenv').config()

let idUserDelete: string = ''

beforeAll(async () => {
  const USERNAME = process.env.MONGODB_USERNAME_TEST
  const PASSWORD = process.env.MONGODB_PASSWORD_TEST
  const AUTH_SOURCE = process.env.MONGODB_AUTH_TEST
  const HOST = process.env.MONGODB_HOST_TEST
  const PORT = process.env.MONGODB_PORT_TEST
  const COLLECTION = process.env.MONGODB_DATABASE_TEST
  const setUri = `mongodb://${HOST}:${PORT}/${COLLECTION}`
  const setOptions = {
    user: USERNAME,
    pass: PASSWORD,
    authSource: AUTH_SOURCE,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }

  const initialMongoDB = () => {
    // Connecting to the database
    mongoose
      .connect(setUri, setOptions)
      .then(() => {
        console.log('Successfully connected to the MongoDB database')
      })
      .catch((err) => {
        console.log('Could not connect to the MongoDB database:', err)
        process.exit()
      })
  }
  initialMongoDB()
  const user = await UserService.create({
    firstName: 'test',
    email: 'jancok@email.com',
    phone: '08113363807',
    newPassword: 'anyValue12',
    confirmNewPassword: 'anyValue12',
  })
  idUserDelete = user.id
})

afterAll(async () => {
  await User.findByIdAndDelete(idUserDelete)
  await mongoose.disconnect()
})

function mockRequest() {
  return {}
}

test('Should Successfully create user', async (done) => {
  const req: any = mockRequest()

  req.firstName = faker.name.findName()
  req.email = faker.internet.email()
  req.phone = faker.phone.phoneNumber()
  req.newPassword = 'anyvalue12'
  req.confirmNewPassword = 'anyvalue12'

  const data = await AuthService.signUp(req)
  expect(data).toEqual('user created')
  done()
})

test(`Should successfully generating error when user not exist`, (done) => {
  const req: any = mockRequest()

  req.email = faker.internet.email()
  req.newPassword = 'anyvalue12'
  const message =
    'please check your email account to verify your email and continue the registration process.'
  AuthService.signIn(req).catch((err): void => {
    expect(err.message).toEqual(message)
  })
  done()
})

test(`Should successfully get one User`, async (done) => {
  const data = await AuthService.signIn({
    email: 'test@email.com',
    password: 'anyValue12',
  })
  console.log(data)
  done()
})
