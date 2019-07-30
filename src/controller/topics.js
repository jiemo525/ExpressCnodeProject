const Topic = require('../model/topics');

module.exports = {
  list: (req, res) => {
    return Topic.find({}).exec()
  },
  findById: (id) => {
    return Topic.findById(id).exec()
  },
  add: (data) => {
    let topic = new Topic(data);
    return topic.save()
  }
}