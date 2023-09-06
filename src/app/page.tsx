"use client";

import { useState, useEffect } from "react";
import classes from "./page.module.css";
import axios from "axios";
import Image from "next/image";

enum Status {
  Open = "open",
  Solved = "solved",
}

enum VictimFate {
  Murdered = "murdered",
  AttemptedMurder = "attemptedMurder",
  Missing = "missing",
  Injured = "injured",
}

enum SuspectStatus {
  Confirmed = "confirmedAsPerp",
  Cleared = "cleared",
}

interface Victim {
  name: string;
  mainImageUrl: string;
  fate: VictimFate;
}

interface Suspect {
  name: string;
  status: SuspectStatus;
  mainImageUrl: string;
}

// TODO: Create util function to separate camel case terms into 2+ words
enum CaseType {
  Murder = "murder",
  Disappearance = "disappearance",
  MD = "mysteriousDeath",
  Terrorism = "terrorism",
  Rape = "rape",
  Assassination = "assassination",
  AM = "attemptedMurder",
  MS = "massShooting",
}

interface Case {
  id: number;
  threadId: number;
  title: string;
  summary?: string;
  location: string;
  mainImageUrl?: string;
  status: Status;
  buzzing?: boolean;
  victims: Victim[];
  suspects?: Suspect[];
  caseTypes: CaseType[];
}

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
