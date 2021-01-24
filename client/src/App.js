import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Principal from "./components/Principal";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="outer">
          <div className="inner">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/iniciar-sesion" component={Login} />
              <Route path="/principal" component={Principal} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
