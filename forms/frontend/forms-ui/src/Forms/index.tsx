import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import ProfileList from "./ProfileList";
import ProfileForm from "./ProfileForm";

function DueDiligenceIndex() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <ProfileList />
      </Route>
      <Route path={`${path}/:pk`}>
        <ProfileForm />
      </Route>
    </Switch>
  );
}

export default DueDiligenceIndex;
