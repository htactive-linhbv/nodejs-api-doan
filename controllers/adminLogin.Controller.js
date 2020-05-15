//const Users = require('../models/user.Model');
//const mongoose = require('mongoose')
const Admin = require('../models/admin.Model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//tạo biến kiểu mã hoá jwt


module.exports = {
    login: ((req, res) => {


        Admin.find({ email: req.body.email }).then(admin => {
            if (admin.length < 1) {
                return res.status(403).json({ message: 'tài khoản ko tồn tại' })
            }

            // giải mã hoá mật khẩu 
            bcrypt.compare(req.body.password, admin[0].password, (err, response) => {
                if (err) {
                    return res.status(404)
                } else {
                    if (response === true) {
                        //tạo token
                        const token = jwt.sign({
                            _id: admin[0]._id,
                            email: admin[0].email,
                            quyen: "admin"
                        }, 'Secret')
                        return res.status(200).json({
                            message: 'Đăng nhập thành công',
                            token: token,

                        })
                    } else {
                        return res.status(403).json({ message: 'mật khẩu không đúng' })
                    }
                }
            })
        }).catch(err => {
            res.status(500).json({ error: err })
        })
    }),
    changePassword: ((req, res) => {
        const id = req.admin._id;
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const newPassword = bcrypt.hashSync(req.body.newPassword, salt)
        Admin.findById(id).then(response => {
            bcrypt.compare(password, response.password, (err, doc) => {
                if (err) {
                    res.status(400)
                } else {
                    if (doc===true) {
                        response.password = newPassword;
                        response.save().then(() => {
                            res.status(200).json({ message: 'Đổi mật khẩu thành công' })
                        }).catch(()=>{
                            res.status(400).json({message: 'đổi mk thất bại'})
                        })
                       
                    } else {
                        res.status(400).json({ message: 'Mật khẩu hiện tại không đúng' })
                    }
                }
            })
        }).catch(err=>{
            res.status(400).json(err)
        })

    }),
    // create: (req, res) => {
    //     Admin.find({ email: req.body.admin.email }).then(response => {
    //         if (response.length === 0) {
    //             //mã hoá mật khảu
    //             const salt = bcrypt.genSaltSync(10);
    //             const PasswardHash = bcrypt.hashSync(req.body.admin.password, salt)
    //             const admin = new Admin({
    //                 _id: new mongoose.Types.ObjectId(),
    //                 hoTen: req.body.admin.hoTen,
    //                 email: req.body.admin.email,
    //                 password: PasswardHash,
    //             })

    //             // lưu vào db
    //             admin.save((err, response) => {
    //                 if (err) {
    //                     res.status(401).json(err);
    //                 }
    //                 res.status(200).json({
    //                     messenger: "succsess",
    //                     dataChuTro: response
    //                 });
    //             })
                
    //         } else {
    //             res.status(400).json({err:"email da ton tai"})
    //         }


    //     }).catch(err => {
    //         console.log(err);
    //         res.status(400)
    //     })



    // },
}