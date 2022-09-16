const express = require('express');

const router = express.Router();

router.get("/articles", function(req,res){
    res.send('Rota artigos!');
})

router.get("/admin/articles/news", function(req,res){
    res.send('Nova rota de artigos!');
})

module.exports = router;