import React from "react";
import { withStateHandlers } from "recompose";
import { CommentsBox } from "./comments";
import TextForm from "./form";

const withToggle = withStateHandlers(
  { open: false },
  { onToggle: props => () => ({ open: !props.open }) }
);

const Recommendation = withToggle(({ recommendation, onToggle, open }) => {
  return (
    <div className="Recommendation-wrapper">
      <p className="Recommendation-text">
        {recommendation.text}{" "}
        <span className="Recommendation-comment-toggle" onClick={onToggle}>
          Comments
        </span>
      </p>

      {open && <CommentsBox comments={recommendation.comments} />}
    </div>
  );
});

const RecommendationsBox = ({ recommendations = [], onCreateRecommendation }) => {
  return (
    <div className="Recommendation-Box-wrapper">
      {recommendations.map(recommendation => (
        <Recommendation key={recommendation.id} recommendation={recommendation} />
      ))}
      <TextForm title="Add a recommendation" onSubmit={onCreateRecommendation} />
    </div>
  );
};

export { RecommendationsBox };
