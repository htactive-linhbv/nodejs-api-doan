const mongoose = require('mongoose');

const khachThueSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    chuTro_id: { type: mongoose.Schema.Types.ObjectId, ref: "ChuTro" },
    tenKhachThue:{type :String},
    sdtKhachThue:{type: String},
    ngaySinh:{type:Date},
    soCMND:{type: String},
    ngayCapCMND:{type: Date},
    noiCapCMND:{type : String},
    ngheNghiep:{type : String},
    gioiTinh:{type: String},
    hoKhau:{type :String},
    noiCongTac:{type:String},
    hoTenBoMe:{type:String},
    sdtBoMe:{type:String},
    ghiChu:{type: String},
    anhDaiDien:{type: String},
    anhCMNDTruoc:{type: String},
    anhCMNDSau:{type: String},
    trangThai:{type:Boolean , default:false}
})
module.exports = mongoose.model("KhachThue", khachThueSchema);