const router = require('express').Router();
const userCtrl = require('./controllers/user.ctrl');
const postCtrl = require('./controllers/post.ctrl');

router.get('/user/:id', userCtrl.getUser);
router.post('/user', userCtrl.createUser);
router.get('/user/:id/saved', userCtrl.getSavedPosts);

router.get('/post/:uuid', postCtrl.getPost);
router.post('/post', postCtrl.createPost);

module.exports = router;
