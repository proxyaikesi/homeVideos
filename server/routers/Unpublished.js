
const Video = require ('../model/Videoinfo')

module.exports = (req,res)=>{
    let data = req.body.params
    Video.find({
        author:data.id,
        privacy:'none',
    }).then((result)=>{
            res.json({
                code:0,
                newdata:result,
            })
        
    })
}