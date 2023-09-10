"use client";

import React from "react";
import classes from "./CasePage.module.scss";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { capitalize } from "@/utils/capitalize";

const CasePage = () => {
  const selectedCase = useAppSelector((state) => state.case.selectedCase);

  return (
    <div className={classes.main}>
      <h2 className={classes.title}>{selectedCase?.title}</h2>
      <Image
        src={selectedCase?.mainImageUrl}
        alt={selectedCase?.title}
        width={500}
        height={500}
        className={classes.mainImage}
      />
      <div className={classes.typeContainer}>
        {selectedCase?.caseTypes.map((ct) => (
          <div key={ct} className={classes.type}>
            {capitalize(ct)}
          </div>
        ))}
      </div>
      <p className={classes.summary}>{selectedCase?.summary}</p>
    </div>
  );
};

export default CasePage;
