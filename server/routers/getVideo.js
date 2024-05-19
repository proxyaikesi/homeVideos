const Video = require('../model/Videoinfo')
const User = require('../model/USER')

module.exports = (req, res) => {
    Video.find()
        .populate({
            path: 'author', // 指定要填充的字段
            model: User,   // 指定关联的模型
            select: 'user password' //  (可选) 选择要返回的字段 

        })

        .then((item) => {
            console.log(item, '大大大大大');
            res.json({
                code: '3333333333333333333333333',
                item,
            })

        })
}