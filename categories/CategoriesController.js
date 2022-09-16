const express = require('express');
const Category = require('./Category');
const slugify = require('slugify');

const router = express.Router();

router.get("/admin/categories/news", function(req,res){
    res.render('./admin/categories/news');
})

router.post("/categories/save", function(req,res){
    var title = req.body.title;
    if(title != undefined){

        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect("/");
        })

    } else {
        res.render('/admin/categories/news');
    }

})

module.exports = router;