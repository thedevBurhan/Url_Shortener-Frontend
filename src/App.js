import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";
import { Route } from "react-router-dom/cjs/react-router-dom";
import Login from "./Components/Login/login";
import SignIn from "./Components/Login/SignIn";
import DashBoard from "./Components/DashBoard/DashBoard";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/SignIn">
          <SignIn />
        </Route>
        <Route path="/DashBoard">
          <DashBoard />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
