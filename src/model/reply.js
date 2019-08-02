/**
 * @description 评论模型
 * @author jiemo525
 * @date 20190802
 */
const mongoose = require('mongoose');
const config = require('../utils/config');
const Schema = mongoose.Schema;

// 连接
mongoose.connect(config.mongodb, { useNewUrlParser: true }); 

let replySchema = new Schema({
  content: String ,
  topic_id: String,
  author_id: String,
  create_at: { type: Date, default: Date.now },
});

let Reply = mongoose.model('Reply', replySchema, 'Reply');
module.exports = Reply;