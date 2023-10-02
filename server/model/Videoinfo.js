var mongoose = require('mongoose')
var timestamps = require('moment-timezone');
console.log('上海：'+timestamps().tz("Asia/Shanghai").format('YYYY/MM/DD HH:mm:ss'))
const { Schema } = mongoose;
var videoinfo = new mongoose.Schema({
    classify: String,
    title: String,
    date: Date,
    file_name: String,
    describe: String,
    location:String,
    VideoHV:String,
    privacy:String,
    uploadName:String,
   
    author:{
        type:Schema.Types.ObjectId,
        ref:'USER'
    },
    commentNum:Number,
    subDocument: {
        subDate: {
            type: Date,
        },
    },
    
},{
    versionKey:false, // 默认v__下划线
    timestamps:{
        updatedAt:'updateTime',
        createdAt:'createTime',
    }
})
var VideoInfo = mongoose.model('VideoInfo',videoinfo)
module.exports = VideoInfo