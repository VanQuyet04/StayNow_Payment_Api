const express = require('express');
const CryptoJS = require('crypto-js');
const router = express.Router();
const config = require('../config/config');  // Tải cấu hình từ file config

router.post('/callback', (req, res) => {
    const callbackData = req.body;
    const dataStr = callbackData.data; // Dữ liệu từ Zalopay
    const reqMac = callbackData.mac; // MAC từ Zalopay

    console.log(callbackData);

    // Tính toán MAC từ dữ liệu nhận được
    const calculatedMac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
    // So sánh MAC
    console.log("MAC cal:" + calculatedMac);

    if (reqMac !== calculatedMac) {
        console.log("MAC không hợp lệ");
        return res.status(400).json({ return_code: -1, return_message: "mac not equal" });
    }

    // Nếu MAC hợp lệ, xử lý dữ liệu
    const dataJson = JSON.parse(dataStr); // Giải mã dữ liệu
    console.log("Thông tin thanh toán:", dataJson);

    // Phản hồi lại Zalopay
    return res.status(200).json({ return_code: 1, return_message: "Success" });
});

module.exports = router;
