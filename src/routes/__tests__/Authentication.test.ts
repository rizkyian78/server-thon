/* eslint-disable no-undef */
// @ts-ignore
import AuthService from 'controllers/Auth/service'
import faker from 'faker'

require('dotenv').config()

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

test(`Should successfully generating error when user not exist`, async (done) => {
  const req: any = mockRequest()

  req.email = faker.internet.email()
  req.newPassword = 'anyvalue12'
  const message =
    'please check your email account to verify your email and continue the registration process.'

  try {
    const data = await AuthService.signIn(req)
    expect(data).toBeTruthy()
  } catch (error) {
    expect(error.message).toEqual(message)
  }
  done()
})
