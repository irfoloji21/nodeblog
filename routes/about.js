const express = require('express')
const router = express.Router()
const About = require('../models/About')
const path = require('path')



router.get('/', (req,res) => {
  About.find({}).lean().then(about => {
      res.render('site/about', {about:about})
    })
})


router.post('/test', (req,res) => {

    let about_image = req.files.about_image

    about_image.mv(path.resolve(__dirname, '../public/img/postimages', about_image.name))

    About.create({
        ...req.body,
        about_image:`/img/postimages/${about_image.name}`,
        author: req.session.userId
    },  )

    req.session.sessionFlash = {
      type: 'alert alert-success',
      message: 'Postunuz başarılı bir şekilde oluşturuldu'
    }


    res.redirect('/admin/about')
})

module.exports = router