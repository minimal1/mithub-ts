/** @format */

import * as React from "react";
import MithubMain from "./components/MithubMain";
import { Switch, Route } from "react-router-dom";
import AuthCallBack from "./components/AuthCallBack";

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={MithubMain} />
        <Route path='/auth/github/callback' component={AuthCallBack} />
      </Switch>
    );
  }
}

export default App;
