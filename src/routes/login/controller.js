const Controller = require('../controller');
// const express = require("express");
const bcrypt = require('bcrypt');
const config = require("config");
const jwt = require("jsonwebtoken")
module.exports = new class extends Controller{

    async loadPage(req,res){
        if(req.signedCookies.id){
            const decode = jwt.verify(req.signedCookies.id,config.get("token-key"));
            // console.log(decode._id);
            const user = await this.User.findById(decode._id);
            if(!user){
                // res.clearCookie('id');
                return res.render("login");
            }
            return res.redirect("home");
        }

        res.render('login',{err:req.flash("errors")});
    }

    async login(req,res){

        
        const user = await this.User.findOne({username : req.body.username});
        // console.log(user);
        if(!user){   
            req.flash("errors","password or username is wrong")
            return res.redirect('login');}

        const isValid = await bcrypt.compare(req.body.password,user.password);
        if(!isValid){
            req.flash("errors","password or username is wrong")
            return res.redirect('login');
        }
        const token = jwt.sign({_id:user.id},config.get("token-key"));
        // console.log(token);
        res.cookie('id',token,{ signed : true })

        res.redirect('home');
    }

}