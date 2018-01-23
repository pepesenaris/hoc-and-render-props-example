import React, { Component } from "react";
import { RecommendationsBox } from "./components/recommendations";
import logo from "./carrot.jpg";
import "./App.css";

const recommendations = [
  { id: 1, text: "Work hard, party harder" },
  { id: 2, text: "Never stop learning", comments: [{ id: 1, text: "A good comment" }] }
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">HOC & Render Props</h1>
        </header>
        <RecommendationsBox recommendations={recommendations} />
      </div>
    );
  }
}

export default App;
