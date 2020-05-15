const HopDongs = require('../models/hopDong.Model');
const mongoose = require('mongoose');
const parse = require('date-fns/parse');
 const getYear = require('date-fns/getYear');
 const getDate = require('date-fns/getDate');
 const getMonth = require('date-fns/getMonth');


module.exports = {
    getAll: ((req, res) => {
        const chuTro_id = req.chuTro._id;
        HopDongs.find({ chuTro_id: chuTro_id }).populate([
            {
                path:'khachThue_id',
                select:'tenKhachThue'
            },
            {
                path:'khuTro_id',
                select:'tenKhuTro'
            },
            {
                path:'phongTro_id',
                select:'tenPhongTro'
            }
        ]) .then(response => {
            response.forEach(docs=>{
                docs._doc.ngayBatDau = `${getDate(docs.ngayBatDau)}.${getMonth(docs.ngayBatDau)+1}.${getYear(docs.ngayBatDau)}`;
                docs._doc.ngayKetThuc = `${getDate(docs.ngayKetThuc)}.${getMonth(docs.ngayKetThuc)+1}.${getYear(docs.ngayKetThuc)}`;

            })

            res.status(200).json({ data: response })
        }).catch(err => {
            res.status(400).json(err)
        })
    }),
    getId: ((req, res) => {
        const id = req.params.id;
        HopDongs.findById(id).then(response => {
            res.status(200).json({ data: response })
        }).catch(err => {
            res.status(400).json(err)
        })
    }),
    create: ((req, res) => {     
        const hopDong = new HopDongs({
            _id: mongoose.Types.ObjectId(),
            chuTro_id: req.chuTro._id,
            tenHopDong: req.body.tenHopDong,
            loaiHopDong: req.body.loaiHopDong,
            khachThue_id: req.body.khachThue_id,
            khuTro_id:req.body.khuTro_id,
            phongTro_id: req.body.phongTro_id,
            thoiHan: req.body.thoiHan,
            ngayBatDau:parse(req.body.ngayBatDau, 'dd.MM.yyyy', new Date()),
            ngayKetThuc: parse(req.body.ngayKetThuc, 'dd.MM.yyyy', new Date()),
            tienCoc:Number( req.body.tienCoc),
            noiDung: req.body.noiDung,
        })
        console.log(hopDong);
        
        hopDong.save().then(response=>{
            res.status(200).json({data:response})
        }).catch(err=>{
            res.status(400).json(err)
        })
    }),
    update:((req,res)=>{
        const id = req.params.id;
        HopDongs.findByIdAndUpdate(id,{
            tenHopDong: req.body.tenHopDong,
            loaiHopDong: req.body.loaiHopDong,
            khachThue_id: req.body.khachThue_id,
            khuTro_id:req.body.khuTro_id,
            phongTro_id: req.body.phongTro_id,
            thoiHan: req.body.thoiHan,
            ngayBatDau:parse(req.body.ngayBatDau, 'dd.MM.yyyy', new Date()),
            ngayKetThuc: parse(req.body.ngayKetThuc, 'dd.MM.yyyy', new Date()),
            tienCoc:Number( req.body.tienCoc),
            noiDung: req.body.noiDung,
        }).then(response=>{
            res.status(200).json({data:response})
        }).catch(err=>{
            req.status(400).json(err)
        })
    }),
    delete:((req,res)=>{
        const id = req.params.id;
        HopDongs.findByIdAndDelete(id,{password:0}).then(response=>{
            res.status(200).json({data:response})
        }).catch(err=>{
            res.status(400).json(err)
        })
    })
}