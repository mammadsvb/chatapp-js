const {validationResult} = require("express-validator");
const User = require("../models/user");

module.exports = class {

    constructor(){
        this.User = User;
    }

    validatioBody(req,res,next){
        const result = validationResult(req);
        if(!result.isEmpty()){
            const err = result.array();
            const msg = [];
            err.forEach((e)=>msg.push(e.msg));
            req.flash("errors",msg);
        }

        next();
    }

    // validate(req,res,next){
    //     if(!this.validatioBody(req,res)){
    //         console.log(req.flash("errors"))
    //         // return;
    //     }

            
        
    // }
    

}