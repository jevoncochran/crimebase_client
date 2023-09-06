"use client";

import { useState, useEffect, useRef } from "react";
import classes from "./NavBar.module.scss";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlineSearch,
} from "react-icons/ai";

enum SearchOptions {
  All = "all",
  Location = "location",
  Case = "case",
  Victims = "victims",
  Suspect = "suspect",
}

const searchOptions: SearchOptions[] = [
  SearchOptions.All,
  SearchOptions.Location,
  SearchOptions.Case,
  SearchOptions.Victims,
  SearchOptions.Suspect,
];

const Navbar = () => {
  const [searchDropdownVisible, setSearchDropdownVisible] = useState(false);
  const [searchBy, setSearchBy] = useState<SearchOptions>(SearchOptions.All);

  const searchOptionRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  }, []);

  const handleClickOutside = (e) => {
    if (!searchOptionRef.current?.contains(e.target)) {
      // Not sure why but if I put toggleSearchDropDown() here, it does not work
      setSearchDropdownVisible(false);
    } else {
      return;
    }
  };

  const toggleSearchDropDown = () => {
    setSearchDropdownVisible(!searchDropdownVisible);
  };

  // Capitalizes the first character of a string
  const capitalize = (str: string) => {
    const firstCharacter = str.charAt(0).toUpperCase();
    const firstCharacterRemoved = str.slice(1);

    const capitalized = firstCharacter + firstCharacterRemoved;

    return capitalized;
  };

  const handleSearchBySelect = (selected: SearchOptions) => {
    setSearchBy(selected);
    toggleSearchDropDown();
  };

  return (
    <div className={classes.container}>
      <div className={classes.logo}>Crimebase</div>
      <div className={classes.inputContainerWrapper}>
        <div className={classes.inputContainer}>
          <div className={classes.searchBy} onClick={toggleSearchDropDown}>
            <span>{capitalize(searchBy)}</span>
            {searchDropdownVisible ? <AiFillCaretUp /> : <AiFillCaretDown />}
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
        <div
          className={
            searchDropdownVisible
              ? classes.inputDropdownVisible
              : classes.inputDropdown
          }
          ref={searchOptionRef}
        >
          {searchOptions.map((so) => (
            <span
              key={so}
              className={
                searchBy === so
                  ? classes.selectedSearchOption
                  : classes.searchOption
              }
              onClick={() => handleSearchBySelect(so)}
            >
              {capitalize(so)}
            </span>
          ))}
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
