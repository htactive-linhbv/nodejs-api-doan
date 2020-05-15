const mongoose = require('mongoose');

const hopDongSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    chuTro_id:{ type: mongoose.Schema.Types.ObjectId, ref: "ChuTro"},
    tenHopDong: { type: String },
    loaiHopDong:{type: String },
    khachThue_id: {  type: mongoose.Schema.Types.ObjectId, ref: "KhachThue" },
    khuTro_id:{  type: mongoose.Schema.Types.ObjectId, ref: "KhuTro" },
    phongTro_id: {  type: mongoose.Schema.Types.ObjectId, ref: "PhongTro" },
    thoiHan:{type: String},
    ngayBatDau:{type:Date},
    ngayKetThuc:{type:Date},
    tienCoc: { type: Number },
    noiDung: String,
})

module.exports = mongoose.model("HopDong", hopDongSchema);