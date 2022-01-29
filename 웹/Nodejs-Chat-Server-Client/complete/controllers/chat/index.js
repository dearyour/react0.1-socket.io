const { Router } = require('express');
const router = Router();

router.get('/', ( _ , res )=>{
  res.render('chat/index.html');
});

module.exports = router;