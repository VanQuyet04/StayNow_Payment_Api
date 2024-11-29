require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./src/config/config')
const createOrderRoute = require('./src/routes/createOrderRoutes');
const callbackRoute = require('./src/routes/callbackRoutes');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sử dụng các route
app.use('/api', createOrderRoute);
app.use('/api', callbackRoute);

const PORT = config.port || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
