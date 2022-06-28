const express = require('express')
const router = express.Router()
const Service = require('../models/Service')
const path = require('path')






router.post('/test', (req,res) => {


    Service.create({
        ...req.body,
        author: req.session.userId
    },  )


    res.redirect('/admin/service')
})

module.exports = router