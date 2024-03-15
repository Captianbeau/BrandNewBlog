const router = require('express').Router();
const { Post, Comment, User } = require('../models');


router.get('/', async (req, res) => {

    //get all posts

    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        const title = 'Home';
        
        res.render('homepage', {
            title,
            posts
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/profile', async (req, res) => {
    const title = '';
    try {
        res.render('profile');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    const title = 'Login';
    res.render('login');
});

module.exports = router;