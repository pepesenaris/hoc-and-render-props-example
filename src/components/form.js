import React from "react";
import { compose, withStateHandlers, withHandlers } from "recompose";

const enhance = compose(
  withStateHandlers({ text: "" }, { onChange: props => ev => ({ text: ev.target.value }) }),
  withHandlers({
    handleSubmit: props => ev => {
      ev.preventDefault();
      props.onSubmit(props.text);
    }
  })
);

const TextForm = ({ text, onChange, handleSubmit }) => {
  return (
    <form className="TextForm" onSubmit={handleSubmit}>
      <input type="text" value={text} onChange={onChange} />
      <input type="submit" value="Save" />
    </form>
  );
};

export default enhance(TextForm);
