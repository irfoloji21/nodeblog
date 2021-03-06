const express = require('express')
const router = express.Router()
const Category = require('../../models/Category')
const About = require('../../models/About')
const Post = require('../../models/Post')
const Contact = require('../../models/Contact')
const Service = require('../../models/Service')
const Language = require('../../models/Language')
const path = require('path')

router.get('/', (req,res) => {
    if(!req.session.userId){
        res.redirect('/users/login')
      }
    res.render('admin/index')
})

router.get('/categories', (req,res) => {
    if(!req.session.userId){
        res.redirect('/users/login')
      }
    Category.find({}).sort({$natural:-1}).lean().then(categories =>  {
        res.render('admin/categories', {categories:categories})
    })
})

router.get('/about', (req,res) => {
    if(!req.session.userId){
        res.redirect('/users/login')
      }
    About.find({}).lean().then(about => {
        res.render('admin/about', {about:about})
})
})

router.get('/contact', (req,res) => {
    if(!req.session.userId){
        res.redirect('/users/login')
      }
    Contact.find({}).lean().then(contact => {
        res.render('admin/contact', {contact:contact})
})
})

router.get('/service', (req,res) => {
    if(!req.session.userId){
        res.redirect('/users/login')
      }
    Service.find({}).lean().then(service => {
        res.render('admin/service', {service:service})
})
})


router.delete('/categories/:id', (req,res) => {
  Category.remove({_id : req.params.id}).then(()=>{
      res.redirect('/admin/categories')
  })
})

router.delete('/service/:id', (req,res) => {
    Service.remove({_id : req.params.id}).then(()=>{
        res.redirect('/admin/service')
    })
  })

router.get('/posts', (req,res) => {
    Post.find({}).populate({path:'category', model: Category}).lean().sort({$natural:-1}).lean().then(posts => {
            res.render('/posts/new', {posts:posts})
    })
})

router.delete('/posts/:id', (req,res) => {
    Post.remove({_id : req.params.id}).then(()=>{
        res.redirect('/posts/new')
    })
  })

  router.get('/posts/edit/:id', (req,res) => {
 
    Post.findOne({_id: req.params.id}).populate({path:'category', model: Category}).lean().then(post => {
        Category.find({}).lean().then(categories => {
            Language.find({}).lean().then(language => {
            res.render('admin/editpost', {post:post,categories:categories,language:language})
        })
        })
    })
}) 

router.get('/categories/edit/:id', (req,res) => {
 
    Category.findOne({_id: req.params.id}).lean().sort({$natural:-1}).lean().then(categories =>  {
        res.render('admin/editcategories', {categories:categories})
    })
})

router.get('/contact/edit/:id', (req,res) => {
 
    Contact.findOne({_id: req.params.id}).lean().sort({$natural:-1}).lean().then(contact =>  {
        res.render('admin/editcontact', {contact:contact})
    })
})

router.get('/about/edit/:id', (req,res) => {
 
    About.findOne({_id: req.params.id}).lean().sort({$natural:-1}).lean().then(about =>  {
        res.render('admin/editabout', {about:about})
    })
})

router.get('/service/edit/:id', (req,res) => {
 
    Service.findOne({_id: req.params.id}).lean().sort({$natural:-1}).lean().then(service =>  {
        res.render('admin/editservice', {service:service})
    })
})

router.put('/posts/:id',  (req,res) => {
    Post.findOne({_id: req.params.id}).then(post => {
        if(req.files && req.files.post_image) {
            const post_image = req.files.post_image
            post_image.mv(path.resolve(__dirname, '../../public/img/postimages', post_image.name))
            post.post_image= `/img/postimages/${post_image.name}`
        }

        post.title_tr = req.body.title_tr
        post.title_en = req.body.title_en
        post.title_ar = req.body.title_ar
        post.content_tr = req.body.content_tr
        post.content_en = req.body.content_en
        post.content_ar = req.body.content_ar
        post.language = req.body.language
        post.date = req.body.date
        post.category_id = req.body.category_id
        
        

        post.save().then(post => {
            res.redirect('/posts/new')
        })
    })
})

router.put('/categories/:id',  (req,res) => {

    Category.findOne({_id: req.params.id}).then(category => {
        category.name_tr = req.body.name_tr
        category.name_en = req.body.name_en
        category.name_ar = req.body.name_ar
       

        category.save().then(post => {
            res.redirect('/admin/categories')
        })
    })
})

router.put('/contact/:id',  (req,res) => {

    Contact.findOne({_id: req.params.id}).then(contact => {
        contact.contact_name = req.body.contact_name
        contact.contact_email = req.body.contact_email
        contact.kurumsal_email = req.body.kurumsal_email
        contact.phone = req.body.phone
        contact.adres = req.body.adres
       

        contact.save().then(post => {
            res.redirect('/admin/contact')
        })
    })
})

router.put('/about/:id',  (req,res) => {
    let about_image = req.files.about_image
    about_image.mv(path.resolve(__dirname, '../../public/img/postimages', about_image.name))

    About.findOne({_id: req.params.id}).then(about => {
        about.title_tr = req.body.title_tr
        about.title_en = req.body.title_en
        about.title_ar = req.body.title_ar
        about.content_en = req.body.content_tr
        about.content_tr = req.body.content_en
        about.content_ar = req.body.content_ar
        about.about_image= `/img/postimages/${about_image.name}`

        about.save().then(post => {
            res.redirect('/admin/about')
        })
    })
})

router.put('/service/:id',  (req,res) => {

    Service.findOne({_id: req.params.id}).then(service => {
        service.title_tr = req.body.title_tr
        service.title_en = req.body.title_en
        service.title_ar = req.body.title_ar
        service.content_tr = req.body.content_tr
        service.content_en = req.body.content_en
        service.content_ar = req.body.content_ar
       

        service.save().then(post => {
            res.redirect('/admin/service')
        })
    })
})


module.exports = router