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
  ({
    recommendation,
    onToggle,
    open,
    handleCreateComment,
    handleEditComment,
    isSelectedForEdit,
    toggleEdit,
    showEditButton
  }) => {
    const editAction = isSelectedForEdit ? "Create" : "Edit";
    return (
      <div className="Recommendation-wrapper">
        <p className="Recommendation-text">
          {recommendation.text}{" "}
          <span className="Recommendation-action" onClick={onToggle}>
            Comments
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
    editingEntityId
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
            showEditButton={showEditButton(recommendation)}
            isSelectedForEdit={isSelectedForEditing(recommendation)}
            onCreateComment={onCreateComment}
            onEditComment={onEditComment}
          />
        ))}
        <TextForm title={formTitle} onSubmit={handleEntitySave} initialText={initialTextValue} />
      </div>
    );
  }
);

export { RecommendationsBox };
