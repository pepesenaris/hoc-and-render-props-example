import React from "react";

const Comment = ({ children }) => {
  return <div className="Comment-wrapper">{children}</div>;
};

const CommentsBox = ({ comments = [] }) => {
  return <div>{comments.map(comment => <Comment key={comment.id}>{comment.text}</Comment>)}</div>;
};

export { Comment, CommentsBox };
