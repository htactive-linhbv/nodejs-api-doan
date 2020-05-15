const Users = require('../models/user.Model')
const bcrypt = require('bcrypt');


module.exports = {
    getId: ((req, res) => {
        const id = req.params.id;
        Users.findById(id).then(user => {
            res.status(200).json({
                messenger: "get success",
                data: user
            })
        }).catch(err => {
            res.status(401).json(err)
        })
    }),
    getAll: ((req, res) => {
        Users.find({}, { password: 0 }).then(users => {
            lengthData = users.length;
            res.status(200).json({
                length: lengthData,
                messenger: "get succsess",
                data: users
            })
        }).catch(err => {
            res.status(401).json(err)
        })
    }),
    getPage: ((req, res) => {
        // const documentCount = await Users.countDocuments({});
    }),
    create: ((req, res) => {
        
        Users.find({email:req.body.user.email}).then(response=>{
            if(response.length==0){
                //mã hoá mật khảu
        const salt = bcrypt.genSaltSync(10);
        const PasswardHash = bcrypt.hashSync(req.body.user.password, salt)

        user = new Users({
            _id: new mongoose.Types.ObjectId(),
            hoTen: req.body.user.hoTen,
            soDienThoai: req.body.user.soDienThoai,
            email: req.body.user.email,
            password: PasswardHash,
            gioiTinh: req.body.user.gioiTinh,
            diaChi: req.body.user.diaChi,
        })
        user.save()
            .then(data => {
                res.status(201).json({
                    messenger: "create success",
                    data: data
                })
            })
            .catch(err => {
                res.status(401).json(err)
            })
            }else{
                res.status(400).json({
                    message: 'Tai Khoan da ton tai'
                })
            }
        }).catch(err=>{
            res.status(400).json(err)
        })
        
    }),
    update: ((req, res) => {
        const id = req.params.id;
        const user = {
            hoTen: req.body.user.hoTen,
            soDienThoai: req.body.user.soDienThoai,
            gioiTinh: req.body.user.gioiTinh,
            DiaChi: req.body.user.diaChi,
        }
        Users.findByIdAndUpdate(id, user)
            .then(response => {
                res.status(201).json({
                    messenger:"update success",
                    data: response
                })
             })
            .catch(err=>{
                res.status(401).json(err);
            })
    }),
    delete :((req,res)=>{
        const id = req.params.id;
        if(!id){
            res.status(401).json({
                err: "khong tim dc id"
            })
        }
        Users.findByIdAndDelete(id)
        .then(()=>{
            res.status(201).json({
                messenger:"delete success",
            })
        })
        .catch(err=>{
            res.status(401).json(err)
        })
    })

}