const express = require('express');
const Category = require('./Category');
const slugify = require('slugify');
const { where } = require('sequelize');

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

});

router.get('/admin/categories', function(req,res){
    Category.findAll().then(categories => {
        res.render('./admin/categories/index', {categories: categories});
    });
    
});

router.post('/categories/delete', function(req, res){
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Category.destroy({
                where: {id:id}
            }).then(() => {
                res.redirect('/admin/categories');
            })
        }else{
            res.render('/admin/categories');
        }

    } else {
        res.render('/admin/categories');
    }
});

module.exports = router;