import React from "react";
import { withStateHandlers, withHandlers, compose } from "recompose";
import { CommentsBox } from "./comments";
import TextForm from "./form";

const withToggle = withStateHandlers(
  { open: false },
  { onToggle: props => () => ({ open: !props.open }) }
);

const withCommentHandlers = withHandlers({
  handleCreateComment: ({ recommendation, onCreateComment }) => text =>
    onCreateComment(recommendation.id, text)
});

const enhance = compose(withToggle, withCommentHandlers);

const Recommendation = enhance(({ recommendation, onToggle, open, handleCreateComment }) => {
  return (
    <div className="Recommendation-wrapper">
      <p className="Recommendation-text">
        {recommendation.text}{" "}
        <span className="Recommendation-comment-toggle" onClick={onToggle}>
          Comments
        </span>
      </p>

      {open && (
        <CommentsBox comments={recommendation.comments} onCreateComment={handleCreateComment} />
      )}
    </div>
  );
});

const RecommendationsBox = ({ recommendations = [], onCreateRecommendation, onCreateComment }) => {
  return (
    <div className="Recommendation-Box-wrapper">
      {recommendations.map(recommendation => (
        <Recommendation
          key={recommendation.id}
          recommendation={recommendation}
          onCreateComment={onCreateComment}
        />
      ))}
      <TextForm title="Add a recommendation" onSubmit={onCreateRecommendation} />
    </div>
  );
};

export { RecommendationsBox };
