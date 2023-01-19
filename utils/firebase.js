import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBDoqRGJbBBNc5jgbEZe4uhTNX5ANbuLVU",
  authDomain: "videozone-afd5c.firebaseapp.com",
  projectId: "videozone-afd5c",
  storageBucket: "videozone-afd5c.appspot.com",
  messagingSenderId: "97754628435",
  appId: "1:97754628435:web:f1406d74286993ee9661a6",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
