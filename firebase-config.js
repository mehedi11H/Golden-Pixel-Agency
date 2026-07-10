// Firebase Configuration

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { 
getFirestore 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const firebaseConfig = {

apiKey: "AIzaSyBBC2jLMh5JSsPEPf2XiGbhAki0NP6AKbQ",

authDomain: "golden-pixel-agency-ed201.firebaseapp.com",

projectId: "golden-pixel-agency-ed201",

storageBucket: "golden-pixel-agency-ed201.firebasestorage.app",

messagingSenderId: "372375233487",

appId: "1:372375233487:web:cc3d2151e093a7c85028ba",

measurementId: "G-LY4WSW6T9Y"

};



const app = initializeApp(firebaseConfig);


const db = getFirestore(app);


export { db };
