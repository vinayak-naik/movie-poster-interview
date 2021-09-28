import React, { useState, useEffect } from "react";
import style from "./register.module.scss";
import { Button, CircularProgress, Grid, TextField } from "@material-ui/core";
import Navbar from "../../components/navbar";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";

const RegisterComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
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
    setLoading(false);

    try {
      const baseURL = "http://localhost:7000/api/users/";
      await axios.post(baseURL, { name, email, password }).then((response) => {
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
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Name"
                  variant="outlined"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
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
                  disabled={!name || !email || !password || loading}
                  onClick={onSubmitHandler}
                  style={{ height: 50 }}
                >
                  {loading ? <CircularProgress size={30} /> : "register"}
                </Button>
              </Grid>
              <Grid item xs={12} style={{display:'flex',justifyContent:'center',cursor:"pointer"}}>
                <p onClick={() => history.replace("/login")}>Already have an account, login</p>
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

export default RegisterComponent;
