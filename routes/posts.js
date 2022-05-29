const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const path = require('path')
const Category = require('../models/Category')
const User = require('../models/User')
const Contact = require('../models/Contact')
const Language = require('../models/Language')

router.get('/new', (req,res) => {
  if(!req.session.userId){
    res.redirect('/users/login')
  }
      Post.find({}).populate({path:'category', model: Category}).lean().sort({$natural:-1}).lean().then(posts => {
        Category.find({}).lean().then(categories => {
            Language.find({}).lean().then(language => {
          res.render('site/addpost', {posts:posts, categories:categories, language:language})
        })
      })
  })
})

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

router.get("/search", (req, res) => {
  if (req.query.look) {
    const regex = new RegExp(escapeRegex(req.query.look), 'gi');
    Post.find({ "title": regex }).populate({path:'author', model: User}).lean().sort({$natural:-1}).lean().then(posts => {
      Category.aggregate([
        {
            $lookup:{
                from: 'posts',
                localField: '_id',
                foreignField: 'category',
                as: 'posts'
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                num_of_posts : {$size: '$posts'}
            }
        }
    ]).then(categories => {
      res.render('site/blog', {posts:posts, categories:categories})
    })
    });
  }
})

router.get('/category/:categoryId', (req, res)=> {
  Post.find({category:req.params.categoryId}).populate({path:'category', model:Category}).populate({path:'author', model: User}).lean().then(posts => {
    Category.aggregate([
      {
          $lookup:{
              from: 'posts',
              localField: '_id',
              foreignField: 'category',
              as: 'posts'
          }
      },
      {
          $project: {
              _id: 1,
              name: 1,
              num_of_posts : {$size: '$posts'}
          }
      }
  ]).then(categories => {
    res.render('site/blog', {posts:posts, categories:categories})
  })
  })
})

router.get("/:id", (req, res) => {
    Post.findById(req.params.id).populate({path:'author', model: User}).then((post) => {
      Category.aggregate([
        {
            $lookup:{
                from: 'posts',
                localField: '_id',
                foreignField: 'category',
                as: 'posts'
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                num_of_posts : {$size: '$posts'}
            }
        }
    ]).then(categories => {
        Post.find({}).populate({path:'author', model: User}).lean().sort({$natural:-1}).lean().then(posts => {
          Contact.find({}).lean().then(contact => {
          res.render('site/post', {post:post.toJSON(), categories:categories, posts:posts, contact:contact})
        })
        })
    })
    });
  });




router.post('/test', (req,res) => {

    let post_image = req.files.post_image

    post_image.mv(path.resolve(__dirname, '../public/img/postimages', post_image.name))

    Post.create({
        ...req.body,
        post_image:`/img/postimages/${post_image.name}`,
        author: req.session.userId
    },  )

    req.session.sessionFlash = {
      type: 'alert alert-success',
      message: 'Postunuz başarılı bir şekilde oluşturuldu'
    }


    res.redirect('/posts/new')
})

module.exports = router