
const Video = require('../model/Videoinfo')
const USER = require('../model/USER')
const fs = require("fs");
const { resolve } = require("path");
let url = resolve(__dirname,'..\\upload\\video/')
console.log(fs.unlink);
module.exports = (req, res) => {
    let data = JSON.parse(req.body.params.videoinfo)
    Video.find({ _id: data._id }).populate({path:"author"})
        .then((result) => {
            if(!result[0]) return
            let resultUrl = result[0].file_name.match(/video\/(\S*)/)[1]
            Video.deleteOne({ _id:result[0]._id}).then((res) => {
                console.log('vvvvvvvvvvvvv', result[0].file_name);
                if(res.deletedCount == 1){
                    USER.updateOne({_id:result[0].author._id},{$inc: {videoNum:-1 }}).then((data)=>{
                        console.log('成功-1',data)
                    })
                    fs.unlink(`${url}\\` + resultUrl, function (error) {
                        if (error) console.log('error',error); 
                        
                    })
                }
            },) 
        },)


    // res.json({
    //     aa:data
    // })
}


// Video.find({ _id: data._id }).populate({path:"author"}).exec().then((arr)=>{
//     console.log('aaaaaaaaaaaadaa',arr);
//     USER.updateOne({$inc: {videoNum:-1 }})
// })