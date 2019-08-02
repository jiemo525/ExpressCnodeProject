const Reply = require('../model/reply');

module.exports = {
  add: (data) => {
    let reply = new Reply(data);
    return reply.save()
  },
  getReplyByTopicId: (id) => {
    return Reply.find({'topic_id': id})
  }
}