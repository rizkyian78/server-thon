/* eslint-disable no-undef */
// @ts-ignore
import AuthService from 'controllers/Auth/service'
import User from 'models/User'
import mongoose from 'mongoose'

require('dotenv').config()

let connection

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

  connection = () => {
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
  connection()
})

afterAll(async () => {
  await User.deleteOne({ email: 'any@email.com' })
  mongoose.disconnect()
})

test('Should Successfully create user', async (done) => {
  const data = await AuthService.signUp({
    firstName: 'any',
    email: 'any@email.com',
    phone: '08113363807',
    newPassword: 'anyvalue12',
    confirmNewPassword: 'anyvalue12',
  })
  expect(data).toEqual('user created')
  done()
})

test('Should Return falsy when random value given', async (done) => {
  const data = await AuthService.signIn({
    email: 'any@email.com',
    password: 'anyvalue12',
  })
  console.log(data, '<<<<<<<<<<<< ini data')
  done()
})
