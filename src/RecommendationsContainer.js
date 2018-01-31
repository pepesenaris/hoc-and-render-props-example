import React from "react";
import api, { archived } from "./api";
import { RecommendationsBox } from "./components/recommendations";
import TextForm from "./components/form";

class RecommendationsContainer extends React.Component {
  state = { list: [] };

  componentDidMount() {
    this.fetchRecommendations();
  }

  setList = list => this.setState({ list });

  fetchRecommendations = () => api.getRecommendations().then(this.setList);

  createRecommendation = text => api.createRecommendation(this.state.list, text).then(this.setList);

  editRecommendation = (recommendationId, text) =>
    api.editRecommendation(this.state.list, recommendationId, text).then(this.setList);

  createComment = (recommendationId, text) =>
    api.createComment(this.state.list, recommendationId, text).then(this.setList);

  editComment = (recommendationId, commentId, text) =>
    api.editComment(this.state.list, recommendationId, commentId, text).then(this.setList);

  render() {
    const loading = this.state.list.length === 0;
    return (
      <article>
        <RecommendationsBox
          list={this.state.list}
          onCreateEntity={this.createRecommendation}
          onEditEntity={this.editRecommendation}
          onCreateComment={this.createComment}
          onEditComment={this.editComment}
        >
          {(formTitle, initialTextValue, handleEntitySave) =>
            loading ? (
              <p className="loading">Loading active recommendations...</p>
            ) : (
              <TextForm
                title={formTitle}
                onSubmit={handleEntitySave}
                initialText={initialTextValue}
              />
            )
          }
        </RecommendationsBox>
        <RecommendationsBox list={archived} archived />
      </article>
    );
  }
}

export default RecommendationsContainer;
