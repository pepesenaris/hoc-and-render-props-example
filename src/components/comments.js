import React from "react";
import TextForm from "./form";
import editEntity from "./editEntity";
import { archived } from "../api";

const Comment = ({ children, showEditButton, isSelectedForEdit, toggleEdit }) => {
  const editAction = isSelectedForEdit ? "Create" : "Edit";
  return (
    <div className="Comment-wrapper">
      <p>
        {children}
        {showEditButton && (
          <span onClick={toggleEdit} className="Comment-action">
            {editAction}
          </span>
        )}
      </p>
    </div>
  );
};

const editOnlyRecentEntries = editEntity();

const CommentsBox = editOnlyRecentEntries(
  ({
    list = [],
    handleEntitySave,
    toggleEditing,
    isSelectedForEditing,
    showEditButton,
    isEditing,
    editingEntityId,
    archived
  }) => {
    const selectedCommentForEdit = list && list.find(entry => entry.id === editingEntityId);
    const initialTextValue = isEditing ? selectedCommentForEdit && selectedCommentForEdit.text : "";
    const commentFormTitle = `${selectedCommentForEdit ? "Edit the" : "Add a"} comment`;
    return (
      <div className="Comment-Box">
        {list.map(comment => (
          <Comment
            key={comment.id}
            toggleEdit={() => toggleEditing(comment.id)}
            showEditButton={!archived && showEditButton(comment)}
            isSelectedForEdit={isSelectedForEditing(comment)}
          >
            {comment.text}
          </Comment>
        ))}
        {!archived && (
          <TextForm
            title={commentFormTitle}
            onSubmit={handleEntitySave}
            initialText={initialTextValue}
          />
        )}
      </div>
    );
  }
);

export { Comment, CommentsBox };
