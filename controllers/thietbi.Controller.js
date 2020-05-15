const ThietBis = require('../models/thietBi.Model');


module.exports = {
    getAll: ((req, res) => {
        ThietBis.find().then(response => {
            res.status(200).json({ data: response });
        }).catch(err => {
            res.status(400).json(err);
        })
    }),
    getID: ((req, res) => {
        const id = req.params.id;
        console.log(id);
        
        ThietBis.findById(id).then(response => {
            res.status(200).json({ data: response });
        }).catch(err => {
            res.status(400).json(err)
        })
    }),
    create: ((req, res) => {
        const thietbi = new ThietBis({
            _id: new mongoose.Types.ObjectId(),
            tenThietBi: req.body.tenThietBi,
            gia: Number(req.body.gia),
            moTa: req.body.moTa,
            soLuong:Number( req.body.soLuong),
            chuTro_id:req.body.chuTro_id
        })
        thietbi.save().then(response=>{
            res.status(200).json({data: response})
        }).catch(err=>{
            res.status(400).json(err)
        })
    }),
    update: ((req,res)=>{
        const id = req.params.id;
        const thietbiUpdate = {
            tenThietBi: req.body.tenThietBi,
            gia: Number(req.body.gia),
            moTa: req.body.moTa,
            soLuong: Number(req.body.soLuong),
            trangThai : Boolean(req.body.trangThai)
        }
        ThietBis.findByIdAndUpdate(id,thietbiUpdate).then(response=>{
            res.status(200).json({data:response,
            message:"update Thành công"
            })
        }).catch(err=>{
            res.status(400).json(err)
        })
    }),
    delete:((req,res)=>{
        const id = req.params.id;
        ThietBis.findByIdAndDelete(id).then(response=>{
            res.status(200).json(response);
        }).catch(err=>{
            res.status(400).json(err);
        })
    })

}