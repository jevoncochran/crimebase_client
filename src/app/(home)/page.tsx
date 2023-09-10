"use client";

import { useState, useEffect } from "react";
import classes from "./HomePage.module.scss";
import axios from "axios";
import Image from "next/image";
import { Case } from "../../types";
import Carousel from "react-elastic-carousel";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setSelectedCase } from "@/redux/features/caseSlice";

export default function Home() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const [buzzingCases, setBuzzingCases] = useState<Case[]>([]);
  const [localCases, setLocalCases] = useState<Case[]>([]);

  const buzzingCasesDoubled = [...buzzingCases, ...buzzingCases];
  console.log(buzzingCasesDoubled);

  const breakPoints = [
    { width: 1, itemsToShow: 3 },
    // { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    // { width: 768, itemsToShow: 3 },
    // { width: 1200, itemsToShow: 4 }
  ];

  const handleCaseSelect = (caseInfo: Case) => {
    dispatch(setSelectedCase(caseInfo));
    router.push(`/case/${caseInfo.id}`);
  };

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
          <Carousel breakPoints={breakPoints}>
            {buzzingCasesDoubled.map((caseInfo) => (
              <div
                key={caseInfo.id}
                className={classes.caseCard}
                onClick={() => handleCaseSelect(caseInfo)}
              >
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
          </Carousel>
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
