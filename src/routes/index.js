const express = require('express');
const marked = require('marked');
const router = express.Router();
const Topic = require('../controller/topics');
const User = require('../controller/user');
const { dateFromNow, getTab, tabs } = require('../utils/tools');

/* GET home page. */
router.get('/', function (req, res, next) {
  Topic.list().then((data) => {
    res.render('index', {
      title: 'CNode',
      topicListData: data,
      dateFromNow: dateFromNow,
      getTab: getTab,
      signin: false
    });
  })
});

router.post('/', function (req, res, next) {
  Topic.list().then((data) => {
    res.render('index', {
      title: 'CNode',
      topicListData: data,
      dateFromNow: dateFromNow,
      getTab: getTab,
      signin: true
    });
  })
});


// 登录
router.get('/signin', function (req, res, next) {
  res.render('signin', {
    title: '登录'
  })
})

router.post('/signin', function (req, res, next) {
  const loginname = req.body.loginname;
  const password = req.body.password;
  let obj = {
    loginname,
    password
  }
  if (loginname === 'admin' && password === '123456') {
    User.add(obj).then(() => {
      res.redirect('/')
    });
  } else {
    res.redirect('/signin')
  }
})


// 话题详情
router.get('/topic/:id', function (req, res, next) {
  let id = req.params.id;
  Topic.findById(id).then((data) => {
    if (data.content) {
      data.content = marked(data.content);
    }

    res.render('topic', {
      title: '详情',
      topicData: data,
      dateFromNow: dateFromNow,
      getTab: getTab
    })
  });
})

// 新建话题
router.get('/create', function (req, res, next) {
  res.render('createTopic', {
    title: '新建话题',
    tabs: tabs
  })
})

// 提交新建话题
router.post('/create', function (req, res, next) {
  let obj = {};
  obj.tab = req.body.tab;
  obj.content = req.body.content;
  obj.title = req.body.title;
  obj.author = {
    loginname: "atian25",
    avatar_url: "https://avatars2.githubusercontent.com/u/227713?v=4&s=120"
  }
  Topic.add(obj).then((data) => {
    res.redirect('/topic/' + data._id)
  })
});

module.exports = router;
