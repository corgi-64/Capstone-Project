const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({ 
    //Email is unique
    email: {
        type: String,
        unique: true
     
    },
    createdAt: Date,
    expiresAt: Date
 });

 const OTP = mongoose.model("OTP", otpSchema);
 module.exports = OTP;