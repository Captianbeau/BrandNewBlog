// post, put, delete
const router = require('express').Router();
const{User, Post, Comment} = require('../../models');

//get all posts
router.get('/', async (req,res) => {
    try{
        const postData = await Post.findAll({
            include:[{model: User}, {model: Comment}],
        });
        res.statusMessage(200).json(postData);
    }catch(err){
        res.status(500).json(err);
    }
});

//get post by id
router.get('/:id', async (req, res) => {
    try{
    const postData = await Post.findByPk(req.params.id, {
        include: [{model: User}, {model: Comment}],
    });
    if(!postData){
        res.status(404).json({message:'Post not found'});
        return;
    }
    res.status(200).json(postData);
}catch(err){
    res.status(500).json(err);
}
});

module.exports = router;