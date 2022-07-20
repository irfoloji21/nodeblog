const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const path = require('path')
const Category = require('../models/Category')
const User = require('../models/User')
const Contact = require('../models/Contact')
const Language = require('../models/Language')
const mySelect = require('../models/mySelect')
const MySelect = require('../models/mySelect')

router.get('/new', (req, res) => {
  if (!req.session.userId) {
    res.redirect('/users/login')
  }
  Post.find({}).populate({ path: 'category', model: Category }).lean().sort({ $natural: -1 }).lean().then(posts => {
    Category.find({}).lean().then(categories => {
      Language.find({}).lean().then(language => {
        res.render('site/addpost', { posts: posts, categories: categories, language: language })
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
    Post.find().or([{ 'title_tr': regex }, { 'title_en': regex }, { 'title_ar': regex }]).populate({ path: 'author', model: User }).lean().sort({ $natural: -1 }).lean().then(posts => {

      Category.aggregate([
        {
          $lookup: {
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
            num_of_posts: { $size: '$posts' }
          }
        }
      ]).then(categories => {
        MySelect.findOne().lean().then(myselect => {
          MySelect.find().lean().then(select => {
            Contact.find({}).lean().then(contact => {
              Category.find({}).lean().then(category => {
                res.render('site/blog', {
                  posts: posts,
                  categories: categories,
                  myselect: myselect,
                  select: select,
                  contact: contact,
                  category: category
                })
              })
            })
          });
        })
      })
    })
  }
})

router.get('/category/:categoryId', (req, res) => {


  
  Post.find({category_id:req.params.categoryId}).populate({ path: 'category_id', model: Category }).lean().then(posts => {
    Category.aggregate([
      {
        $lookup: {
          from: 'posts',
          localField: '_id',
          foreignField: 'category_id',
          as: 'posts'
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          num_of_posts: { $size: '$posts' }
        }
      }
    ]).then(categories => {
      MySelect.findOne().lean().then(myselect => {
        MySelect.find().lean().then(select => {
          Contact.find({}).lean().then(contact => {
            Category.findById(req.params.categoryId).lean().then(category => {
           
              res.render('site/blog', {
                posts: posts,
                categories: categories,
                myselect: myselect,
                select: select,
                contact: contact,
                category: category
              })
            })
          })
        });
      })
    })
  })
})

router.get("/:id", (req, res) => {
  Post.findById(req.params.id).populate({ path: 'author', model: User }).then((post) => {
    Category.aggregate([
      {
        $lookup: {
          from: 'posts',
          localField: '_id',
          foreignField: 'category_id',
          as: 'posts'
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          num_of_posts: { $size: '$posts' }
        }
      }
    ]).then(categories => {

      MySelect.findOne().lean().then(myselect => {
        MySelect.find().lean().then(select => {

          Contact.find({}).lean().then(contact => {
            Category.find({}).lean().then(category => {
              res.render('site/post', {
                post: post.toJSON(),
                categories: categories,
                contact: contact,
                select: select,
                myselect: myselect,
                category: category
              })
            })
          })
        })
      })
    })
  })
});

router.post('/test', (req, res) => {

  let post_image = req.files.post_image

  post_image.mv(path.resolve(__dirname, '../public/img/postimages', post_image.name))

  Post.create({
    ...req.body,
    post_image: `/img/postimages/${post_image.name}`,
    author: req.session.userId
  })

  req.session.sessionFlash = {
    type: 'alert alert-success',
    message: 'Postunuz başarılı bir şekilde oluşturuldu'
  }


  res.redirect('/posts/new')
})


router.put('/language/:id', (req, res) => {

  mySelect.findOne({ _id: req.params.id }).then(selection => {
    selection.selection = req.body.selection


    selection.save().then(post => {
      res.redirect('back')
    })
  })
})
module.exports = router