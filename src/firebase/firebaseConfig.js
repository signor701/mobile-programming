import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDdVZpljfwA7KxFNCWRR7HFh36yrgVY7QA",
  authDomain: "gharkhana-4ddba.firebaseapp.com",
  databaseURL: "https://gharkhana-4ddba-default-rtdb.firebaseio.com",
  projectId: "gharkhana-4ddba",
  storageBucket: "gharkhana-4ddba.appspot.com",
  messagingSenderId: "29541260346",
  appId: "1:29541260346:web:7f40cf969a24e414256903"
};

const app = initializeApp(firebaseConfig);

export const rtdb = getDatabase(app);

export default app;