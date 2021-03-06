/* eslint-disable prefer-const */
import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'helpers/asyncHandler'
import routes from 'routes/public'
import multer from 'modules/ConfigMulter'
import { MulterError } from 'multer'
import BuildResponse from 'modules/Response/BuildResponse'
import FeatureService from './service'

const uploadFile = multer.fields([{ name: 'imageUrl', maxCount: 1 }])
function upload(req: Request, res: Response, next: NextFunction) {
  uploadFile(req, res, function (err: any) {
    if (err instanceof MulterError) {
      res
        .status(400)
        .json({ message: 'Mohon Untuk upload file yang kurang dari 2mb' })
    } else if (err) {
      res
        .status(400)
        .json({ message: 'Hanya .png .jpg .jpeg yang dapat diterima' })
    }
    next()
  })
}
const setFileToBody = asyncHandler(async function setFileToBody(
  req: Request,
  res,
  next: NextFunction
) {
  const objFile = req.pickSingleFieldMulter(['imageUrl'])
  req.setBody(objFile)
  next()
})

routes.get(
  '/feature',
  // Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const { data, message, total } = await FeatureService.getAll(req)
    const buildResponse = BuildResponse.get({ data, message, total })
    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/feature/:id',
  //   Authorization,
  asyncHandler(async function getOne(req: Request, res: Response) {
    const { id } = req.getParams()

    const data = await FeatureService.getOne(id)
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.post(
  '/feature',
  //   Authorization,
  upload,
  setFileToBody,
  asyncHandler(async function createData(req: Request, res: Response) {
    const formData = req.getBody()
    console.log(formData)
    const data = await FeatureService.create(formData)
    const buildResponse = BuildResponse.created({ data })

    return res.status(201).json(buildResponse)
  })
)

routes.put(
  '/feature/:id',
  //   Authorization,
  upload,
  setFileToBody,
  asyncHandler(async function updateData(req: Request, res: Response) {
    const { id } = req.getParams()
    const formData = req.getBody()

    const data = await FeatureService.update(id, formData)
    const buildResponse = BuildResponse.updated({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.delete(
  '/feature/:id',
  // Authorization,
  asyncHandler(async function deleteData(req: Request, res: Response) {
    const { id } = req.getParams()

    await FeatureService.delete(id)
    const buildResponse = BuildResponse.deleted({})

    return res.status(200).json(buildResponse)
  })
)
