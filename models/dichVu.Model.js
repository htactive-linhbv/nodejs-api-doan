const mongoose = require('mongoose');

const dichVuSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tenDV: { type: String,  },
    chuTro_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ChuTro' },
    moTaDV: { type: String },
    soDienThoai:{type : String},
    donGia: { type: Number, },
    donVi: { type: String,  },
    quyTacTinhTien: { type: String,  },
    trangThai: { type: Boolean, default: true },
})
module.exports = mongoose.model('DichVu', dichVuSchema);