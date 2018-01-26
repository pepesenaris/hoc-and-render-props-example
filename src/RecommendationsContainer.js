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

  createComment = (recommendationId, text) =>
    api
      .createComment(recommendationId, text)
      .then(recommendations => this.setState({ list: recommendations }));

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
