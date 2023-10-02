const USER = require ('../model/USER')
const jwt = require('jsonwebtoken')
const SECRET = 'jasdkljaskldjASKDJASKLJDKL'
module.exports = (req,res)=>{
    let data = req.body
    console.log(data);
   
    USER.find({
        user:data.user
    }).then((result)=>{
        if(result.length==0){
            res.json({
                code:0,
                data:{msg:'该用户未注册'}
            })
        }else{
            USER.find({
                user:data.user,
                password:data.pswd
            }).then((result)=>{
                console.log(result[0],'88888888888888888888888888888');
                if(result.length>0){      
                    res.json({
                        code:1,
                        data:{
                            avatar:result[0].avatar,
                            user:result[0].user,
                            _id:result[0]._id
                        },
                        msg:{
                            data:'登陆成功'
                        }
                    },
                    )
                }else{
                    res.json({
                        code:2,
                        data:{msg:'密码不正确'}
                    })
                }
            })
        }
    })
}