const Controller = require("../controller");
const bcrypt = require("bcrypt");

module.exports = new class extends Controller{

    loadPage(req,res){
        res.render('register',{err:req.flash("errors")});
    }

    async register(req,res){
        let {username,password} = req.body;

        if(!username | !password) {
            return res.redirect('register');}

        let user = await this.User.find({username:username});
        if(user.length){
            console.log(user)
            req.flash("errors","this username already choose");
            return res.redirect('register');
        }

        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password,salt);

        user = new this.User({
            username,
            password
        });
        user = await user.save()

        res.redirect('login');
    }

}