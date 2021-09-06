import { FunctionComponent} from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../main/auth/Register";
import Login from "../main/auth/Login";


export const NonAuthRouting: FunctionComponent = () => {
  return <Switch>
    // add your routes & additional routings which need authenticated user here.
        <Route path={"/login"} component={Login} />
        <Route path={"/register"} component={Register} />
    </Switch>;
};