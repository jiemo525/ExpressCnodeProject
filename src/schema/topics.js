const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let topicSchema = new Schema({
  author_id: '',
  tab: String,
  content: String,
  title: String,
  last_reply_at: Date,
  good: Boolean,
  top: Boolean,
  reply_count: Number,
  visit_count: Number,
  create_at: {type: Date, default: Date.now},
  author: {
    loginname: String,
    avatar_url: String
  }
});

module.exports = mongoose.model('Topic', topicSchema);