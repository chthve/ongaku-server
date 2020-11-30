const router = require('express').Router();
const userCtrl = require('./controllers/user.ctrl');

router.get('/user/:uuid', userCtrl.getUser);
router.post('/user', userCtrl.createUser);

module.exports = router;
