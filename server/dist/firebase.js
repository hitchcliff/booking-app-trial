"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FirebaseAdminSdk;
const app_1 = require("@firebase/app");
function FirebaseAdminSdk() {
    const firebaseConfig = {
        apiKey: "AIzaSyBqxTdl7-f3PsQEXPpF-Q86SaJBWnpD8qg",
        authDomain: "farmersupport-4757d.firebaseapp.com",
        projectId: "farmersupport-4757d",
        storageBucket: "farmersupport-4757d.firebasestorage.app",
        messagingSenderId: "694161693713",
        appId: "1:694161693713:web:9dce792d1aaed23a5ba5b0",
        measurementId: "G-WM4V1JQC00",
    };
    return (0, app_1.initializeApp)(firebaseConfig);
}
