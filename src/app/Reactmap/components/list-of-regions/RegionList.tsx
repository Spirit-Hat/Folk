import React from "react";
import { useEffect, useState } from "react";
import "./RegionList.scss";

export interface region {
  title: string;
  key: string;
}

type Props = {
  getSelectedRegion(selectedRegion: string): unknown;
};

const RegionList = (props: Props) => {
  const [selectedRegion, setSelectedRegion] = useState<string>("");

  useEffect(() => {
    props.getSelectedRegion(selectedRegion);
  }, [selectedRegion]);

  const regions: region[] = [
    { title: "Vinnytsia", key: "vinnytsia" },
    { title: "Volyn", key: "volyn" },
    { title: "Dnipropetrovsk", key: "dnipropetrovsk" },
    { title: "Donetsk", key: "donetsk" },
    { title: "Zhytomyr", key: "zhytomyr" },
    { title: "Zakarpattia", key: "zakarpattia" },
    { title: "Zaporizhzhia", key: "zaporizhzhia" },
    { title: "Ivano-Frankivsk", key: "ivano-frankivsk" },
    { title: "Kyiv", key: "kiev" },
    { title: "Kirovohrad", key: "kirovohrad" },
    { title: "Luhansk", key: "luhansk" },
    { title: "Lviv", key: "lviv" },
    { title: "Mykolaiv", key: "mykolaiv" },
    { title: "Odessa", key: "odessa" },
    { title: "Poltava", key: "poltava" },
    { title: "Riwne", key: "riwne" },
    { title: "Sumy", key: "sumy" },
    { title: "Ternopil", key: "ternopil" },
    { title: "Kharkiv", key: "kharkiv" },
    { title: "Kherson", key: "kherson" },
    { title: "Khmelnytskyi", key: "khmelnytskyi" },
    { title: "Cherkasy", key: "cherkasy" },
    { title: "Chernivtsi", key: "chernivtsi" },
    { title: "Chernihiv", key: "chernihiv" },
    { title: "Crimea", key: "crimea" },
  ];
  return (
    <div className="list-wrapper">
      <h3 className="title title-24 title-list">Oblasts of Ukraine</h3>
      <ul className="list">
        {regions
          .sort((a: region, b: region) => {
            return a["title"].localeCompare(b["title"]);
          })
          .map((val: region, index: Number) => {
            return (
              <li key={String(index)}
                onClick={() => setSelectedRegion(val.key)}>
                <p className="paragraph paragraph-16">{val.title}</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default RegionList;
