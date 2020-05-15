const KhachThues = require('../models/khachThue.Model');
const mongoose = require('mongoose');
const parse = require('date-fns/parse');
const getYear = require('date-fns/getYear');
const getDate = require('date-fns/getDate');
const getMonth = require('date-fns/getMonth');
const fs = require('fs')

module.exports = {
   

    get: ((req, res) => {
        const chuTro_id = req.chuTro._id;
        KhachThues.find({ chuTro_id: chuTro_id }).then(response => {
            res.status(200).json({ data: response })
        }).catch(err => {
            res.status(400).json(err)
        })
    }),
    getId: ((req, res) => {
        const id = req.params.id;
        KhachThues.findById(id).then(response => {
            const ngaySinhF = `${getDate(response.ngaySinh)}.${getMonth(response.ngaySinh)+1}.${getYear(response.ngaySinh)}`;
            const ngayCapCMNDF = `${getDate(response.ngayCapCMND)}.${getMonth(response.ngayCapCMND)+1}.${getYear(response.ngayCapCMND)}`;

            response._doc.ngaySinh = ngaySinhF;
            response._doc.ngayCapCMND = ngayCapCMNDF;
           

            res.status(200).json({ data: response });
        }).catch(err => {
            res.status(400).json(err)
        })
    }),
    getKhachThue:((req,res)=>{
        chuTro_id = req.chuTro._id;
        KhachThues.find({chuTro_id:chuTro_id,trangThai:false},{tenKhachThue:1}).then(response=>{
            res.status(200).json({data:response})
        }).catch(err=>{
            res.status(400).json(err)
        })
    }),
    create: ((req, res) => {

        const khachThue = new KhachThues({
            _id: mongoose.Types.ObjectId(),
            chuTro_id: req.chuTro._id,
            tenKhachThue: req.body.tenKhachThue,
            sdtKhachThue: req.body.sdtKhachThue,
            ngaySinh: parse(req.body.ngaySinh, 'dd.MM.yyyy', new Date()),
            soCMND: req.body.soCMND,
            ngayCapCMND: parse(req.body.ngayCapCMND, 'dd.MM.yyyy', new Date()),
            noiCapCMND: req.body.noiCapCMND,
            ngheNghiep: req.body.ngheNghiep,
            gioiTinh: req.body.gioiTinh,
            hoKhau: req.body.hoKhau,
            noiCongTac: req.body.noiCongTac,
            hoTenBoMe: req.body.hoTenBoMe,
            sdtBoMe: req.body.sdtBoMe,
            ghiChu: req.body.ghiChu,
            anhDaiDien: `/images/${req.files.anhDaiDien[0].filename}`,
            anhCMNDTruoc: `/images/${req.files.anhCMNDTruoc[0].filename}`,
            anhCMNDSau: `/images/${req.files.anhCMNDSau[0].filename}`,
        })
        khachThue.save().then(response => {
            res.status(200).json({ data: response })
        }).catch(err => {
            res.status(400).json(err)
        })
    }),
    update: ((req, res) => {
        const id = req.params.id;
        
        const khachThue = {
            tenKhachThue: req.body.tenKhachThue,
            sdtKhachThue: req.body.sdtKhachThue,
            ngaySinh: parse(req.body.ngaySinh, 'dd.MM.yyyy', new Date()),
            soCMND: req.body.soCMND,
            ngayCapCMND: parse(req.body.ngayCapCMND, 'dd.MM.yyyy', new Date()),
            noiCapCMND: req.body.noiCapCMND,
            ngheNghiep: req.body.ngheNghiep,
            gioiTinh: req.body.gioiTinh,
            hoKhau: req.body.hoKhau,
            noiCongTac: req.body.noiCongTac,
            hoTenBoMe: req.body.hoTenBoMe,
            sdtBoMe: req.body.sdtBoMe,
            ghiChu: req.body.ghiChu,
        }


        KhachThues.findByIdAndUpdate(id, khachThue).then(response => {
            res.status(200).json({ data: response })
        }).catch(err => {
            res.status(400).json(err)
        })
    }),
    delete: ((req, res) => {
        const id = req.params.id
        KhachThues.findById(id, (err, doc) => {
            if (err) {
                res.status(400).json({ mesage: 'Không tìm thấy file' })
            } else {
                doc.remove((err, response) => {
                    if (err) {
                        res.status(400).json({ mesage: 'delete Thất bại' })
                    } else {
                        fs.unlinkSync(`public/${doc.anhDaiDien}`);
                        fs.unlinkSync(`public/${doc.anhCMNDSau}`);
                        fs.unlinkSync(`public/${doc.anhCMNDTruoc}`);
                        res.status(200).json(response)
                    }
                })
            }
        })

    }),
    getKhachThueAll:((req,res)=>{
        const chuTro_id = req.chuTro._id;
        KhachThues.find({chuTro_id:chuTro_id},{tenKhachThue:1}).then(response=>{
            res.status(200).json({data:response})
        }).catch(err=>{
            res.status(400).json(err)
        })
    })
}