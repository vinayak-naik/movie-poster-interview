import { AccountCircle, Home } from "@material-ui/icons";
import React from "react";
import style from "./navbar.module.scss";

const Navbar = (props) => {
  return (
    <div className={style.container}>
      <h1>Movie Poster</h1>
      {props.user ? (
        <div className={style.userBox}>
          <AccountCircle fontSize="large" onClick={props.route} />
        </div>
      ) : props.goto === "home" ? (
        <div className={style.userBox}>
        <Home fontSize="large" onClick={props.route} />
        </div>
      ) : (<>
        <p onClick={props.route}>{props.goto}</p>
        {props.goto2 && <p onClick={props.route2}>{props.goto2}</p>}
        </>
      )}
    </div>
  );
};

export default Navbar;
