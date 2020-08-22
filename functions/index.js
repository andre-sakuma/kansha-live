const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const { api } = require('./api')
exports.app = functions.https.onRequest(api)
