const USER = require('../model/USER');
const Video = require('../model/Videoinfo')
const fs = require('fs')
const uploader = require("express-fileupload");
const { extname, resolve } = require("path");
const { existsSync, appendFileSync, writeFileSync } = require("fs");
// module.exports = (req, res) => {
//     let data = req.body.params
//     console.log(data);
//     // res.send(req.body)
//     let { classify, title, file_name, describe, location } = data.info

//     new Promise((resolve, reject) => {
//         new Video({ author: data.loc, location, describe, title, file_name, classify }).save().then((item => {
//             USER.updateOne({ _id: item.author }, { $inc: { videoNum: 1 } }).then((item) => {
//                 if(item.modifiedCount == 1){
//                     res.json({
//                         code:1,
//                         data:{msg:'上传成功'},
//                     })
//                 }else{
//                     res.json({
//                         code:0,
//                         data:{msg:'上传失败'},
//                     })
//                     // console.log('2222222222222222222222222222222222222222222222222222222222222222222222222222');
//                     // fs.unlink('upload_temp\\' + '1690813870048_07.MP4.MP4', function (error) {

//                     //     if (error) {

//                     //         console.log(error);

//                     //         return false;

//                     //     }

//                     //     console.log('删除文件成功');

//                     // })
//                 }

//             }).catch((err) => {
//                 console.log('err', err);
//             })
//         }))
//     }).catch((err) => {
//         console.log('err', err);
//     })

// }


module.exports = (req, res) => {
    const pis =''
    const ALLOWED_TYPE = {
        "video/mp4": "mp4",
        "video/ogg": "ogg",
    };
    const { type, name, size, fileName, uploadedSize, } = req.body;
    const { file } = req.files;

    if (!file) {
        res.send({
            msg: 'No file uploaded',
            code: 1001
        })
        return
    }
    if (!ALLOWED_TYPE[type]) {
        res.send({
            msg: "The type is not allowed for uploading",
            code: 1002,
        });
        return;
    }
    let driname = resolve(__dirname, '..')
    const filename = fileName + extname(name);
    const filepath = resolve(driname, "./upload/video/" + filename);

    if (uploadedSize !== '0') {
        if (!existsSync(filepath)) {
            res.send({
                msg: "No file exists",
                code: 1003,
            });
            return;
        }
        appendFileSync(filepath, file.data);
        res.send({
            msg: "Appended",
            code: 0,
            data: this.pis,
            video_url: "http://localhost:3000/video/" + filename,
            upload:name
        })

        return
    }
    new Video({ file_name: 'http://localhost:3000/video/' + filename }).save().then((item) => {
        this.pis = item._id
        return console.log(item._id);
        
    })
    writeFileSync(filepath, file.data); // 创建一个文件,并写入文件 upload temp // D:\vue\video\server\upload_temp\1687532675534_oUJegbyonAIkeLsABzDFW6QIGBCoXMHgPb9udA.MP4.MP4
    res.send({
        msg: "File is created",
        code: 0,
    })


}
