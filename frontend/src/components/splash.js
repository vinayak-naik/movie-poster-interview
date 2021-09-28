import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const SplashComponent = () => {
  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      history.push("/home");
    } else {
      history.push("/login");
    }
  }, []);
  return <div></div>;
};

export default SplashComponent;
