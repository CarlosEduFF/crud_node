// firebase.js
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./tapwm-41c0e-firebase-adminsdk-fbsvc-8cd7de0992.json'); // caminho correto

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

module.exports = db;
