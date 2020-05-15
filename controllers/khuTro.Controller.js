const KhuTros = require('../models/khuTro.Model');
const PhongTros = require('../models/phongTro.Model');
const mongoose = require('mongoose')

module.exports = {
    getAll: ((req, res) => {
        const chuTro_id = req.chuTro._id;
        KhuTros.find({ chuTro_id: chuTro_id }).then(response => {
            res.status(200).json({ data: response })
        }).catch(err => {
            res.status(400).json(err)
        })
    }),
    getId: ((req, res) => {
        const id = req.params.id;
        KhuTros.findById(id).then(response => {
            res.status(200).json({ data: response })
        }).catch(err => {
            res.status(400).json(err)
        })
    }),
    create: ((req, res) => {
        const chuTro_id = req.chuTro._id;
        
        const khuTro = new KhuTros({
            _id: new mongoose.Types.ObjectId(),
            chuTro_id: chuTro_id,
            tenKhuTro: req.body.tenKhuTro,
            diaChi: {
                Tinh:req.body.diaChi.Tinh,
                Quan:req.body.diaChi.Quan,
                Duong: req.body.diaChi.Duong
            },
            mota: req.body.mota,
            soTang: Number(req.body.soTang),
            phongTro_ids: [],
            trangThai: Boolean(req.body.trangThai)
        })
        khuTro.save().then(response => {
            res.status(201).json({ data: response })
        }).catch(err => {
            res.status(400).json(err)
        })
    }),
    update: ((req, res) => {
        const id = req.params.id;        
        const khuTro = {
            tenKhuTro: req.body.tenKhuTro,
            diaChi: {
                Tinh:req.body.diaChi.Tinh,
                Quan:req.body.diaChi.Quan,
                Duong:req.body.diaChi.Duong
            },
            mota: req.body.mota,
            soTang: Number(req.body.soTang),
            trangThai: Boolean(req.body.trangThai)
        }
        
        KhuTros.findByIdAndUpdate(id, khuTro).then(response => {
            res.status(201).json({ data: response })
        }).catch(err => {
            res.status(401).json(err)
        })
    }),
    delete: ((req, res) => {
        const khuTro_id = req.params.id;
        KhuTros.findByIdAndDelete(khuTro_id).then(() => {
            PhongTros.remove({ khuTro_ids: khuTro_id }).then(response => {
                res.status(201).json({ data: response })
            }).catch(err => {
                res.status(400).json(err)
            })
        }).catch(err => {
            res.status(400).json(err)
        })
    }),
    getKhuTro:((req,res)=>{
        const chuTro_id = req.chuTro._id;
       KhuTros.find({chuTro_id:chuTro_id},{tenKhuTro:1,soTang:1}).then(response=>{  
        res.status(200).json({data:response})
       }).catch(err=>{
           res.status(400).json(err)
       })   
    }),
    getPhongTro:((req,res)=>{
        const chuTro_id = req.chuTro._id;
        KhuTros.find({chuTro_id:chuTro_id},{tenKhuTro:1,phongTro_ids:1}).populate({path:'phongTro_ids'}).then(response=>{
            res.status(200).json({data:response})
        }).catch(err=>{
            res.status(400).json(err)
        })
    })
    
}