import React from "react";
import {useNavigate} from "react-router-dom";

import s from "./home.module.scss";

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <header className="_container">
      <nav>
        <ul className={s.list}>
          <li><a className="button" href="/admin" onClick={(e) => {
            e.preventDefault();
            navigate("/admin");
          }}>Go to admin panel</a></li>
          <li>
            <a className="button" href="/stream" target="_blank"> Open game in new tab </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};