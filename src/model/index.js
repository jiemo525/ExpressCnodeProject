const mongoose = require('mongoose');
const config = require('../utils/config');

// 连接
mongoose.connect(config.mongodb, { useNewUrlParser: true }); 

exports.Topic = require('./topics');