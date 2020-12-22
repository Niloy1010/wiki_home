import "./App.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { Component } from "react";
import Home from "./components/Home/Home";
import SingleArticle from "./components/SingleArticle/SingleArticle";
import EditArticle from "./components/EditArticle/EditArticle";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/:name" exact component={SingleArticle} />
        <Route path="/edit/:name" exact component={EditArticle} />
      </Router>
    );
  }
}

export default App;
