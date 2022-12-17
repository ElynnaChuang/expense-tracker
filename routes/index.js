const express = require('express')
const router = express.Router()

const users = require('./modules/users')
const home = require('./modules/home')
const records = require('./modules/records')

const { authenticator } = require('../middleware/authentication')

router.use('/users', users)
router.use('/records', authenticator, records)
router.use('/', authenticator, home)

module.exports = router