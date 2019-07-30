/**
 * @description 用户模型
 * @author jiemo525
 * @date 20190726
 */
const mongoose = require('mongoose');
const config = require('../utils/config');
const Schema = mongoose.Schema;

// 连接
mongoose.connect(config.mongodb, { useNewUrlParser: true }); 

let userSchema = new Schema({
  loginname: String,
  password: String,
  avatar: String,
  name: String,

});

let User = mongoose.model('User', userSchema, 'User');
module.exports = User;