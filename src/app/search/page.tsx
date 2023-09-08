"use client";

import { useState, useEffect } from "react";
import classes from "./SearchPage.module.scss";
import { useAppSelector } from "@/redux/hooks";
import { Case } from "@/types";
import axios from "axios";
import Image from "next/image";

const SearchPage = () => {
  const [cases, setCases] = useState<Case[]>([]);

  const searchFilter = useAppSelector((state) => state.search.searchFilter);
  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/cases/search?filter=${searchFilter}&query=${searchQuery}`
      )
      .then((res) => {
        console.log(res.data);
        setCases(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchFilter, searchQuery]);

  return (
    <div className={classes.main}>
      <h2 className={classes.header}>{`Search "${searchQuery}"`}</h2>
      <div className={classes.subHeaderWrapper}>
        <h3 className={classes.subHeader}>Cases</h3>
      </div>
      <div className={classes.resultsContainer}>
        {cases.map((c) => (
          <div key={c.id} className={classes.resultCard}>
            <Image
              src={c.mainImageUrl as string}
              alt={c.title}
              height={100}
              width={100}
              className={classes.image}
            />
            <div>
              <h4 className={classes.title}>{c.title}</h4>
              {c.caseTypes.map((ct) => (
                <span key={ct} className={classes.caseType}>
                  {ct}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
