"use client";

import React from "react";
import classes from "./SearchPage.module.scss";
import { useAppSelector } from "@/redux/hooks";

const SearchPage = () => {
  const searchFilter = useAppSelector((state) => state.search.searchFilter);
  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  return (
    <div className={classes.main}>
      <h2 className={classes.title}>{`Search "${searchQuery}"`}</h2>
    </div>
  );
};

export default SearchPage;
