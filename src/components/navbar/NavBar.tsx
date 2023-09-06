import React from "react";
import classes from "./NavBar.module.scss";
import { AiFillCaretDown, AiOutlineSearch } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className={classes.container}>
      <div className={classes.logo}>Crimebase</div>
      <div className={classes.inputContainer}>
        <div className={classes.searchBy}>
          <span>All</span>
          <AiFillCaretDown />
        </div>
        <div className={classes.inputWrapper}>
          <input
            type="text"
            placeholder="Search Crimebase..."
            className={classes.searchInput}
          />
          <AiOutlineSearch className={classes.icon} size={25} />
        </div>
      </div>
      <button className={classes.signInBtn}>Sign In</button>
      <div className={classes.languageContainer}>
        <span>EN</span>
        <AiFillCaretDown />
      </div>
    </div>
  );
};

export default Navbar;
