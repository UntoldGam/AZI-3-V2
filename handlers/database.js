
var admin = require("firebase-admin");

var serviceAccount = process.env.firebase_secret
admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(serviceAccount)),

    databaseURL: "https://legendary-studios-default-rtdb.firebaseio.com"
});
var database = admin.database();

const db = [];

db.get = (route) => {
    let ref = database.ref(route);
    ref.once("value", (snapshot) => {
        return snapshot.val();
    })
};

module.exports = db;