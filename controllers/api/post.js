// put
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

//create posts
router.post('/', async (req,res) => {
    try{
        const postData = await Post.create(req.body);
        res.status(200).json(postData);
    }catch(err){
        res.status(400).json(err);
    }
});

//update post by id
router.put('/:id', async (req, res) => {
    try{
    const postData = await Post.update(
        {
            title:req.body.title,
            content: req.body.content,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    );
    return res.json(postData)
}catch(err){
    res.json(err)
};
});

//delete post
router.delete('/:id', async (req,res) => {
    try{
        const postData = await Post.destroy({
            where: {
                id: req.params.id
            }
        });
    
        if (!postData){
            res.status(404).json({message: 'Comment Not found'});
            return;
        }
        res.status(200).json(postData);
    }catch(err){
        res.status(500).json(err);
    }
    });

module.exports = router;