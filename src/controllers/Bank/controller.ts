import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'helpers/asyncHandler'
import routes from 'routes/public'
import Authorization from 'middlewares/Authorization'
import BuildResponse from 'modules/Response/BuildResponse'
import multer from 'modules/ConfigMulter'
import { MulterError } from 'multer'
import CategoryService from './service'

const uploadFile = multer.fields([{ name: 'image', maxCount: 1 }])
function upload(req: Request, res: Response, next: NextFunction) {
  uploadFile(req, res, function (err: any) {
    if (err instanceof MulterError) {
      res
        .status(400)
        .json({ message: 'Mohon Upload File Yang Kurang Dari 2mb' })
    } else if (err) {
      res.status(400).json({ message: err.message })
    }
    next()
  })
}
const setFileToBody = asyncHandler(async function setFileToBody(
  req: Request,
  res,
  next: NextFunction
) {
  const objFile = req.pickSingleFieldMulter(['image'])
  req.setBody(objFile)
  next()
})

routes.get(
  '/bank',
  // Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const { data, message, total } = await CategoryService.getAll(req)
    const buildResponse = BuildResponse.get({ data, message, total })
    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/bank/:id',
  //   Authorization,
  asyncHandler(async function getOne(req: Request, res: Response) {
    const { id } = req.getParams()

    const data = await CategoryService.getOne(id)
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.post(
  '/bank',
  //   Authorization,
  upload,
  setFileToBody,
  asyncHandler(async function createData(req: Request, res: Response) {
    const formData = req.getBody()
    console.log(formData)
    const data = await CategoryService.create(formData)
    const buildResponse = BuildResponse.created({ data })

    return res.status(201).json(buildResponse)
  })
)

routes.put(
  '/bank/:id',
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
  '/bank/:id',
  // Authorization,
  asyncHandler(async function deleteData(req: Request, res: Response) {
    const { id } = req.getParams()

    await CategoryService.delete(id)
    const buildResponse = BuildResponse.deleted({})

    return res.status(200).json(buildResponse)
  })
)
