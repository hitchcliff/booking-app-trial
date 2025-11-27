import { FirebaseApp, initializeApp } from "@firebase/app";

export default function FirebaseAdminSdk(): FirebaseApp {
  const firebaseConfig = {
    apiKey: "AIzaSyAmuf1_DBC4yNjZuYO0KNHd3zXFNyGhR8A",
    authDomain: "temp-trial-task-asap.firebaseapp.com",
    projectId: "temp-trial-task-asap",
    storageBucket: "temp-trial-task-asap.firebasestorage.app",
    messagingSenderId: "887361181342",
    appId: "1:887361181342:web:d23b79e1eebd2d2391cd8f",
  };

  // Initialize Firebase
  return initializeApp(firebaseConfig);
}
