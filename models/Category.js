const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name_tr: { type: String, require:true },
    name_en: { type: String, require:true },
    name_ar: { type: String, require:true }
})

module.exports = mongoose.model('Category', CategorySchema)