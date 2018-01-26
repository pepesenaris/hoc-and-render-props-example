import React from "react";
import api from "./api";
import { RecommendationsBox } from "./components/recommendations";

class RecommendationsContainer extends React.Component {
  state = { list: [] };

  componentDidMount() {
    this.fetchRecommendations();
  }

  setList = list => this.setState({ list });

  fetchRecommendations = () => api.getRecommendations().then(this.setList);

  createRecommendation = text => api.createRecommendation(text).then(this.setList);

  createComment = (recommendationId, text) =>
    api.createComment(recommendationId, text).then(this.setList);

  render() {
    return (
      <RecommendationsBox
        recommendations={this.state.list}
        onCreateRecommendation={this.createRecommendation}
        onCreateComment={this.createComment}
      />
    );
  }
}

export default RecommendationsContainer;
