/* eslint-disable no-unused-vars */
import multer from 'multer'
import { Request, Express } from 'express'
import ResponseError from 'modules/Response/ResponseError'
import path from 'path'

const maxSize = 3 * 1024 * 1024
const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename(req: Request, file: Express.Multer.File, cb): void {
    cb(null, [Date.now(), file.originalname].join('-'))
  },
})

const ConfigMulter = multer({
  storage,
  limits: { fileSize: maxSize },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      return cb(new Error('Hanya .png .jpg .jpeg yang dapat diterima'))
    }
    cb(null, true)
  },
})

export default ConfigMulter
