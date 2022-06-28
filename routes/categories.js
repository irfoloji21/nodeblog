const express = require('express')
const router = express.Router()
const Category = require('../models/Category')

router.post('/test', (req,res) => {


    Category.create({
        ...req.body,
        author: req.session.userId
    },  )



    res.redirect('/admin/categories')
})
module.exports = router