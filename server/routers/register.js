const USER = require('../model/USER')
module.exports = (req,res)=>{
    let data = req.body
    console.log(data);
    USER.find({
        user:data.user
    }).then((result=>{
        if(result.length>0){
            res.json({
                code:1,
                data:{
                    msg:'用户已注册'
                }
            })
        }else{
            try{
                                            //  ...data, isSeller:false
                const save =  new USER({user:data.user,password:data.pswd}).save()
                return res.json({
                    code:0,
                    data:{msg:'注册成功 '}
                })
            }catch(err){
                return res.json({
                    code:1,
                    data:{msg:'该用户已注册 '}
                })
            }
           
        }

    }))
}