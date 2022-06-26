const express = require('express')
const router = express.Router()
const Category = require('../models/Category')
const path = require('path')

router.post('/test', (req,res) => {


    Category.create({
        ...req.body,
        author: req.session.userId
    },  )

    req.session.sessionFlash = {
      type: 'alert alert-success',
      message: 'Postunuz başarılı bir şekilde oluşturuldu'
    }


    res.redirect('/admin/categories')
})
module.exports = router