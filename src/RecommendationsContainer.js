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

  createRecommendation = text =>
    api.createRecommendation(text).then(rec => {
      this.setState(prevState => ({ list: [...prevState.list, rec] }));
    });

  render() {
    return (
      <RecommendationsBox
        recommendations={this.state.list}
        onCreateRecommendation={this.createRecommendation}
      />
    );
  }
}

export default RecommendationsContainer;
