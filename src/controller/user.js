const User = require('../model/user');

module.exports = {
  add: (data) => {
    let user = new User(data);
    console.log(user);
    return user.save()
  }
}