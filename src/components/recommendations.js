import React from "react";
import editEntity from "./editEntity";
import { withStateHandlers, withHandlers, compose } from "recompose";
import { CommentsBox } from "./comments";
import TextForm from "./form";

const withToggle = withStateHandlers(
  { open: false },
  { onToggle: props => () => ({ open: !props.open }) }
);

const withCommentHandlers = withHandlers({
  handleCreateComment: ({ recommendation, onCreateComment }) => text =>
    onCreateComment(recommendation.id, text),
  handleEditComment: ({ recommendation, onEditComment }) => (commentId, text) =>
    onEditComment(recommendation.id, commentId, text)
});

const editOnlyRecentEntries = editEntity();

const enhance = compose(withToggle, withCommentHandlers);

const Recommendation = enhance(
  ({ recommendation, onToggle, open, handleCreateComment, handleEditComment }) => {
    return (
      <div className="Recommendation-wrapper">
        <p className="Recommendation-text">
          {recommendation.text}{" "}
          <span className="Recommendation-comment-toggle" onClick={onToggle}>
            Comments
          </span>
        </p>

        {open && (
          <CommentsBox
            list={recommendation.comments}
            onCreateEntity={handleCreateComment}
            onEditEntity={handleEditComment}
          />
        )}
      </div>
    );
  }
);

const RecommendationsBox = editOnlyRecentEntries(
  ({ list = [], handleEntitySave, onCreateComment, onEditComment }) => {
    return (
      <div className="Recommendation-Box-wrapper">
        {list.map(recommendation => (
          <Recommendation
            key={recommendation.id}
            recommendation={recommendation}
            onCreateComment={onCreateComment}
            onEditComment={onEditComment}
          />
        ))}
        <TextForm title="Add a recommendation" onSubmit={handleEntitySave} />
      </div>
    );
  }
);

export { RecommendationsBox };
