import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD00DDfwdztYJEql911GZEx1-uDYd0FDi4",
  authDomain: "todo-app-a2ba8.firebaseapp.com",
  projectId: "todo-app-a2ba8",
  storageBucket: "todo-app-a2ba8.appspot.com",
  messagingSenderId: "990766306287",
  appId: "1:990766306287:web:b22d691125e67958ec5c1a",
  measurementId: "G-KL5276P316",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
