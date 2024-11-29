// routes/createOrderRoute.js
const express = require('express');
const axios = require('axios');
const CryptoJS = require('crypto-js');
const moment = require('moment');

const router = express.Router();
const config = require('../config/config');

router.post('/create-order', async (req, res) => {
    try {
        const { amount } = req.body;
        const transID = Math.floor(Math.random() * 1000000);
        const order = {
            app_id: config.app_id,
            app_user: 'Demo thanh toan',
            app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
            app_time: Date.now(),
            amount: amount,
            item: JSON.stringify([{}]),
            description: `Payment for order #${transID}`,
            embed_data: JSON.stringify({}),
            bank_code: "zalopayapp",
            callback_url: config.callback_url
        };

        const data = `${config.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
        order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

        const response = await axios.post(config.endpoint, null, { params: order });

        res.json({
            success: true,
            zalopay_response: response.data
        });
    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;
