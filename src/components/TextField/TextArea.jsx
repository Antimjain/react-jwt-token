import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "./TextField.scss";

const TextArea = ({
  name,
  value,
  type,
  onBlur,
  onChange,
  placeholder,
  isDisable,
  error,
  containerClassName,
  className
}) => (
  <Fragment>
    <div className={`${containerClassName}`}>
      <textarea
        className={`ss_textBox form-control ${className} ${
          error ? "is-invalid" : ""
        }`}
        type={type || "text"}
        name={name}
        value={value}
        placeholder={placeholder || ""}
        onBlur={onBlur}
        onChange={onChange}
        disabled={isDisable}
      />
      {error && <span className="invalid-feedback">{error}</span>}
    </div>
  </Fragment>
);

TextArea.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  disabled: PropTypes.string,
  className: PropTypes.string,
  // error: PropTypes.instanceOf(Array),
  error: PropTypes.string
};

export default TextArea;

// Ex: how to use
// <TextField
//   type="text"
//   value={amount}
//   name="amount"
//   onChange={this.handleInputChange}
// />
