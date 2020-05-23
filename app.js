const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const path = require('path');
const app = express();

const cors = require('cors');
app.use(cors())
//connect database
mongoose.connect(
    'mongodb+srv://admin:admin@qlphongtro-g127b.mongodb.net/test?retryWrites=true&w=majority',
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    },

);

app.use(express.static(path.join(__dirname, 'public')));
app.use('public', express.static(path.join(__dirname, 'public')));


// khao báo Router
const chutroRouter = require('./routes/chutro.Router');
const userRouter = require('./routes/user.Router');
const dichvuRouter = require('./routes/dichvu.Router');
const loginRouter = require('./routes/login.Router');
const thietBiRouter = require('./routes/thietbi.Router');
const khuTroRouter = require('./routes/khuTro.Router');
const khachThueRouter = require('./routes/khachThue.Router');
const phongTroRouter = require('./routes/phongtro.Router');
const hopDongRouter = require('./routes/hopDong.Router');
const hoaDonRouter = require('./routes/hoadon.Router');
const baiDangRouter = require('./routes/baidang.Router');
const thongKeRouter = require('./routes/thongke.Router');
//middlerware

//use middleware morgan
app.use(morgan('dev'));

//user middleware bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use router 
app.use('/api/login', loginRouter);

app.use('/api/chutro', chutroRouter);
app.use('/api/user', userRouter);
app.use('/api/dichvu', dichvuRouter);
app.use('/api/thietbi', thietBiRouter)
app.use('/api/khutro', khuTroRouter);
app.use('/api/khachthue', khachThueRouter);
app.use('/api/phongtro', phongTroRouter);
app.use('/api/hopdong', hopDongRouter);
app.use('/api/hoadon', hoaDonRouter);
app.use('/api/baidang', baiDangRouter);
app.use('/api/thongke', thongKeRouter);
//use err
app.use((req, res, next) => {
    const error = new Error('not found');
    error.status(404);
    next(error);
})
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    })
})
//create node server by express
app.listen(port, () => console.log(`server running on port: ${port}`));


module.exports = app;

