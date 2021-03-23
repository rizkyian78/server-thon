/* eslint-disable prefer-const */
import { Request, Response } from 'express'
import asyncHandler from 'helpers/asyncHandler'
import routes from 'routes/public'
import EmailProvider from 'config/email'
import Authorization from 'middlewares/Authorization'
import BuildResponse from 'modules/Response/BuildResponse'
import DashboardService from './service'

routes.get(
  '/dashboard',
  // Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const data = await DashboardService.getAll(req)
    const buildResponse = BuildResponse.get({ data })
    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/statistic-by-month',
  // Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const data = await DashboardService.getDataPerMonth(req)
    const buildResponse = BuildResponse.get({ data })
    return res.status(200).json(buildResponse)
  })
)
