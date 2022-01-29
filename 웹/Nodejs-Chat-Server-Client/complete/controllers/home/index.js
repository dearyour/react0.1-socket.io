const { Router } = require('express');
const router = Router();

router.get('/', ( _ , res )=>{
  res.render('home.html');
});

module.exports = router;