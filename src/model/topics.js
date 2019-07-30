const mongoose = require('mongoose');
const config = require('../utils/config');
const Schema = mongoose.Schema;

// 连接
mongoose.connect(config.mongodb, { useNewUrlParser: true }); 

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

let Topic = mongoose.model('Topic', topicSchema, 'Topic');
module.exports = Topic;