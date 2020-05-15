const mongoose = require('mongoose');


const phongTroSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    tenPhongTro: { type: String },
    slNguoiToiDa: { type: Number },
    dienTich: { type: Number },
    Tang: Number,
    gacLung: { type: Boolean, default: false },
    giaPhong: { type: Number },
    moTa: String,
    dichVu_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DichVu' }],
    tinhTrangPhong: { type: Boolean, default: false },
    khachThue_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'KhachThue' }],
    hoaDon_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'HoaDon' }],
   

})

module.exports = mongoose.model('PhongTro', phongTroSchema);