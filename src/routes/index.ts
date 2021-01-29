// eslint-disable-next-line no-unused-vars
import express, { Request, Response, NextFunction } from 'express'
import ResponseError from 'modules/Response/ResponseError'
import publicRoute from './public'

const router = express.Router()

/* Home Page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
  return res.render('index')
})

/* Forbidden Page. */
router.get('/v1', function (req: Request, res: Response, next: NextFunction) {
  throw new ResponseError.Forbidden('forbidden, wrong access endpoint')
})

/* Declare Route */
router.use('/v1', publicRoute)

/* Not Found Page. */
// router.get('*', function (req: Request, res: Response, next: NextFunction) {
//   throw new ResponseError.NotFound('endpoint not found')
// })

export default router
