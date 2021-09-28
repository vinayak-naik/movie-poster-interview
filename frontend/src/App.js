import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import HomeComponent from "./pages/home/home";
import LoginComponent from "./pages/login/index";
import RegisterComponent from "./pages/register/index";
import GuestComponent from "./pages/guest/guest";
import FavComponent from "./pages/fevorites/favorites";
import LatestComponent from "./pages/latest/latest";
import SplashComponent from "./components/splash";

const theme = createTheme({
  palette: {
    primary: {
      main: "#388e3c",
    },
    secondary: {
      main: "#ef6c00",
    },
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="app">
          <Switch>
            <Route path="/" exact component={SplashComponent} />
            <Route path="/discover" exact component={GuestComponent} />
            <Route path="/home" exact component={HomeComponent} />
            <Route path="/discover/latest" exact component={LatestComponent} />
            <Route path="/discover/favorites" exact component={FavComponent} />
            <Route path="/login" exact component={LoginComponent} />
            <Route path="/register" exact component={RegisterComponent} />
          </Switch>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

