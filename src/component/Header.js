import React from "react";
import logo from "../logo.svg";

const Header = () => {
  return (
    <header className="App-header absolute top-0 right-0 w-full">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Chat Application</h1>
    </header>
  );
};

export default Header;
