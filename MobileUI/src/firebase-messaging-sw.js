importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');

// firebase.initializeApp({
//     apiKey: "AIzaSyCgzB2IcOFeSTkWgiMdd73eUUmnDLMdb-c",
//     authDomain: "fir-deea4.firebaseapp.com",
//     databaseURL: "https://fir-deea4.firebaseio.com",
//     projectId: "fir-deea4",
//     storageBucket: "fir-deea4.appspot.com",
//     messagingSenderId: "1045286324771",
//     appId: "1:1045286324771:web:eec50fd01bb965bdabbf96",
//     measurementId: "G-Z0VQEPRS5V"
// });
firebase.initializeApp({
  apiKey: "AIzaSyB8t7wlWQpISipd9RyOwLIdcw4MNQ5B-aA",
  authDomain: "complain-management-bfaa7.firebaseapp.com",
  projectId: "complain-management-bfaa7",
  storageBucket: "complain-management-bfaa7.appspot.com",
  messagingSenderId: "781555678779",
  appId: "1:781555678779:web:182451bb22a65161d9661e",
  measurementId: "G-S7VL9Z0F6N"
});

const messaging = firebase.messaging();
