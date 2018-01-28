import React from "react";
import { compose, withStateHandlers, withHandlers, lifecycle } from "recompose";

const enhance = compose(
  withStateHandlers(({ initialText }) => ({ text: initialText || "" }), {
    onChange: props => ev => ({ text: ev.target.value }),
    clear: () => () => ({ text: "" }),
    setText: () => text => ({ text })
  }),
  withHandlers({
    handleSubmit: props => ev => {
      ev.preventDefault();
      return props.onSubmit(props.text).then(props.clear);
    }
  }),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      if (this.props.initialText !== nextProps.initialText) {
        this.props.setText(nextProps.initialText);
      }
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
