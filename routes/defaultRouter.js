const router = require('express').Router();

// Serves the index page on the base route
router.get('/', (req, res)=>{
    // res.render('index')
    res.send('Serves the first page in /')
})

// Server the next page with plans
router.get('/services', (req, res)=>{
    // res.render('service')
    res.send('Serves second pages which has services (plans)')
})

module.exports = router;