  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCEMhVGVEhv9c_OMhAIERRiO3_rZ_sRZ4w",
    authDomain: "smartserve-1942b.firebaseapp.com",
    projectId: "smartserve-1942b",
    storageBucket: "smartserve-1942b.firebasestorage.app",
    messagingSenderId: "74287686981",
    appId: "1:74287686981:web:0fd4cb7ee63677944f4a2c",
    measurementId: "G-96H13EZM7S"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);