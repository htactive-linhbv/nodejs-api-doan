const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    hoTen: { type: String, required: true},
    soDienThoai: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gioiTinh: { type: String, required: true },
    diaChi: { type: String, required: true }
   
})

module.exports = mongoose.model('User', userSchema);