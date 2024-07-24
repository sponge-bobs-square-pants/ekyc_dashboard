const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema(
  {
    user_ns: {
      type: String,
      required: true,
    },
    Email: String,
    PhoneNumber: Number,
    FullName: String,
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
