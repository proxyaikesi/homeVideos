
var mongoose = require('mongoose')
var userSchema = mongoose.Schema

var user = new userSchema({
    user:String,
    password:String,
    createTime:{
        type:Date,
        default:Date.now
    },
    role:{
        type:Number,
        default:1
    },
    avatar:{
        type:String,
        default:'/img/a.png'
    },
    videoNum:Number,
    commentNum:Number
})

var USER = mongoose.model('USER',user)
module.exports = USER