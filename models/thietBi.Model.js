const mongoose = require('mongoose');

const thietBiSchema = mongoose.Schema({
     _id : mongoose.Schema.Types.ObjectId,
    tenThietBi: { type: String },
    gia: { type: String,  },
    chuTro_id:{ type: mongoose.Schema.Types.ObjectId, ref: "ChuTro" },
    moTa: { type: String },
    trangThai:{type: Boolean, default:true},
    soLuong: {type:Number }
})

module.exports = mongoose.model('ThietBi', thietBiSchema);