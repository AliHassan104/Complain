// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // baseUrl: 'http://' + window.location.hostname + ':8081',

  baseUrl:'https://api.jicomplain.com',

  // baseUrl: 'http://localhost:8081',

    // baseUrl: 'https://d633-101-53-235-105.ap.ngrok.io',
  firebase: {
    apiKey: "AIzaSyB8t7wlWQpISipd9RyOwLIdcw4MNQ5B-aA",
    authDomain: "complain-management-bfaa7.firebaseapp.com",
    projectId: "complain-management-bfaa7",
    storageBucket: "complain-management-bfaa7.appspot.com",
    messagingSenderId: "781555678779",
    appId: "1:781555678779:web:182451bb22a65161d9661e",
    measurementId: "G-S7VL9Z0F6N"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
