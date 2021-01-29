import createError from 'http-errors'
import express, { Request, Response, NextFunction } from 'express'
import path from 'path'
import cors from 'cors'
import helmet from 'helmet'
import logger from 'morgan'
import bodyParser from 'body-parser'
import indexRouter from 'routes'
import withState from 'helpers/withState'
import ExpressErrorYup from 'middlewares/ExpressErrorYup'
import ExpressErrorResponse from 'middlewares/ExpressErrorResponse'
import ExpressErrorMongoose from 'middlewares/ExpressErrorMongoose'
import cookieParser from 'cookie-parser'
import winstonLogger, { winstonStream } from 'config/winston'

const GenerateDoc = require('utils/GenerateDocs')

const app = express()

// view engine setup
app.set('views', path.join(`${__dirname}/../`, 'views'))
// app.set('view engine', 'html')
// app.engine('html', require('hbs').__express)

app.set('view engine', 'pug')

app.use(helmet())
app.use(cors())
app.use(logger('combined', { stream: winstonStream }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(`${__dirname}/../`, 'public')))

app.use((req: Request, res, next) => {
  new withState(req)
  next()
})

// Initial Docs Swagger
GenerateDoc(app)

// Initial Route
app.use(indexRouter)

app.use(ExpressErrorYup)
app.use(ExpressErrorMongoose)
app.use(ExpressErrorResponse)

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404))
})

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // add this line to include winston logging
  winstonLogger.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  )

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
