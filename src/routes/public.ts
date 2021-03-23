import express from 'express'

const router = express.Router()

export default router

require('controllers/Auth/controller')
require('controllers/User/controller')
require('controllers/Role/controller')
require('controllers/RefreshToken/controller')
require('controllers/Category/controller')
require('controllers/Bank/controller')
require('controllers/Feature/controller')
require('controllers/Item/controller')
require('controllers/Chat/controller')
require('controllers/Booking/controller')
require('controllers/Member/controller')
require('controllers/Dashboard/controller')
