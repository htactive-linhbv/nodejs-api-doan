const mongoose = require('mongoose');

const KhuTroSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    chuTro_id: { type:mongoose.Schema.Types.ObjectId, ref: "ChuTro" },
    tenKhuTro:{type: String},
    diaChi: { Tinh: String, Quan: String, Duong: String },
    mota: String,
    soTang: Number,
   // ngayNhapDienNuoc: Date,
    //ngayXuatHoaDon: Date,
    phongTro_ids: [{ type:mongoose.Schema.Types.ObjectId, ref: "PhongTro" }],
    trangThai :{type:Boolean}

})

module.exports = mongoose.model('KhuTro', KhuTroSchema);