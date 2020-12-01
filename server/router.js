const router = require('express').Router();
const userCtrl = require('./controllers/user.ctrl');
const postCtrl = require('./controllers/post.ctrl');
const channelCtrl = require('./controllers/channel.ctrl');
const commentCtrl = require('./controllers/comment.ctrl');

router.get('/user/:id', userCtrl.getUser);
router.post('/user', userCtrl.createUser);

router.get('/user/:id/saved', userCtrl.getSavedPosts);
router.post('/user/:id/saved', userCtrl.savePost);

router.post('/user/:id/channels', channelCtrl.assignUserToChannels);
router.post('/private/channels', channelCtrl.createDefaultChannels);

router.get('/post/:id', postCtrl.getPost);
router.post('/post/:channelId', postCtrl.createPost);
router.post('/post/:id/comment', commentCtrl.postComment);

router.get('/channels/default', channelCtrl.getDefaultChannels);
router.get('/channel/:id', channelCtrl.getChannel);

module.exports = router;
