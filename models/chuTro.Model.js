const mongoose = require('mongoose');

const chuTroSchema = mongoose.Schema({
     _id: mongoose.Schema.Types.ObjectId,
    hoVaTen: { type: String},
    email: { type: String },
    soDienThoai: { type: String },
    password: { type: String },
    ngayDangKy: { type: Date },
    ngayHetHan: { type: Date },
    quyen: { type: String, default: "chutro" }

})

module.exports = mongoose.model('ChuTro', chuTroSchema);