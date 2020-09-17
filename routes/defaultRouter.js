const router = require('express').Router();

// Serves the index page on the base route
router.get('/', (req, res)=>{
    res.render('index')
})

// Server the next page with plans
router.get('/plan', (req, res)=>{
    res.render('plan')
})

module.exports = router;