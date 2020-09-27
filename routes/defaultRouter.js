const router = require('express').Router();

// Serves the index page on the base route
router.get('/', (req, res)=>{
    res.render('index', {page: 'Home'})
})

// Server the next page with plans
router.get('/plan', (req, res)=>{
    res.render('plan', {page: 'Plans'})
})

// Under development route
router.get('/teamtime', (req, res)=>{
    res.render('teamtime', {page: 'Team Time'})
})

// Under development route
router.get('/develop', (req, res)=>{
    res.render('develop', {page: 'Coming soon'})
})

module.exports = router;