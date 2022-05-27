const express = require('express')
const router = express.Router()
const Service = require('../models/Service')
const path = require('path')






router.post('/test', (req,res) => {


    Service.create({
        ...req.body,
        author: req.session.userId
    },  )

    req.session.sessionFlash = {
      type: 'alert alert-success',
      message: 'Postunuz başarılı bir şekilde oluşturuldu'
    }


    res.redirect('/admin/service')
})

module.exports = router