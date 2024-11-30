const admin = require('firebase-admin');
const serviceAccount = require('../../service/staynowapp1-firebase-adminsdk.json')
const config = require('../config/config')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.database_url
});

console.log("Khởi tạo firebase sdk thành công");

const dbRealtime = admin.database();
const dbFirestore = admin.firestore();

module.exports = { dbRealtime, dbFirestore }
