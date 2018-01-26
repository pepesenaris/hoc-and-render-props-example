import React from "react";
import TextForm from "./form";

const Comment = ({ children }) => {
  return <div className="Comment-wrapper">{children}</div>;
};

const CommentsBox = ({ comments = [], onCreateComment }) => {
  return (
    <div className="Comment-Box">
      {comments.map(comment => <Comment key={comment.id}>{comment.text}</Comment>)}
      <TextForm title="Add a comment" onSubmit={onCreateComment} />
    </div>
  );
};

export { Comment, CommentsBox };
