import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { initializeApp } from "firebase/app";

const token = process.env.REACT_APP_FIREBASE_KEY;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const firebaseConfig = {
  apiKey: token,
  authDomain: "cdtauth.firebaseapp.com",
  projectId: "cdtauth",
  storageBucket: "cdtauth.appspot.com",
  messagingSenderId: "863528361766",
  appId: "1:863528361766:web:7f3184228217b8f5bf6be7",
};

initializeApp(firebaseConfig);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
