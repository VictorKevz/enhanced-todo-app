import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../css/header.css"
import moon from "../assets/images/icon-moon.svg"
import sun from "../assets/images/icon-sun.svg"

function Header({isDark,setDark}) {
 const toggleTheme = () =>{
    setDark(!isDark)
 }
  return (
    <header className="header-container">
     <h1 className={`header-title`}>Todo</h1>
     <button className={`toggle-btn`} onClick={toggleTheme}>
        <img src={isDark ? sun : moon} alt={isDark ? "Icon of the sun" : "Icon of the moon"} />
     </button>
    </header>
  );
}

export default Header;