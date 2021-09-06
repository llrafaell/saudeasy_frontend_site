import { FunctionComponent} from "react";
import { Switch, Route } from "react-router-dom";
import home from "../main/home/Home";


export const AuthRouting: FunctionComponent = () => {
  return <Switch>
    //rotas que precisam de usuario logado    
    <Route path={"/"} component={home} exact={true} />
    <Route path={"/home"} component={home} />

  </Switch>;
};