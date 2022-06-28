const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name_tr: { type: String, require:true, unique:false },
    name_en: { type: String, require:true, unique:false },
    name_ar: { type: String, require:true, unique:false }
})

module.exports = mongoose.model('Category', CategorySchema)