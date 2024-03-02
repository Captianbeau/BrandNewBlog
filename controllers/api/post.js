// post, put, delete
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

//get all posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include:[{model: User}, {model: Comment}],
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get post by id
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment
                },
            ],
        });
        if (!postData) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req,res) => {
    try{
        const postData = await Post.create(req.body);
        res.status(200).json(postData);
    }catch(err){
        res.status(400).json(err);
    }
});

module.exports = router;