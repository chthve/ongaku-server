const router = require('express').Router();
const userCtrl = require('./controllers/user.ctrl');
const postCtrl = require('./controllers/post.ctrl');

router.get('/user/:uuid', userCtrl.getUser);
router.post('/user', userCtrl.createUser);
router.post('/user/saved', userCtrl.savePost);

router.get('/post/:uuid', postCtrl.getPost);
router.post('/post', postCtrl.createPost);

module.exports = router;
