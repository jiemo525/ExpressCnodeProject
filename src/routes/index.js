const express = require('express');
const marked = require('marked');
const router = express.Router();
const axios = require('axios');
const sessionStorage = require('node-sessionStorage');
const Topic = require('../controller/topics');
const User = require('../controller/user');
const Reply = require('../controller/reply');
const { dateFromNow, getTab, tabs } = require('../utils/tools');

/* GET home page. */
router.get('/', function (req, res, next) {
  const token = sessionStorage.getItem('githubToken');
  if(token) {
    // 登录成功后请求用户信息
    axios({
      method: 'get',
      url: `https://api.github.com/user`,
      headers: {
        accept: 'application/json',
        Authorization: `token ${token}`
      }
    }).then((response) => {
      let userInfo = response.data;
      sessionStorage.setItem('userInfo', userInfo);
      Topic.list().then((data) => {
        res.render('signup', {
          title: 'CNode',
          topicListData: data,
          dateFromNow,
          getTab,
          signin: true,
          userInfo
        });
      })
    })
  } else {
    Topic.list().then((data) => {
      res.render('index', {
        title: 'CNode',
        topicListData: data,
        dateFromNow: dateFromNow,
        getTab: getTab,
        signin: false,
        userInfo: false
      });
    })
  }
  
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
    title: '登录',
    userInfo: false
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

// 第三方登录
router.get('/github/auth?:code', function (req, res, next) {
  const code = req.query.code;
  axios.get('https://github.com/login/oauth/access_token?client_id=ed0538206ea0b560ae1e&client_secret=2210ef21c12fca1088a824a7fd7432b046e053cf&code=' + code).then((response) => {
    if (response.data) {
      let str = response.data;
      str = str.split('&')[0];
      str = str.split('=')[1];
      const token = str;
      sessionStorage.setItem('githubToken', token);
      res.redirect('/');
    }

  })
  
})

// 话题详情
router.get('/topic/:id', function (req, res, next) {
  let id = req.params.id;
  Topic.findById(id).then((data) => {
    if (data.content) {
      data.content = marked(data.content);
    }
    Reply.getReplyByTopicId(id).then((replies) => {
      res.render('topic', {
        title: '详情',
        topicData: data,
        dateFromNow: dateFromNow,
        getTab: getTab,
        userInfo: {
          login: data.author.loginname,
          avatar_url: data.author.avatar_url
        },
        id,
        replies
      })
    })
  });
})

// 发布评论
router.post('/addReply/:id', function (req, res, next) {
  const userInfo = sessionStorage.getItem('userInfo');
  let id = req.params.id;
  let obj = {};
  obj.content = req.body.content;
  obj.topic_id = id;
  obj.author_id = userInfo.id;
  Reply.add(obj).then((data) => {
    res.redirect(`/topic/${id}`);
  })
  
})

// 新建话题
router.get('/create', function (req, res, next) {
  const userInfo = sessionStorage.getItem('userInfo');
  res.render('createTopic', {
    title: '新建话题',
    tabs: tabs,
    userInfo
  })
})

// 提交新建话题
router.post('/create', function (req, res, next) {
  const userInfo = sessionStorage.getItem('userInfo');
  let obj = {};
  obj.tab = req.body.tab;
  obj.content = req.body.content;
  obj.title = req.body.title;
  obj.author = {
    loginname: userInfo.login,
    avatar_url: userInfo.avatar_url
  }
  Topic.add(obj).then((data) => {
    res.redirect('/topic/' + data._id)
  })
});

module.exports = router;
