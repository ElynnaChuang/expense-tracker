const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  },
  categoryID: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  done: {
    type: Boolean
  }
})

module.exports = mongoose.model('Record', recordSchema)
