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

const TextForm = ({ text, onChange, handleSubmit, title }) => {
  return (
    <form className="TextForm" onSubmit={handleSubmit}>
      <label>{title}</label>
      <textarea rows="3" value={text} onChange={onChange} />
      <input type="submit" value="Save" />
    </form>
  );
};

export default enhance(TextForm);
