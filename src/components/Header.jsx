/** @format */

import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className='header'>
      <i className='fab fa-github'></i>
      <h1 className='header__title'>Mithub</h1>
      <div className='header__column'>
        <span>login</span>
      </div>
    </header>
  );
}

export default Header;
