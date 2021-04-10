import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const SearchBox = ({ value, onChange, onClick, onEnter, options, select }) => {
  const { t } = useTranslation();

  const pressEnter = () => {
    onEnter();
  };

  return (
    <div className="searchBox">
      <select onChange={(e) => select(e.target.value)}>
        {options ? (
          options.map((v, i) => {
            return <option key={i}>{v}</option>;
          })
        ) : (
          <option value="">{t("all")}</option>
        )}
      </select>
      <div className="inputBox">
        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={(e) => e.key === "Enter" && pressEnter()}
        />
      </div>
      <a href="" onClick={onClick} className="searchBtn">
        {t("search")}
      </a>
    </div>
  );
};

export default SearchBox;
