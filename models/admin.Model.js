const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  hoTen: { type: String },
  email: { type: String },
  password: { type: String },
  quyen: { type: String, default: 'admin' }

})

module.exports = mongoose.model('Admin', adminSchema);