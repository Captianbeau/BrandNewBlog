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
                },
                {
                    model: Comment,
                }
            ]
        });

        const posts = postData.map((post) => {
            return post.get({ plain: true })
        });

        res.render('homepage', {
            title: 'Home',
            nav1: 'profile',
            posts
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req,res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                },
            ],
        });
        if (!postData) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        const post = postData.get({plain:true});

        res.render('post',{
            title:'post',
            nav1:'home',
            nav2:'profile',
           post
        })
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/profile', async (req, res) => {
    try {

        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }]
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    const title = 'Login';
    res.render('login');
});

module.exports = router;