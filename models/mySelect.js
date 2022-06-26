const mongoose = require('mongoose')

const mySelectSchema = new mongoose.Schema({
    selection: { type: String, require:true }
})

module.exports = mongoose.model('mySelect', mySelectSchema)