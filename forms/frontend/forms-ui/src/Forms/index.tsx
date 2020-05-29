import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import ProfileList from "./ProfileList";
import Forms from "./Forms";

function FormsIndex() {
  const { path } = useRouteMatch();
  console.log(path);
  return (
    <Switch>
      <Route exact path={path}>
        <ProfileList />
      </Route>
      <Route path={`${path}/:pk`}>
        <Forms />
      </Route>
    </Switch>
  );
}

export default FormsIndex;
