const PhongTros = require('../models/phongTro.Model');
const KhuTros = require('../models/khuTro.Model');
const mongoose = require('mongoose');
const KhachThues = require('../models/khachThue.Model')

module.exports = {
    getAll: ((req, res) => {
        const chuTro_id = req.chuTro.chuTro_id;
        PhongTros.find({ chuTro_id: chuTro_id }).then(response => {
            res.status(200).json({ data: response })
        }).catch(err => {
            res.status(400).json(err)
        })
    }),

    getId: ((req, res) => {
        const id = req.params.id;
        PhongTros.findById(id).populate({path:'khachThue_ids'}).then(response => {
            res.status(200).json({ data: response })
        }).catch(err => {
            res.status(400).json(err)
        })
    }),
    getChiTietKhachThue:((req,res)=>{
        const id = req.params.id;
        PhongTros.findById(id).populate({path:'khachThue_ids'}).then(response=>{
            res.status(200).json({data:response})
        }).catch(err=>{
            res.status(400).json(err)
        })
    }),
    create:((req,res)=> {
        const khuTro_id = req.body.khuTro_id;
        const phong = new PhongTros({
            _id: mongoose.Types.ObjectId(),
            tenPhongTro: req.body.tenPhongTro,
            slNguoiToiDa: Number(req.body.slNguoiToiDa),
            dienTich: Number(req.body.dienTich) ,
            Tang: Number(req.body.Tang),
            gacLung: req.body.gacLung,
            giaPhong:  Number(req.body.giaPhong),
            moTa: req.body.moTa,
            tinhTrangPhong: false,   
        })
         
        phong.save().then(response=>{
           
            
            KhuTros.findByIdAndUpdate(khuTro_id,{$push:{phongTro_ids:response._id}}).then(()=>{
                res.status(200).json({data:response})
            }).catch(err=>{
                res.status(400).json(err)
            })
        }).catch(err=>{
            res.status(400).json(err)
        })
    }),
    update:((req,res)=>{
        const id = req.params.id;
        PhongTros.findByIdAndUpdate(id,{
          
            tenPhongTro: req.body.tenPhongTro,
            slNguoiToiDa: Number(req.body.slNguoiToiDa),
            dienTich: req.body.dienTich,
            Tang: Number(req.body.Tang),
            gacLung: Boolean(req.body.gacLung),
            giaPhong:  Number(req.body.giaPhong),
            moTa: req.body.moTa,
            tinhTrangPhong: Boolean(req.body.tinhTrangPhong),
        }).then(response=>{
            res.status(200).json({data:response})
        }).catch(err=>{
            res.status(400).json(err)
        })
    }),
    getphongtro:((req,res)=>{
        const khuTro_id = req.params.id;
        KhuTros.findById(khuTro_id,{phongTro_ids:1,tenKhuTro:1}).populate({path:'phongTro_ids'}).then(response=>{
            res.status(200).json({data:response});
        }).catch(err=>{
            res.status(400).json(err);
        })
    }),
    delete:((req,res)=>{
        const id = req.params.id;
        const khuTro_id = req.params.khuTro_id;
        PhongTros.findByIdAndDelete(id).then(()=>{
            KhuTros.findByIdAndUpdate(khuTro_id,{$pull:{phongTro_ids:id}}).then(response=>{
                res.status(200).json({data:response})
            }).catch(err=>{
                res.status(400).json(err)
            })
        }).catch(err=>{
            res.status(400).json(err)
        })
    }),
    addkhachthue:((req,res)=>{
        const id = req.body.phongTro_id;
        const khachThue_id = req.body.khachThue_id;
       PhongTros.findByIdAndUpdate(id,{
           $push:{khachThue_ids:khachThue_id},
           tinhTrangPhong:true           
        }).then(()=>{
           KhachThues.findByIdAndUpdate(khachThue_id,{trangThai:true}).then(doc=>{
               res.status(200).json({data:doc})
           }).catch(err=>{
               res.status(400).json(err)
           })
       }).catch(err=>{
           res.status(401).json(err)
       })
       
    }),
    deleteKhachThue:((req,res)=>{
        const id = req.body.phongTro_id;
        const khachThue_id = req.body.khachThue_id;
        PhongTros.findByIdAndUpdate(id,{$pull:{khachThue_ids:khachThue_id}}).then((response)=>{
            if(response.khachThue_ids.length<1){
                response.tinhTrangPhong= true
            }
           
            KhachThues.findByIdAndUpdate(khachThue_id,{trangThai:false}).then((doc)=>{
                response.save();
                res.status(200).json({data:doc})
            }).catch(err=>{
                res.status(400).json(err)
            })
        }).catch(err=>{
            res.status(401).json(err)
        })
    }),
    traPhong(req,res){
        const id = req.params.id;
     PhongTros.findById(id).then(response=>{
         const khachs = response.khachThue_ids;
         response.update({$pull:{khachThue_ids:{$in:khachs}}},(err,doc)=>{
             if(err){
                res.status(401).json(err)
                return
             }
             KhachThues.updateMany({_id:{$in:khachs}},{$set:{trangThai:false}},{"multi": true}).then(()=>{
                 res.status(200).json({message:'Trả thành công'})
             }).catch(error=>{
                 res.status(400).json(error)
             })
         })
     }).catch(()=>{
         res.status(400).json({message:'find thất bại'})
     })
    }

}
