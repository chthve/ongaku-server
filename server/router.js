const router = require('express').Router();
const passport = require('passport');
const db = require('../models/index');
const userCtrl = require('./controllers/user.ctrl');
const postCtrl = require('./controllers/post.ctrl');
const channelCtrl = require('./controllers/channel.ctrl');
const commentCtrl = require('./controllers/comment.ctrl');
const tagCtrl = require('./controllers/tag.ctrl');
const authCtrl = require('./controllers/auth.ctrl');

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

router
  .route('/posts/:id/comment')
  .post(commentCtrl.postComment)
  .delete(commentCtrl.deleteComment);

router
  .route('/channels/default')
  .get(channelCtrl.getDefaultChannels)
  .post(channelCtrl.createDefaultChannels);

router
  .route('/achannels/users/:userId')
  .post(channelCtrl.createChannel)
  .delete(channelCtrl.deleteAllChannelsFromUser);

router.get('/channels', channelCtrl.getAllChannels);
router.get('/channels/public', channelCtrl.getPublicChannels);
router.route('/tags').get(tagCtrl.getTags).post(tagCtrl.createTag);
router
  .route('/channels/:id')
  .get(channelCtrl.getChannel)
  .delete(channelCtrl.deletePrivateChannel);

router.get('/auth/provider', passport.authenticate('provider'));

router.get(
  '/auth/provider/callback',
  passport.authenticate('provider', {
    successRedirect: 'http://localhost:3000/authenticated',
    failureRedirect: 'http://localhost:3000/',
  })
);

router.get('/auth/login/check', async (req, res) => {
  if (req.user) {
    const dbUser = await db.User.findByPk(req.user.id, {
      include: [
        { model: db.Post, as: 'posts' },
        { model: db.Channel, as: 'channels' },
      ],
    });

    res.send({
      success: true,
      message: 'user has successfully authenticated',
      user: dbUser,
      cookies: req.cookies,
    });
  }
});

router.post('/discogs/get', authCtrl.getFromDiscogs);
router.post('/discogs/post', authCtrl.postToDiscogs);
router.post('/discogs/put', authCtrl.putToDiscogs);
router.post('/discogs/delete', authCtrl.deleteFromDiscogs);

module.exports = router;
