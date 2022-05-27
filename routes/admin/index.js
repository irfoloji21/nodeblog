const express = require('express')
const router = express.Router()
const Category = require('../../models/Category')
const About = require('../../models/About')
const Post = require('../../models/Post')
const Contact = require('../../models/Contact')
const Service = require('../../models/Service')
const path = require('path')

router.get('/', (req,res) => {-
    res.render('admin/index')
})

router.get('/categories', (req,res) => {
    Category.find({}).sort({$natural:-1}).lean().then(categories =>  {
        res.render('admin/categories', {categories:categories})
    })
})

router.get('/about', (req,res) => {
  
    About.find({}).lean().then(about => {
        res.render('admin/about', {about:about})
})
})

router.get('/contact', (req,res) => {
  
    Contact.find({}).lean().then(contact => {
        res.render('admin/contact', {contact:contact})
})
})

router.get('/service', (req,res) => {
  
    Service.find({}).lean().then(service => {
        res.render('admin/service', {service:service})
})
})

router.post('/categories', (req,res) => {
    Category.create(req.body, (error, category)=> {
        if(!error) {
            res.redirect('categories')
        }
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
    Post.findOne({_id: req.params.id}).lean().then(post => {
        Category.find({}).lean().then(categories => {
            res.render('admin/editpost', {post:post,categories:categories})
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
    let post_image = req.files.post_image
    post_image.mv(path.resolve(__dirname, '../../public/img/postimages', post_image.name))

    Post.findOne({_id: req.params.id}).then(post => {
        post.title = req.body.title
        post.content = req.body.content
        post.date = req.body.date
        post.category = req.body.category
        post.post_image= `/img/postimages/${post_image.name}`

        post.save().then(post => {
            res.redirect('/posts/new')
        })
    })
})

router.put('/categories/:id',  (req,res) => {

    Category.findOne({_id: req.params.id}).then(category => {
        category.name = req.body.name
       

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
        about.title = req.body.title
        about.content = req.body.content
        about.about_image= `/img/postimages/${about_image.name}`

        about.save().then(post => {
            res.redirect('/admin/about')
        })
    })
})

router.put('/service/:id',  (req,res) => {

    Service.findOne({_id: req.params.id}).then(service => {
        service.title = req.body.title
        service.content = req.body.content
       

        service.save().then(post => {
            res.redirect('/admin/service')
        })
    })
})


module.exports = router