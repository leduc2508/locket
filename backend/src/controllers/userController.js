const User = require('../models/User');

exports.checkUser = async (req, res) => {
    const { email, phone, username } = req.body;

    try {
        let exists = false;

        if (email) {
            const user = await User.findOne({ email });
            if (user) exists = true;
        } 
        if (phone) {
            const user = await User.findOne({ phone });
            if (user) exists = true;
        }
        if (username) {
            const user = await User.findOne({ username });
            if (user) exists = true;
        }

        return res.json({ exists });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error!" });
    }
};
exports.createUser = async (req, res) => {
    const {email, phone, password, fullname, username } = req.body;
    try {
        if((!email && !phone) || !password) {
            return res.status(400).json({success: false, message: "Thiếu thông tin bắt buộc!"});
        }
        const newUser = new User({
            email: email || null,
            phone: phone || null,
            password,
            fullname,
            username
        })
        await newUser.save();
        return res.status(201).json({
            success: true,
            message: "Tạo user thành công!",
            user: newUser
        })
    } catch (error) {
        console.log("Lỗi createUser:", error);
        return res.status(500).json({success: false, message: 'Lỗi server!'})
    }
}

exports.login = async (req, res) => {
    const { email, phone, password } = req.body;
    try {
        if((!email && !phone) || !password) {
            return res.status(400).json({success: false, message: "Thiếu thông tin bắt buộc!"});
        }
        const user = await User.findOne(email? {email}: {phone});
        if(!user) {
            return res.status(404).json({success: false, message: 'Người dùng không tồn tại!'})
        }
        if(user.password !== password) {
            return res.status(404).json({success: false, message: 'Sai mật khẩu!'})
        } 
        return res.status(200).json({
            success: true,
            message: "Đăng nhập thành công!",
            user: {
                id: user._id,
                email: user.email,
                phone: user.phone,
                username: user.username,
                fullname: user.fullname
            }
        });
    } catch (error) {
        console.log("Lỗi login:", error);
        return res.status(500).json({success: false, message: 'Lỗi server!'})
    }
}