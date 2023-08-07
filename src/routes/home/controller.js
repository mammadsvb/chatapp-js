const Controller = require("../controller");
const jwt = require('jsonwebtoken');
const config = require("config");


module.exports = new class extends Controller {

    async loadPage(req,res){
        if(!req.signedCookies.id){
            req.flash("errors","first login in your acc")
            return res.redirect("login");
        }
        const decode = jwt.verify(req.signedCookies.id,config.get("token-key"));
        const user = await this.User.findById(decode._id);
        if(!user){
            req.flash("errors","user not found")
            return res.redirect("login");
        }
        
        res.render("home",{user:user});
    }

    logout(req,res){
        res.clearCookie('id');
        res.redirect("login")
    }
}