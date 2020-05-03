import React from "react";
import "./App.css";
import Routes from "./routes";

import logo from "./assets/logo.svg";

export default function App() {
  return (
    <div className="container">
      <img src={logo} alt="logo"></img>
      <div className="content">
        <Routes />
      </div>
    </div>
  );
}
