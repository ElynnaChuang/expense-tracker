const express = require('express')
const router = express.Router()

const users = require('./modules/users')
const home = require('./modules/home')
const records = require('./modules/records')

router.use('/users', users)
router.use('/records', records)
router.use('/', home)

module.exports = router