const mongoose = require('mongoose');
const timesstamp = require("mongoose-timestamp");

const userSchema = new mongoose.Schema(
    {
        username : {type : String , required : true ,unique : true},
        password : {type : String , require : true}
    }
);
userSchema.plugin(timesstamp);

const User = mongoose.model('User',userSchema);

module.exports = User;