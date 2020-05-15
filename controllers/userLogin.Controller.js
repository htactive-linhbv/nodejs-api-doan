const Users = require('../models/user.Model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//tạo biến kiểu mã hoá jwt


module.exports ={
    login :((req,res)=>{
        Users.find({email:req.body.email}).then(user=>{
            if(user.length<1){
                return res.status(404).json({message : 'tài khoản ko tồn tại'})
            }

            // giải mã hoá mật khẩu 
            bcrypt.compare(req.body.password,user[0].password,(err,response)=>{
                if(err){
                    return res.status(404).json({message : 'mật khẩu không đúng'})
                }else{

                    //tạo token
                 const token=   jwt.sign({
                        _id: user[0]._id, 
                        email: user[0].email,
                        hoVaTen: user[0].hoVaTen,
                        quyen: "user"
                    },'Secret')
                    return res.status(200).json({
                        message: 'Đăng nhập thành công',
                        token : token
                    })
                }
            })
          }).catch(err=>{
            res.status(500).json({error : err})
        })
    })
}