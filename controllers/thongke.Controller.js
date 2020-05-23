const Khutros = require('../models/khuTro.Model');
const HoaDons = require('../models/hoaDon.Model');
const getYear = require('date-fns/getYear');
const getDate = require('date-fns/getDate');
const getMonth = require('date-fns/getMonth');

module.exports = {
    get: (async (req, res) => {
        const id = req.chuTro._id;
        const khuTro = await Khutros.find({ chuTro_id: id }).populate([
            {
                path: 'phongTro_ids',

            },
        ]);
        let month = getMonth(new Date()) - 1;
        let danhThuThang = 0;
        let danhThuThangTruoc = 0;

        const hoaDon = await HoaDons.find({ chuTro_id: id });
        let totalHoaDon = hoaDon.length;
        let hoaDonChuaThanhToan = 0
        hoaDon.forEach(item => {
            if (item.tinhTrang == false) {
                hoaDonChuaThanhToan = hoaDonChuaThanhToan + 1
            } else if ((getMonth(item.ngayLapHoaDon)) === month) {
                danhThuThang = danhThuThang + item.tongTien;
            } else if ((getMonth(item.ngayLapHoaDon)) === month - 1) {
                danhThuThangTruoc = danhThuThangTruoc + item.tongTien;
            }
        })


        res.status(200).json({
            khuTro: khuTro,
            hoaDon: {
                month: month + 1,
                total: totalHoaDon,
                danhThuThang: danhThuThang,
                danhThuThangTruoc: danhThuThangTruoc,
                hoaDonChuaThanhToan: hoaDonChuaThanhToan,
                result: hoaDon
            }
        })
    })
}