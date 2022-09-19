const express = require('express');
const Category = require('../categories/Category')
const Article = require('./Article');
const Slugify = require('slugify');
const { default: slugify } = require('slugify');

const router = express.Router();

router.get("/admin/articles", function(req,res){
   Article.findAll({
    include: [{ model: Category}]
   }).then(articles => {
        res.render('admin/articles/index', {articles: articles});
   })
})

router.get("/admin/articles/news", function(req,res){
    Category.findAll().then(categories => {
        res.render('./admin/articles/news', {categories: categories});
    })
    
})

router.post('/articles/save', function(req,res){
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Article.create({
        title:title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(() => {
        res.redirect('/admin/articles');
    });
});

router.post('/articles/delete', function(req, res){
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Article.destroy({
                where: {id:id}
            }).then(() => {
                res.redirect('/admin/articles');
            })
        }else{
            res.redirect('/admin/articles');
        }

    } else {
        res.redirect('/admin/articles');
    }
});

router.get('/admin/articles/edit/:id', function(req, res){
    var id = req.params.id;
    Article.findByPk(id).then(article => {
        if(article != undefined){      
            Category.findAll().then(categories => {
                res.render('admin/articles/edit', {categories: categories, article: article})
            })

        }else{
            res.redirect('/');
        }
    }).catch(erro => {
        res.redirect('/')
    })
});

router.post('/articles/update', function(req, res){
    var id = req.body.id;
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Article.update({title: title, slug: slugify(title), body: body, categoryId: category}, {
        where: {id: id}
    }).then(() => {
        res.redirect('/admin/articles')
    }).catch(erro => {
        res.redirect('/')
    })
})

router.get('/articles/page/:num', function(req, res){
    var page = req.params.num;
    offset: 1

    if(isNaN(page) || page == 1){
        offset = 0
    }else{
        offset = (parseInt(page) - 1) * 4;
    }


    Article.findAndCountAll({
        limit: 4,
        offset: offset,
        order: [
            ['id', 'DESC']
        ]
    }).then(articles => {


        var next;
        if(offset + 4 >= articles.count){
            next = false;
        } else {
            next = true;
        }


        var result = {
            page : parseInt(page),
            next : next,
            articles : articles
        }

        Category.findAll().then(categories => {
            res.render('admin/articles/page', {result: result, categories: categories})
        })
        

    })
})

module.exports = router;