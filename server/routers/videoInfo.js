const USER = require('../model/USER');
const Video = require('../model/Videoinfo')
module.exports = (req, res) => {
    let data = req.body.params
    console.log('datadatadata',data);
    let { classify, title, describe, location,file_name,uploadName,privacy,modify} = data.info
    Video.updateOne({ _id: data.id }, { $set: { author: data.loc,uploadName,privacy,classify,VideoHV:data.HV, title, title, describe, location,file_name } }).then((item) => {
            USER.updateOne({ _id: data.loc }, { $inc: {videoNum:modify == 'modifyData' ? 0 : 1  } }).then((item) => {
                if (item.modifiedCount == 1) {
                    res.json({
                        code: 1,
                        data: { msg: '上传成功' },
                    })
                } else {
                    res.json({
                        code: 0,
                        data: { msg: '上传失败' },
                    })
                }
            }).catch((err) => {
                console.log('err', err);
            })
    })
}
