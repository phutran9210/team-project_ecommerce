// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCE_eFiL3gqRlRHRCw8KailERu1AJ-gkF0',
  authDomain: 'last-project-6fb33.firebaseapp.com',
  projectId: 'last-project-6fb33',
  storageBucket: 'last-project-6fb33.appspot.com',
  messagingSenderId: '1098197248366',
  appId: '1:1098197248366:web:fe1414206177abe16e797f',
  measurementId: 'G-21K4V9757Y',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
