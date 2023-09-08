"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import classes from "./NavBar.module.scss";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlineSearch,
} from "react-icons/ai";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SearchFilter } from "@/types";
import { setSearchOptions } from "@/redux/features/searchSlice";
import { useAppDispatch } from "@/redux/hooks";

const searchOptions: SearchFilter[] = [
  SearchFilter.All,
  SearchFilter.Location,
  SearchFilter.Case,
  SearchFilter.Victims,
  SearchFilter.Suspect,
];

const Navbar = () => {
  const [searchDropdownVisible, setSearchDropdownVisible] = useState(false);
  const [searchBy, setSearchBy] = useState<SearchFilter>(SearchFilter.All);
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useAppDispatch();

  const router = useRouter();

  const searchOptionRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  }, []);

  const handleClickOutside = (e) => {
    // TODO: Fix this error
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

  const handleSearchBySelect = (selected: SearchFilter) => {
    setSearchBy(selected);
    toggleSearchDropDown();
  };

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(setSearchOptions({ searchFilter: searchBy, searchQuery }));
      router.push(`/search?filter=${searchBy}&query=${searchQuery}`);
      setSearchQuery("");
    }
  };

  return (
    <div className={classes.container}>
      <Link href="/">
        <div className={classes.logo}>Crimebase</div>
      </Link>
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => handleSearch(e)}
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
