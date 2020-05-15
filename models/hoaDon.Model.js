const mongoose = require('mongoose');

const hoaDonSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
    tenHoaDon: { type: String, required: true },
    chuTro_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ChuTro' },
    khuTro_id:{type: mongoose.Schema.Types.ObjectId, ref: 'KhuTro'},
    khachThue_id:{type: mongoose.Schema.Types.ObjectId, ref: 'KhachThue'},
    phongTro_id:{type: mongoose.Schema.Types.ObjectId, ref: 'PhongTro'},
    dichVu_ids:[{type: mongoose.Schema.Types.ObjectId, ref: 'DichVu'}],
    ngayLapHoaDon:{type: Date},
    tienThanhToan:{type:Number, default:0},
    tongTien: { type: Number, required: true },
    noiDung: String,
    tinhTrang: { type: Boolean, default: false },
})

module.exports = mongoose.model('HoaDon', hoaDonSchema);