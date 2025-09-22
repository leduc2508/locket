const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, sparse: true, lowercase: true, trim: true },
    phone: { type: String, unique: true, sparse: true, trim: true },
    password: { type: String, required: true },
    fullname: { type: String, trim: true },
    username: { type: String, unique: true, required: true, trim: true, lowercase: true },
}, { timestamps: true });


module.exports = mongoose.model("User", userSchema);
