import React from "react";
import TextForm from "./form";
import editEntity from "./editEntity";

const Comment = ({ children }) => {
  return <div className="Comment-wrapper">{children}</div>;
};

const editOnlyRecentEntries = editEntity();

const CommentsBox = editOnlyRecentEntries(({ list = [], handleEntitySave }) => {
  return (
    <div className="Comment-Box">
      {list.map(comment => <Comment key={comment.id}>{comment.text}</Comment>)}
      <TextForm title="Add a comment" onSubmit={handleEntitySave} />
    </div>
  );
});

export { Comment, CommentsBox };
