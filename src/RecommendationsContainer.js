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

  createRecommendation = text => api.createRecommendation(this.state.list, text).then(this.setList);

  createComment = (recommendationId, text) =>
    api.createComment(this.state.list, recommendationId, text).then(this.setList);

  editComment = (recommendationId, commentId, text) =>
    api.editComment(this.state.list, recommendationId, commentId, text).then(this.setList);

  render() {
    return (
      <RecommendationsBox
        list={this.state.list}
        onCreateEntity={this.createRecommendation}
        onCreateComment={this.createComment}
        onEditComment={this.editComment}
      />
    );
  }
}

export default RecommendationsContainer;
