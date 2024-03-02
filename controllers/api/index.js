const router = require('express').Router();

const userRoute = require('./user.js');
const postRoute = require('./post.js');
const commentRoute = require('./comment.js');

// router.use('/users', userRoute);
router.use('/posts', postRoute);
router.use('/comments', commentRoute);

module.exports = router;