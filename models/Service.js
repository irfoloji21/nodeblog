const mongoose = require('mongoose')

const ServiceSchema = new mongoose.Schema({
    title: { type: String, require:true },
    content:{ type: String, require:true }
})

module.exports = mongoose.model('Service', ServiceSchema)