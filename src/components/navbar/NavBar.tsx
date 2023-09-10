"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import classes from "./NavBar.module.scss";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlineSearch,
} from "react-icons/ai";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { SearchFilter } from "@/types";
import { setSearchOptions } from "@/redux/features/searchSlice";
import { useAppDispatch } from "@/redux/hooks";
import { signIn, signOut, useSession } from "next-auth/react";
import { capitalize } from "@/utils/capitalize";

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

  const { data: session } = useSession();

  const router = useRouter();

  const page = usePathname();

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

  if (page.includes("login") || page.includes("register")) {
    return null;
  }

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
      {session?.user ? (
        <button className={classes.signInBtn} onClick={() => signOut()}>
          Sign Out
        </button>
      ) : (
        <button className={classes.signInBtn} onClick={() => signIn()}>
          Sign In
        </button>
      )}

      <div className={classes.languageContainer}>
        <span>EN</span>
        <AiFillCaretDown />
      </div>
    </div>
  );
};

export default Navbar;
