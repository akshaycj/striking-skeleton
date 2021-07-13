import React, { Suspense } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { routes } from "./presentation/common/Routes";
import { theme } from "./presentation/common/Theme/themeVariables";
import { PrimaryLoadingIndicator } from "./presentation/common/UI/LoadingIndicator";

//import static css to override antd
import "./presentation/common/Style/style.css";
import LayoutProvider from "./presentation/Layout";

//component imports
const Login = React.lazy(() => import("./presentation/Login"));
const Signup = React.lazy(() => import("./presentation/Signup"));

function App() {
  return (
    <ThemeProvider
      theme={{ ...theme, rtl: false, topMenu: false, darkMode: false }}
    >
      <Router>
        <Suspense
          fallback={
            <PrimaryLoadingIndicator
              text="Loading...Breath in...Breath out..."
              isFullPage
            />
          }
        >
          <Switch>
            <Route exact path={routes.LOGIN} component={Login} />
            <Route exact path={routes.SIGNUP} component={Signup} />
            <LayoutProvider>
              {/* Add routes that require layout here */}
            </LayoutProvider>
          </Switch>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
