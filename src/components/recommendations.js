import React from "react";
import editEntity from "./editEntity";
import { withStateHandlers, withHandlers, compose } from "recompose";
import { CommentsBox } from "./comments";
import TextForm from "./form";
import { archived } from "../api";

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
  ({
    recommendation,
    onToggle,
    open,
    handleCreateComment,
    handleEditComment,
    isSelectedForEdit,
    toggleEdit,
    showEditButton,
    archived
  }) => {
    const editAction = isSelectedForEdit ? "Create" : "Edit";
    const toggleCommentsText = `Comments - ${open ? "Hide" : "Show"}`;
    return (
      <div className="Recommendation-wrapper">
        <p className="Recommendation-text">
          {recommendation.text}{" "}
          <span className="Recommendation-action" onClick={onToggle}>
            {toggleCommentsText}
          </span>
          {showEditButton && (
            <span onClick={toggleEdit} className="Recommendation-action">
              {editAction}
            </span>
          )}
        </p>

        {open && (
          <CommentsBox
            list={recommendation.comments}
            onCreateEntity={handleCreateComment}
            onEditEntity={handleEditComment}
            archived={archived}
          />
        )}
      </div>
    );
  }
);

const RecommendationsBox = editOnlyRecentEntries(
  ({
    list = [],
    handleEntitySave,
    onCreateComment,
    onEditComment,
    toggleEditing,
    isSelectedForEditing,
    showEditButton,
    isEditing,
    editingEntityId,
    archived,
    children
  }) => {
    const selectedForEdit = list && list.find(entry => entry.id === editingEntityId);
    const initialTextValue = isEditing ? selectedForEdit && selectedForEdit.text : "";
    const formTitle = `${selectedForEdit ? "Edit the" : "Add a"} recommendation`;
    return (
      <div className="Recommendation-Box-wrapper">
        {list.map(recommendation => (
          <Recommendation
            key={recommendation.id}
            recommendation={recommendation}
            toggleEdit={() => toggleEditing(recommendation.id)}
            showEditButton={!archived && showEditButton(recommendation)}
            isSelectedForEdit={isSelectedForEditing(recommendation)}
            onCreateComment={onCreateComment}
            onEditComment={onEditComment}
            archived={archived}
          />
        ))}
        {children && children(formTitle, initialTextValue, handleEntitySave)}
      </div>
    );
  }
);

RecommendationsBox.defaultProps = {
  onCreateComment: console.log,
  onEditComment: console.log,
  onCreateEntity: console.log,
  onEditEntity: console.log
};

export { RecommendationsBox };
