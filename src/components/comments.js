import React from "react";
import TextForm from "./form";
import editEntity from "./editEntity";

const Comment = ({ children, showEditButton, isSelectedForEdit, toggleEdit }) => {
  const editAction = isSelectedForEdit ? "Create" : "Edit";
  return (
    <div className="Comment-wrapper">
      <p>{children}</p>
      {showEditButton && <span onClick={toggleEdit}>{editAction}</span>}
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
    editingEntityId
  }) => {
    const selectedCommentForEdit = list && list.find(entry => entry.id === editingEntityId);
    const initialTextValue = isEditing ? selectedCommentForEdit && selectedCommentForEdit.text : "";
    return (
      <div className="Comment-Box">
        {list.map(comment => (
          <Comment
            key={comment.id}
            toggleEdit={() => toggleEditing(comment.id)}
            showEditButton={showEditButton(comment)}
            isSelectedForEdit={isSelectedForEditing(comment)}
          >
            {comment.text}
          </Comment>
        ))}
        <TextForm
          title="Add a comment"
          onSubmit={handleEntitySave}
          initialText={initialTextValue}
        />
      </div>
    );
  }
);

export { Comment, CommentsBox };
