//const Users = require('../models/user.Model');
const ChuTros = require('../models/chuTro.Model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//tạo biến kiểu mã hoá jwt


module.exports = {
    login: ((req, res) => {


        ChuTros.find({ email: req.body.email }).then(chuTro => {
            if (chuTro.length < 1) {
                return res.status(403).json({ message: 'tài khoản ko tồn tại' })
            }

            // giải mã hoá mật khẩu 
            bcrypt.compare(req.body.password, chuTro[0].password, (err, response) => {
                if (err) {
                    return res.status(404)
                } else {
                    if (response === true) {
                        //tạo token
                        const token = jwt.sign({
                            _id: chuTro[0]._id,
                            email: chuTro[0].email,
                            hoVaTen: chuTro[0].hoVaTen,
                            quyen: "chuTro"
                        }, 'Secret')
                        return res.status(200).json({
                            message: 'Đăng nhập thành công',
                            token: token,
                            chutro: {
                                _id: chuTro[0]._id,
                                hoVaTen: chuTro[0].hoVaTen
                            }

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
        const id = req.chuTro._id;
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const newPassword = bcrypt.hashSync(req.body.newPassword, salt)
        ChuTros.findById(id).then(response => {
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

    })
}