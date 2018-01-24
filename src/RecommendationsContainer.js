import React from "react";
import api from "./api";
import { RecommendationsBox } from "./components/recommendations";

class RecommendationsContainer extends React.Component {
  state = { list: [] };

  componentDidMount() {
    this.fetchRecommendations();
  }

  fetchRecommendations = () => {
    return api.getRecommendations().then(list => {
      this.setState({ list });
    });
  };

  render() {
    return <RecommendationsBox recommendations={this.state.list} />;
  }
}

export default RecommendationsContainer;
