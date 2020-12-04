const router = require('express').Router();
const passport = require('passport');
const userCtrl = require('./controllers/user.ctrl');
const postCtrl = require('./controllers/post.ctrl');
const channelCtrl = require('./controllers/channel.ctrl');
const commentCtrl = require('./controllers/comment.ctrl');
const tagCtrl = require('./controllers/tag.ctrl');

const { initialize } = require('./auth');

initialize(passport);

router.route('/users/:id').get(userCtrl.getUser).delete(userCtrl.deleteUser);

router.post('/users', userCtrl.createUser);

router
  .route('/users/:id/saved')
  .get(userCtrl.getSavedPosts)
  .post(userCtrl.savePost)
  .delete(userCtrl.removeSavePost);

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
router.delete('/posts/:id/comment/:commentId', commentCtrl.deleteComment);

router
  .route('/channels/default')
  .get(channelCtrl.getDefaultChannels)
  .post(channelCtrl.createDefaultChannels);

router
  .route('/channels/users/:userId')
  .post(channelCtrl.createChannel)
  .delete(channelCtrl.deleteAllChannelsFromUser);

router
  .route('/channels/:id')
  .get(channelCtrl.getChannel)
  .delete(channelCtrl.deletePrivateChannel);

router.get('/channels', channelCtrl.getAllChannels);
router.get('/channels/public', channelCtrl.getPublicChannels);

router.route('/tags').get(tagCtrl.getTags).post(tagCtrl.createTag);

router.get('/auth/provider', passport.authenticate('provider'));

router.get(
  '/auth/provider/callback',
  passport.authenticate('provider', {
    successRedirect: 'http://localhost:3000/authenticated',
    failureRedirect: 'http://localhost:3000/',
  })
);

router.get('/auth/login/check', (req, res) => {
  if (req.user) {
    res.send({
      success: true,
      message: 'user has successfully authenticated',
      user: req.user,
      cookies: req.cookies,
    });
  }
});

module.exports = router;
