/* eslint-disable prefer-const */
import { Request, Response } from 'express'
import asyncHandler from 'helpers/asyncHandler'
import routes from 'routes/public'
import EmailProvider from 'config/email'
import Authorization from 'middlewares/Authorization'
import BuildResponse from 'modules/Response/BuildResponse'
import CategoryService from './service'

const sendMail = new EmailProvider().send
routes.get(
  '/category',
  // Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const emailContext = `Sam Wes Ublem durung email e ?.`
    sendMail(['rizkyian78@gmail.com'], `Sul`, emailContext)
    const { data, message, total } = await CategoryService.getAll(req)
    const buildResponse = BuildResponse.get({ data, message, total })
    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/category/:id',
  //   Authorization,
  asyncHandler(async function getOne(req: Request, res: Response) {
    const { id } = req.getParams()

    const data = await CategoryService.getOne(id)
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.post(
  '/category',
  //   Authorization,
  asyncHandler(async function createData(req: Request, res: Response) {
    const formData = req.getBody()

    const data = await CategoryService.create(formData)
    const buildResponse = BuildResponse.created({ data })

    return res.status(201).json(buildResponse)
  })
)

routes.put(
  '/category/:id',
  //   Authorization,
  asyncHandler(async function updateData(req: Request, res: Response) {
    const { id } = req.getParams()
    const formData = req.getBody()

    const data = await CategoryService.update(id, formData)
    const buildResponse = BuildResponse.updated({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.delete(
  '/category/:id',
  // Authorization,
  asyncHandler(async function deleteData(req: Request, res: Response) {
    const { id } = req.getParams()

    await CategoryService.delete(id)
    const buildResponse = BuildResponse.deleted({})

    return res.status(200).json(buildResponse)
  })
)
