const BaiDangs = require('../models/baiDang.Model');
const mongoose = require('mongoose');
const getYear = require('date-fns/getYear');
const getDate = require('date-fns/getDate');
const getMonth = require('date-fns/getMonth');
const fs = require('fs')

module.exports = {
    getBaiDang:((req,res)=>{
        BaiDangs.find().populate([
            { path: 'khuTro_id' },
            { path: 'phongTro_id' },

        ]).then(response => {
            let docF = response.sort(function(a, b) {
              
                return new Date(b.ngayDang) - new Date(a.ngayDang)
            });
            docF.forEach(docs=>{
                docs._doc.ngayDang = `${getDate(docs.ngayDang)}.${getMonth(docs.ngayDang) + 1}.${getYear(docs.ngayDang)}`;
            })
            res.status(200).json({ data: docF })
        }).catch(err => {
            res.status(400).json(err)
        })
    }),

    getAll: ((req, res) => {
        const chuTro_id = req.chuTro._id;
        BaiDangs.find({ chuTro_id: chuTro_id }).populate([
            { path: 'khuTro_id' },
            { path: 'phongTro_id' },

        ]).then(response => {
            response.forEach(docs=>{
                docs._doc.ngayDang = `${getDate(docs.ngayDang)}.${getMonth(docs.ngayDang) + 1}.${getYear(docs.ngayDang)}`;
            })
            res.status(200).json({ data: response })
        }).catch(err => {
            res.status(400).json(err)
        })
    }),
    getAdmin:((req,res)=>{
        BaiDangs.find().populate([
            { path: 'khuTro_id' },
            { path: 'phongTro_id' },

        ]).then(response => {
            response.forEach(docs=>{
                docs._doc.ngayDang = `${getDate(docs.ngayDang)}.${getMonth(docs.ngayDang) + 1}.${getYear(docs.ngayDang)}`;
            })
            res.status(200).json({ data: response })
        }).catch(err => {
            res.status(400).json(err)
        })
    }),
    getId: ((req, res) => {
        const id = req.params.id;
        BaiDangs.find({_id:id}).populate([
            { path: 'khuTro_id' },
            { path: 'phongTro_id' },
        ]).then(response => {
            res.status(200).json({data:response})
        }).catch(err => {
            res.status(400).json(err)
        })
    }),
    create: ((req, res) => {

        const images = req.files.map(x => `/images/baidang/${x.filename}`);
        const baiDang = new BaiDangs({
            _id: mongoose.Types.ObjectId(),
            chuTro_id: req.chuTro._id,
            tieuDe: req.body.tieuDe,
            khuTro_id: req.body.khuTro_id,
            phongTro_id: req.body.phongTro_id,
            moTa: req.body.moTa,
            ngayDang: Date.now(),
            soDienThoai: req.body.soDienThoai,
            images: images,
        })
        console.log(baiDang);

        baiDang.save().then(response => {
            res.status(200).json({ data: response })
        }).catch(err => {
            res.status(400).json(err)
        })
    }),
    delete: ((req, res) => {
        const id = req.params.id
        BaiDangs.findById(id, (err, doc) => {
            if (err) {
                res.status(400).json({ mesage: 'Không tìm thấy bài đăng' })
            } else {
                doc.remove((err, response) => {
                    if (err) {
                        res.status(400).json({ mesage: 'delete Thất bại' })
                    } else {
                        doc.images.forEach(element => {
                            fs.unlinkSync(`public/${element}`);
                        });
                        res.status(200).json(response)
                    }
                })
            }
        })

    }),
}