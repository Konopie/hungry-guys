const router = require('express').Router();

router.get('/', (req, res)=>{
    res.render('home');
})

router.get('/posts', (req, res)=>{
    res.render('posts');
})

router.get('/login', (req, res) => {
    res.render('login');
})

module.exports = router;