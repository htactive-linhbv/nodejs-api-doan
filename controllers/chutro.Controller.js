
const ChuTro = require('../models/chuTro.Model');
const bcrypt = require('bcrypt');
//const { validationResult } = require('express-validator');
const { add } = require('date-fns');
const mongoose = require('mongoose');
const getYear = require('date-fns/getYear');
const getDate = require('date-fns/getDate');
const getMonth = require('date-fns/getMonth');
const nodemailer = require("nodemailer");


module.exports = {
    get: (req, res) => {
        // const  lengthdata = ChuTro.countDocuments({},number=>number);
        ChuTro.find().then(response => {
            response.forEach(docs => {
                docs._doc.ngayDangKy = `${getDate(docs.ngayDangKy)}.${getMonth(docs.ngayDangKy) + 1}.${getYear(docs.ngayDangKy)}`;
                docs._doc.ngayHetHan = `${getDate(docs.ngayHetHan)}.${getMonth(docs.ngayHetHan) + 1}.${getYear(docs.ngayHetHan)}`;
            })
            res.status(200).json({
                data: response,

            })
        }).catch(err => {
            res.start(401).json(err)
        })
    },
    getPage: (req, res) => {
        const page = req.params.page;
        ChuTro.find().limit(10).skip((page - 1) * 10)
            .then(data => {
                res.status(200).json({
                    messenger: "Get success",
                    data: data
                })
            })
            .catch(err => {
                res.status(404).json({
                    messenger: "get err",
                    error: err
                })
            });

    },
    getId: (req, res) => {
        const id = req.params.id;
        ChuTro.findById(id).then(data => {
            res.status(200).json({
                messenger: "Get success",
                data: data
            })
        })
            .catch(err => {
                res.status(404).json({
                    messenger: "get err",
                    error: err
                })
            })
    },
    delete: (req, res) => {
        const id = req.params.id;
        ChuTro.findByIdAndDelete(id).then(() => {
            res.status(200).json({
                messenger: "delete success"
            })
        }).catch(err => {
            res.status(401).json(err)
        })
    },
    update: ((req, res) => {
        const id = req.params.id;
        const goi = Number(req.body.goi);
        ChuTro.findById(id,(err,doc)=>{
            if(err){
                res.status(400).json(err)
            }else{
                doc.ngayHetHan = add(doc.ngayHetHan, { days: goi * 30 });
                doc.save().then(()=>{
                    res.status(200).json({data:doc})
                }).catch(err=>{
                    res.status(400).json(err)
                })
                
            }
        })
            
            
        
       
    }),
    getchuTro: ((req, res) => {
        const id = req.chuTro._id;
        ChuTro.findById(id).then(response => {
            response._doc.ngayHetHan = `${getDate(response.ngayHetHan)}/${getMonth(response.ngayHetHan) + 1}/${getYear(response.ngayHetHan)}`;
            res.status(200).json({ data: response })
        }).catch(err => {
            res.status(400).json(err)
        })
    }),
    create: (req, res) => {
        ChuTro.find({ email: req.body.email }).then(response => {
            
            if (response.length === 0) {
                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false,
                    auth: {
                        user: 'khutrodn@gmail.com', // email hoặc username
                        pass: 'buivanlinh1998zz' // password
                    }
                });
                //mã hoá mật khảu
                let randomPass = Math.random().toString(36).substring(5);
                const salt = bcrypt.genSaltSync(10);
                const PasswardHash = bcrypt.hashSync(randomPass, salt)

                // get date hien tai
                let start = Date.now();
                //+ goidk = ngayHetHan
                const goi = Number(req.body.goi);

                let end = add(start, { days: goi * 30 });


                // tạo new đối tượng chutro
                const chuTro = new ChuTro({
                    _id: new mongoose.Types.ObjectId(),
                    hoVaTen: req.body.hoVaTen,
                    email: req.body.email,
                    soDienThoai: req.body.soDienThoai,
                    password: PasswardHash,
                    ngayDangKy: start,
                    ngayHetHan: end,
                })
                 transporter.sendMail({
                    from: '"KHUTRO👻" <foo@example.com>', // sender address
                    to: req.body.email, // list of receivers
                    subject: "Quản lý nhà trọ – Tạo tài khoản thành công ✔", // Subject line
                  
                    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                    <html xmlns="http://www.w3.org/1999/xhtml">
                    <head>
                      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                      <meta name="viewport" content="width=device-width, initial-scale=1" />
                      <title>Neopolitan Confirm Email</title>
                      <!-- Designed by https://github.com/kaytcat -->
                      <!-- Robot header image designed by Freepik.com -->
                    
                      <style type="text/css">
                      @import url(http://fonts.googleapis.com/css?family=Droid+Sans);
                    
                      /* Take care of image borders and formatting */
                    
                      img {
                        max-width: 600px;
                        outline: none;
                        text-decoration: none;
                        -ms-interpolation-mode: bicubic;
                      }
                    
                      a {
                        text-decoration: none;
                        border: 0;
                        outline: none;
                        color: #bbbbbb;
                      }
                    
                      a img {
                        border: none;
                      }
                    
                      /* General styling */
                    
                      td, h1, h2, h3  {
                        font-family: Helvetica, Arial, sans-serif;
                        font-weight: 400;
                      }
                    
                      td {
                        text-align: center;
                      }
                    
                      body {
                        -webkit-font-smoothing:antialiased;
                        -webkit-text-size-adjust:none;
                        width: 100%;
                        height: 100%;
                        color: #37302d;
                        background: #ffffff;
                        font-size: 16px;
                      }
                    
                       table {
                        border-collapse: collapse !important;
                      }
                    
                      .headline {
                        color: #ffffff;
                        font-size: 36px;
                      }
                    
                     .force-full-width {
                      width: 100% !important;
                     }
                    
                     .force-width-80 {
                      width: 80% !important;
                     }
                    
                    
                    
                    
                      </style>
                    
                      <style type="text/css" media="screen">
                          @media screen {
                             /*Thanks Outlook 2013! http://goo.gl/XLxpyl*/
                            td, h1, h2, h3 {
                              font-family: 'Droid Sans', 'Helvetica Neue', 'Arial', 'sans-serif' !important;
                            }
                          }
                      </style>
                    
                      <style type="text/css" media="only screen and (max-width: 480px)">
                        /* Mobile styles */
                        @media only screen and (max-width: 480px) {
                    
                          table[class="w320"] {
                            width: 320px !important;
                          }
                    
                          td[class="mobile-block"] {
                            width: 100% !important;
                            display: block !important;
                          }
                        }
                      </style>
                    </head>
                    <body class="body" style="padding:0; margin:0; display:block; background:#ffffff; -webkit-text-size-adjust:none" bgcolor="#ffffff">
                    <table align="center" cellpadding="0" cellspacing="0" class="force-full-width" height="100%" >
                      <tr>
                        <td align="center" valign="top" bgcolor="#ffffff"  width="100%">
                          <center>
                            <table style="margin: 0 auto;" cellpadding="0" cellspacing="0" width="600" class="w320">
                              <tr>
                                <td align="center" valign="top">
                    
                                    <table style="margin: 0 auto;" cellpadding="0" cellspacing="0" class="force-full-width" style="margin:0 auto;">
                                      
                                    </table>
                    
                                    <table style="margin: 0 auto;" cellpadding="0" cellspacing="0" class="force-full-width" bgcolor="#4dbfbf">
                                      <tr>
                                        <td>
                                        <br>
                                          <img src="https://www.filepicker.io/api/file/carctJpuT0exMaN8WUYQ" width="224" height="240" alt="robot picture">
                                        </td>
                                      </tr>
                                      <tr>
                                        <td class="headline">
                                          Xin chào!
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                    
                                          <center>
                                            <table style="margin: 0 auto;" cellpadding="0" cellspacing="0" width="60%">
                                              <tr>
                                                <td style="color:#187272;">
                                                <br>
                                                 Quản lý nhà trọ KHUTRO kính chào Anh/Chị
                                                <br>
                                                <br>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td style="color:#187272;">
                                                <br>
                                               Anh/Chị vừa Đăng ký tài khoản thành công trên KhuTro.
                                                <br>
                                                <br>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td style="color:#f8f9fa;">
                                                <br>
                                                Mật khẩu đăng nhập của Anh/Chị là: ${randomPass}
                                                <br>
                                                <br>
                                                </td>
                                              </tr>
                                               <tr>
                                                <td style="color:#187272;">
                                                <br>
                                               Để sử dụng quý khách vui lòng truy cập đường dẫn sau:'' và tiến hành đổi lại mật khẩu
                                                <br>
                                                <br>
                                                </td>
                                              </tr>
                                            </table>
                                          </center>
                    
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <div><!--[if mso]>
                                            <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://" style="height:50px;v-text-anchor:middle;width:200px;" arcsize="8%" stroke="f" fillcolor="#178f8f">
                                              <w:anchorlock/>
                                              <center>
                                            <![endif]-->
                                                <a href="http://khutro.xyz/quantri/dichvu"
                                          style="background-color:#178f8f;border-radius:4px;color:#ffffff;display:inline-block;font-family:Helvetica, Arial, sans-serif;font-size:16px;font-weight:bold;line-height:50px;text-align:center;text-decoration:none;width:200px;-webkit-text-size-adjust:none;">Truy cập trang Quản trị</a>
                                            <!--[if mso]>
                                              </center>
                                            </v:roundrect>
                                          <![endif]--></div>
                                          <br>
                                          <br>
                                        </td>
                                      </tr>
                                    </table>
                                    <table style="margin: 0 auto;" cellpadding="0" cellspacing="0" class="force-full-width" bgcolor="#f5774e">
                                      <tr>
                                        <td style="background-color:#f5774e;">
                                        <center>
                                        </center>
                                        </td>
                                      </tr>
                                    </table>
                                    <table style="margin: 0 auto;" cellpadding="0" cellspacing="0" class="force-full-width" bgcolor="#414141" style="margin: 0 auto">
                                      <tr>
                                        <td style="background-color:#414141;">
                                        <br>
                                        <br>
                                          <img src="https://www.filepicker.io/api/file/R4VBTe2UQeGdAlM7KDc4" alt="google+">
                                          <img src="https://www.filepicker.io/api/file/cvmSPOdlRaWQZnKFnBGt" alt="facebook">
                                          <img src="https://www.filepicker.io/api/file/Gvu32apSQDqLMb40pvYe" alt="twitter">
                                          <br>
                                          <br>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style="color:#bbbbbb; font-size:12px;">
                                           © 2020 thiết kế và hoàn thiện khutro.com
                                           <br>
                                           <br>
                                        </td>
                                      </tr>
                                    </table>
                                </td>
                              </tr>
                            </table>
                        </center>
                        </td>
                      </tr>
                    </table>
                    </body>
                    </html>` // html body
                  });
                 
                chuTro.save((err, response) => {
                    if (err) {
                        res.status(401).json(err);
                    }
                    res.status(200).json({
                        messenger: "succsess",
                        data: response
                    });
                })
            } else {
                res.status(400).json({ err: "email này đã tồn tại" })
            }


        }).catch(err => {
            console.log(err);
            res.status(401)
        })
    },


}