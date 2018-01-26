import React, { Component } from "react";
import RecommendationsContainer from "./RecommendationsContainer";
import logo from "./carrot.jpg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a href="//ingenious.agency" target="_blank">
            <img src={logo} className="App-logo" alt="logo" />
          </a>
          <h1 className="App-title">HOC & Render Props</h1>
        </header>
        <RecommendationsContainer />
      </div>
    );
  }
}

export default App;
