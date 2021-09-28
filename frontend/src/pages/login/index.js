import React, { useState, useEffect } from "react";
import style from "./login.module.scss";
import { Button, CircularProgress, Grid, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/navbar";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState("");

  const history = useHistory();
  const routeHandler = () => history.replace("/discover");

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      history.push("/home");
    } 
  }, []);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const baseURL = "http://localhost:7000/api/users/login";
      await axios.post(baseURL, { email, password }).then((response) => {
        setUser(response.data);
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        setLoading(false);
        history.replace("/home");
      });
    } catch (error) {
      setLoading(false);

      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  return (
    <div className={style.container}>
      <Navbar goto="Guest" route={routeHandler} />
      <div className={style.outerBox}>
        <div className={style.innerBox}>
          <form onSubmit={onSubmitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Email"
                  variant="outlined"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  size="large"
                  variant="contained"
                  disabled={!email || !password || loading}
                  style={{ height: 50 }}
                >
                  {loading ? <CircularProgress size={30} /> : "login"}
                </Button>
              </Grid>
              <Grid item xs={12} style={{display:'flex',justifyContent:'center',cursor:"pointer"}}>
                <p onClick={() => history.replace("/register")}>I don't have account, Register</p>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
      {error && (
        <Alert className={style.toast} severity="error">
          {error}
        </Alert>
      )}
    </div>
  );
};

export default LoginComponent;
