import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import routes from "../src/routes/routesConfig";
import "./assets/styles/style.scss";
import { LayoutProvider } from "./contexts/LayoutContext";
import { StoreProvider } from "./contexts/StoreContext";
function App(){
    return (
      <StoreProvider>
        <LayoutProvider>
        <Router>
          <AuthProvider>
            <Switch>
              {
                routes.map(({path,Component,isPrivate,exact,role}) => {
                  if(isPrivate) 
                    return <PrivateRoute key={path} exact={exact} authorizedRole={role} component={Component} path={path} />;
                  else
                    return <Route key={path} exact={exact} path={path} render={()=><Component />}/>
                })
              }
            </Switch>
          </AuthProvider>
        </Router>
        </LayoutProvider>
      </StoreProvider>
    )

}

export default App;