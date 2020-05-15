const DichVus = require('../models/dichVu.Model')
const mongoose = require('mongoose')

module.exports = {
    getAll: ((req,res)=>{
        const chuTro_id = req.chuTro._id;
        DichVus.find({chuTro_id:chuTro_id}).then(response=>{
            res.status(200).json({data:response})
        }).catch(err=>{
            res.status(404).json(err)
        })
    }),
    getID:((req,res)=>{
        const id = req.params.id;
        DichVus.findById(id).then(data=>{
            res.status(200).json({data:data})
        }).catch(err=>{
            res.status(400).json(err)
        })
    }),
    
    create: ((req, res) => {
        chuTro_id = req.chuTro._id;
        const dichVu = new DichVus({
            _id: new mongoose.Types.ObjectId(),
            tenDV: req.body.tenDV,
            chuTro_id:chuTro_id,
            moTaDV: req.body.moTaDV,
            donGia: Number(req.body.donGia),
            donVi: req.body.donVi,
            quyTacTinhTien: req.body.quyTacTinhTien,
            trangThai:Boolean(req.body.trangThai),
        });
        dichVu.save().then(response => {
            res.status(200).json(response);
        }).catch(err => {
            res.status(400).json(err)
        })
    }),
    delete:((req,res)=>{
        const id = req.params.id;
        DichVus.findByIdAndDelete(id).then(response=>{
            res.status(200).json({data:response})
        }).catch(err=>{
            res.status(400).json(err)
        })
    }),
    update: ((req,res)=>{
        const id = req.params.id;
        
        const dichvuUpdate = {
            tenDV: req.body.tenDV,
            moTaDV: req.body.moTaDV,
            donGia: Number(req.body.donGia),
            donVi: req.body.donVi,
            quyTacTinhTien: req.body.quyTacTinhTien,
            trangThai: Boolean(req.body.trangThai),
        }
        DichVus.findByIdAndUpdate(id,dichvuUpdate).then(response=>{
            
            
            res.status(200).json({data:response})
        }).catch(err=>{
            res.status(400).json(err)
        })
    }),
    

}