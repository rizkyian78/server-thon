import { Request, Response } from 'express'
import routes from 'routes/public'
import asyncHandler from 'helpers/asyncHandler'
import Authorization from 'middlewares/Authorization'
import BuildResponse from 'modules/Response/BuildResponse'
import AuthService from 'controllers/Auth/service'
import RefreshTokenService from 'controllers/RefreshToken/service'

routes.post(
  '/auth/sign-up',
  asyncHandler(async function signUp(req: Request, res: Response) {
    const formData = req.getBody()

    const data = await AuthService.signUp(formData)
    const buildResponse = BuildResponse.get(data)

    return res.status(201).json(buildResponse)
  })
)

routes.post(
  '/auth/sign-in',
  asyncHandler(async function signIn(req: Request, res: Response) {
    const formData = req.getBody()
    const data = await AuthService.signIn(formData)
    const buildResponse = BuildResponse.get(data)

    return res
      .cookie('token', data.accessToken, {
        maxAge: Number(data.expiresIn) * 1000, // 7 Days
        httpOnly: true,
        path: '/v1',
        secure: process.env.NODE_ENV === 'production',
      })
      .json(buildResponse)
  })
)

routes.post(
  '/auth/refresh-token',
  Authorization,
  asyncHandler(async function authRefreshToken(req: Request, res: Response) {
    const { email, refreshToken } = req.getBody()

    const data = await RefreshTokenService.getAccessToken(email, refreshToken)
    const buildResponse = BuildResponse.get(data)

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/profile',
  Authorization,
  asyncHandler(async function getProfile(req: Request, res: Response) {
    const userData = req.getState('user')

    const data = await AuthService.profile(userData._id)
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.post(
  '/logout',
  Authorization,
  asyncHandler(async function logout(req: Request, res: Response) {
    const { UserId } = req.getBody()

    const message = await AuthService.logout(UserId)
    const buildResponse = BuildResponse.deleted({ message })

    return res.status(200).json(buildResponse)
  })
)
