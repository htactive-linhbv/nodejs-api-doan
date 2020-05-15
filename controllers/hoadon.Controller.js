const HoaDons = require('../models/hoaDon.Model');
const mongoose = require('mongoose')

module.exports = {
    get: ((req, res) => {
        const chuTro_id = req.chuTro._id;
        HoaDons.find({ chuTro_id: chuTro_id }).populate([
            {
                path: 'khuTro_id',
                select: 'tenKhuTro'
            },
            {
                path: 'khachThue_id',
                select: 'tenKhachThue'
            },
            {
                path: 'phongTro_id',
                select: 'tenPhongTro'
            }
        ]).then(response => {
            res.status(200).json({ data: response })
        }).catch(err => {
            res.status(400).json(err)
        })
    }),
    getID: ((req, res) => {
        HoaDons.findById().then(response => {
            res.status(200).json({ data: { response } })
        }).catch(err => {
            res.status(400).json(err)
        })
    }),
    create: ((req, res) => {
        const chuTro_id = req.chuTro._id;
        const hoaDon = new HoaDons({
            _id: new mongoose.Types.ObjectId(),
            tenHoaDon: req.body.tenHoaDon,
            chuTro_id: chuTro_id,
            khuTro_id: req.body.khuTro_id,
            khachThue_id: req.body.khachThue_id,
            phongTro_id: req.body.phongTro_id,
            dichVu_ids: req.body.dichVu_ids,
            ngayLapHoaDon: Date.now(),
            tongTien: Number(req.body.tongTien),
            noiDung: req.body.noiDung,
        })
       
        
        hoaDon.save().then(response => {
            res.status(200).json({ data: response });
        }).catch(err => {
            res.status(400).json(err);
        })
    }),
    update: ((req, res) => {
        const id = req.params.id;
        const hoaDonUpdate = {
            tienThanhToan:req.body.tienThanhToan,
            tinhTrang:Boolean( req.body.tinhTrang)
        }
        HoaDons.findByIdAndUpdate(id, hoaDonUpdate).then(response => {
            res.status(200).json({ data: response });
        }).catch(err => {
            res.status(400).json(err)
        })
    }),
    delete: ((req, res) => {
        const id = req.params.id;
        HoaDons.findByIdAndDelete(id).then(response => {
            res.status(200).json({ response })
        }).catch(err => {
            res.status(400).json(err)
        })
    })
}