const express = require ("express")

const router = express.Router()

//routes

router.use('/auth', require("./auth/auth"));

module.exports = router;