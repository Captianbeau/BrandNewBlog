// post, put, delete
const router = require('express').Router();
const{User, Post, Comment} = require('../../models');

//get all comments
router.get('/', async (req,res) => {
    try{
        const commentData = await Comment.findAll({
            include:[{model: User}, {model: Post}],
        });
        res.status(200).json(commentData);
    }catch(err){
        res.status(500).json(err);
    }
});

//get comment by id
router.get('/:id', async (req, res) => {
    try{
    const commentData = await Comment.findByPk(req.params.id, {
        include: [{model: User}, {model: Post}],
    });
    if(!commentData){
        res.status(404).json({message:'Comment not found'});
        return;
    }
    res.status(200).json(commentData);
}catch(err){
    res.status(500).json(err);
}
});

router.post('/', async (req,res) => {
    try{
        const commentData = await Comment.create(req.body);
        res.status(200).json(commentData);
    }catch(err){
        res.status(400).json(err);
    }
});

// router.put('/:id', async (req,res) => {

// });

// router.delete('/:id', async (req,res) => {

// });

module.exports = router;