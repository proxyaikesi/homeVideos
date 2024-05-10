
const Video = require ('../model/Videoinfo')

module.exports = (req,res)=>{
    let data = req.body.params
    console.log('实打实水水水水水水水水水水',data);
    Video.find({
        author:data.id,
        privacy:'open',
    }).then((result)=>{
            res.json({
                code:0,
                newdata:result,
            })
        
    })
}