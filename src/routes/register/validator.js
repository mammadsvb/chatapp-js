const {check} = require("express-validator");

module.exports = new class{

    validation(){
        return [
            check("username","username cannot be empty").notEmpty(),
            check("password","password cannot be empty").notEmpty()
        ];
    }

}