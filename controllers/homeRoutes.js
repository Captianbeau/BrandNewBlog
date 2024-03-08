const router = require('express').Router();

router.get('/', async (req,res) => {
    const title = 'Home';
    try{
        res.render('homepage');
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/profile', async (req,res) => {
    const title = '';
    try{
        res.render('profile');
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/login', (req,res) => {
    const title = 'Login';
    res.render('login');
});

module.exports = router;