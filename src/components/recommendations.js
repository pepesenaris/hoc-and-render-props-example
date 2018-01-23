import React from "react";
import { withStateHandlers } from "recompose";
import { CommentsBox } from "./comments";

const withToggle = withStateHandlers(
  { open: false },
  { onToggle: props => () => ({ open: !props.open }) }
);

const Recommendation = withToggle(({ recommendation, onToggle, open }) => {
  return (
    <div className="Recommendation-wrapper">
      <span className="Recommendation-text">{recommendation.text}</span>
      <span className="Recommendation-comment-toggle" onClick={onToggle}>
        Comments
      </span>
      {open && <CommentsBox comments={recommendation.comments} />}
    </div>
  );
});

const RecommendationsBox = ({ recommendations = [] }) => {
  return (
    <div className="Recommendation-Box-wrapper">
      {recommendations.map(recommendation => (
        <Recommendation key={recommendation.id} recommendation={recommendation} />
      ))}
    </div>
  );
};

export { RecommendationsBox };
