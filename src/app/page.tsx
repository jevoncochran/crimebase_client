"use client";

import { useState, useEffect } from "react";
import classes from "./page.module.css";
import axios from "axios";
import Image from "next/image";
import { Case } from "./types";

export default function Home() {
  const [buzzingCases, setBuzzingCases] = useState<Case[]>([]);
  const [localCases, setLocalCases] = useState<Case[]>([]);

  useEffect(() => {
    const getBuzzingCases = () => {
      axios
        .get("http://localhost:8000/api/cases/inthenews")
        .then((res) => {
          setBuzzingCases(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getLocalCases = () => {
      axios
        .get("http://localhost:8000/api/cases/local")
        .then((res) => {
          setLocalCases(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getBuzzingCases();
    getLocalCases();
  }, []);
  return (
    <main className={classes.main}>
      <div className={classes.sectionWrapper}>
        <h2 className={classes.title}>In the News</h2>
        <div className={classes.casesContainer}>
          {buzzingCases.map((caseInfo) => (
            <div key={caseInfo.id} className={classes.caseCard}>
              <p className={classes.caseTitle}>{caseInfo.title}</p>
              {caseInfo.mainImageUrl ? (
                <Image
                  src={caseInfo.mainImageUrl}
                  alt={caseInfo.title}
                  height={400}
                  width={400}
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
      <div className={classes.sectionWrapper}>
        <h2 className={classes.title}>Local Cases</h2>
        <div className={classes.casesContainer}>
          {localCases.map((caseInfo) => (
            <div key={caseInfo.id} className={classes.caseCard}>
              <p className={classes.caseTitle}>{caseInfo.title}</p>
              {caseInfo.mainImageUrl ? (
                <Image
                  src={caseInfo.mainImageUrl}
                  alt={caseInfo.title}
                  height={400}
                  width={400}
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
