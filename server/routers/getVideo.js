const Video = require('../model/Videoinfo')

module.exports = (req,res)=>{
    Video.find().then((item)=>{
        res.json({
            code:'3333333333333333333333333',
            item,
        })
        
    })
}