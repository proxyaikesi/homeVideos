const Video = require('../model/Videoinfo')
const USER = require('../model/USER')
const { resolve } = require("path");
const fs = require("fs");
module.exports = (req, res) => {
    const data = req.body.params
    Video.find({ _id: data.v_id }).then((item) => {
        let url = resolve(__dirname, '..')
        let newurl = url + '\\' + 'upload' + "\\" + 'video\\'
        var str = ""
        item.forEach(item => {
            return str = item.file_name
        })
        if(!str) return
        str = str.match(/video\/(\S*)/)[1]
        fs.unlink(newurl + str, function (error) {
            if (error) console.log('error',error); 
            Video.deleteOne({ _id: data.v_id }).then(() => {
                console.log('删除文件成功');
                res.json({
                    code: 0,
                    data: { msg: '删除文件成功' },
                })
            })
        })
    })
}






















// USER.find({ _id: data.user_id }).then((item) => {
        //     item.forEach(item => {
        //         USER.updateOne({ _id: item._id }, { $inc: { videoNum: -1 } }).then((item) => {
        //             if (item.modifiedCount == 1) {
        //                 res.json({
        //                     code: 1,
        //                     data: { msg: '上传成功' },
        //                 })
        //             } else {
        //                 res.json({
        //                     code: 0,
        //                     data: { msg: '上传失败' },
        //                 })
        //             }

        //         }).catch((err) => {
        //             console.log('err', err);
        //         })
        //     })

        // })