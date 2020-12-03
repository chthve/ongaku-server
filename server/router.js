const router = require('express').Router();
const userCtrl = require('./controllers/user.ctrl');
const postCtrl = require('./controllers/post.ctrl');
const channelCtrl = require('./controllers/channel.ctrl');
const commentCtrl = require('./controllers/comment.ctrl');
const tagCtrl = require('./controllers/tag.ctrl');
const { passport } = require('./auth');

router.get('/users/:id', userCtrl.getUser);
router.post('/users', userCtrl.createUser);

router
  .route('/users/:id/saved')
  .get(userCtrl.getSavedPosts)
  .post(userCtrl.savePost)
  .delete(userCtrl.removeSavePost);

router
  .route('/channels/default')
  .get(channelCtrl.getDefaultChannels)
  .post(channelCtrl.createDefaultChannels);

router.post('/channels/:userId', channelCtrl.createChannel);

router
  .route('/users/:id/channels')
  .post(channelCtrl.subscribeToChannels)
  .delete(channelCtrl.unsubscribeFromChannel);

router
  .route('/posts/:id')
  .get(postCtrl.getPost)
  .patch(postCtrl.updatePost)
  .delete(postCtrl.deletePost);

router.post('/posts/:channelId', postCtrl.createPost);
router.post('/posts/:id/comment', commentCtrl.postComment);

router.get('/channels', channelCtrl.getAllChannels);
router.get('/channels/public', channelCtrl.getPublicChannels);
router.get('/channels/:id', channelCtrl.getChannel);

router.route('/tags').get(tagCtrl.getTags).post(tagCtrl.createTag);

router.get('/auth/provider', passport.authenticate('provider'));

router.get(
  '/auth/provider/callback',
  passport.authenticate('provider', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);

module.exports = router;
