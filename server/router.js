const router = require('express').Router();
const userCtrl = require('./controllers/user.ctrl');
const postCtrl = require('./controllers/post.ctrl');
const channelCtrl = require('./controllers/channel.ctrl');

router.get('/user/:id', userCtrl.getUser);
router.post('/user', userCtrl.createUser);
router.get('/user/:id/saved', userCtrl.getSavedPosts);
router.post('/user/:id/channels', channelCtrl.createUserChannels);
router.post('/private/channels', channelCtrl.createChannels);

router.get('/post/:uuid', postCtrl.getPost);
router.post('/post', postCtrl.createPost);

module.exports = router;
