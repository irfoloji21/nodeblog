const { Schema } = require('mongoose')
const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title_tr: { type: String, require:true },
    content_tr:{ type: String, require:true },
    title_en: { type: String, require:true },
    content_en:{ type: String, require:true },
    title_ar: { type: String, require:true },
    content_ar:{ type: String, require:true },
    author: { type: Schema.Types.ObjectId, ref:'users' },
    date: { type:Date, default: Date.now },
    category_id: { type: Schema.Types.ObjectId, ref:'categories'},
    language: { type: Schema.Types.ObjectId, ref:'languages'},
    post_image: { type: String }
})

module.exports = mongoose.model('Post', PostSchema)