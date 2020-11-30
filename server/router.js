const router = require('express').Router();
const userCtrl = require('./controllers/user.ctrl');
const postCtrl = require('./controllers/post.ctrl');

router.get('/user/:uuid', userCtrl.getUser);
router.post('/user', userCtrl.createUser);
router.post('/post', postCtrl.createPost);
router.get('/post/:uuid', postCtrl.getPost);

module.exports = router;
