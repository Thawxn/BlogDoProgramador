const express = require('express');
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcryptjs');

router.get('/admin/users', function(req, res){
    User.findAll().then(users => {
        res.render('admin/users/index', {users: users})
    });
}); 

router.get('/admin/users/create', function(req, res){
    res.render('./admin/users/create');
});

router.post('/admin/create', function(req,res){
    var email = req.body.email;
    var password = req.body.password;

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    User.findOne({where:{email:email}}).then( user => {

        if(user == undefined){
            User.create({
                email: email,
                password: hash
            }).then(() => {
                res.redirect('/')
            }).catch(erro => {
                res.redirect('/')
            });
        } else {
            res.redirect('../admin/users/create');
        };
    });
});

module.exports = router;